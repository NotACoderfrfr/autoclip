import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import ws from 'ws';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false }, realtime: { transport: ws } });

const geminiApiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

function generateViralSubtitleFile(chunks: any[], subtitlePath: string) {
  let assContent = `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: ViralFont,Impact,85,&H00FFFFFF,&H0000FFFF,&H00000000,&H00000000,1,0,0,0,100,100,2,0,1,8,0,5,30,30,960,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;

  chunks.forEach((chunk) => {
    const startStr = chunk.start;
    const endStr = chunk.end;
    let cleanText = chunk.text.trim().toUpperCase();
    if (Math.random() > 0.6 && cleanText.split(" ").length > 1) {
      const words = cleanText.split(" ");
      words[0] = `{\\c&H00FFFF&}${words[0]}{\\c&H00FFFFFF&}`;
      cleanText = words.join(" ");
    }
    assContent += `Dialogue: 0,${startStr},${endStr},ViralFont,,0,0,0,,${cleanText}\n`;
  });
  fs.writeFileSync(subtitlePath, assContent);
}

async function runClipperEngine() {
  const { data: job } = await supabase.from('clipping_jobs').select('*').eq('status', 'queued').order('created_at', { ascending: true }).limit(1).single();
  if (!job) return;

  await supabase.from('clipping_jobs').update({ status: 'processing' }).eq('id', job.id);
  const downloadPath = path.join(process.cwd(), 'raw_video.mp4');
  const croppedPath = path.join(process.cwd(), 'cropped_video.mp4');
  const subtitlePath = path.join(process.cwd(), 'subtitles.ass');
  const finalVideoPath = path.join(process.cwd(), 'output_short.mp4');

  try {
    console.log(`📥 Connecting to Cobalt community mirror matrix...`);
    const videoUrl = `https://www.youtube.com/watch?v=${job.source_video_id}`;
    
    // Array of independent, Cloudflare-free community proxy servers
    const mirrors = [
      'https://cobalt.kocour.space/api/json',
      'https://api.cobalt.owo.si/api/json',
      'https://co.eepy.today/api/json',
      'https://api.zeon.dev/api/json'
    ];

    let mirrorData: any = null;

    for (const mirror of mirrors) {
      try {
        console.log(`🔌 Testing mirror node: ${mirror}`);
        const res = await fetch(mirror, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
          body: JSON.stringify({ url: videoUrl, vQuality: '720', filenamePattern: 'basic' })
        });
        
        if (res.ok) {
          const data: any = await res.json();
          if (data.status !== 'error' && data.url) {
            mirrorData = data;
            console.log(`✅ Success! Stream resolved through ${mirror}`);
            break; // Exit the loop, we got the video!
          }
        }
      } catch (e) {
        console.log(`⚠️ Mirror node blocked or offline, jumping to next...`);
      }
    }

    if (!mirrorData) throw new Error(`All community proxy mirrors failed to resolve the stream.`);
    
    const fileStreamResponse = await fetch(mirrorData.url);
    const fileBuffer = await fileStreamResponse.arrayBuffer();
    fs.writeFileSync(downloadPath, Buffer.from(fileBuffer));

    console.log(`🎬 Cropping video...`);
    await new Promise<void>((resolve, reject) => {
      ffmpeg(downloadPath).setStartTime('00:00:10').setDuration(30).videoFilters(['crop=in_h*(9/16):in_h:(in_w-out_w)/2:0', 'scale=1080:1920']).output(croppedPath)
        .on('end', () => resolve()).on('error', (err) => reject(err)).run();
    });

    console.log(`🧠 Generating metadata...`);
    const aiPrompt = `Tasks: 1. Viral hook for "${job.video_title}". 2. Relative JSON timestamp captions for a 30s clip starting 0:00:10. Response EXACTLY as JSON: { "metadata": "TXT", "captions": [{"start": "0:00:00.00", "end": "0:00:03.00", "text": "TXT"}] }`;
    const aiResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: aiPrompt });
    const payload = JSON.parse((aiResponse.text || '{}').replace(/```json|```/g, '').trim());
    
    generateViralSubtitleFile(payload.captions, subtitlePath);

    console.log(`🔥 Burning subtitles...`);
    await new Promise<void>((resolve, reject) => {
      ffmpeg(croppedPath).videoFilters(`subtitles=${subtitlePath}`).output(finalVideoPath)
        .on('end', () => resolve()).on('error', (err) => reject(err)).run();
    });

    [downloadPath, croppedPath, subtitlePath, finalVideoPath].forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
    await supabase.from('clipping_jobs').update({ status: 'completed' }).eq('id', job.id);
    console.log(`✅ Success!`);

  } catch (err: any) {
    console.error(`💥 Error:`, err.message);
    [downloadPath, croppedPath, subtitlePath, finalVideoPath].forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
    await supabase.from('clipping_jobs').update({ status: 'failed' }).eq('id', job.id);
  }
}

runClipperEngine();