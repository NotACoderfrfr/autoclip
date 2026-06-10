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
  let assContent = `[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: ViralFont,Impact,85,&H00FFFFFF,&H0000FFFF,&H00000000,&H00000000,1,0,0,0,100,100,2,0,1,8,0,5,30,30,960,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;

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
    console.log(`📥 Connecting to Piped Video API...`);
    const pipedMirrors = [
      'https://pipedapi.kavin.rocks',
      'https://pipedapi.tokhmi.xyz',
      'https://api.piped.projectsegfau.lt'
    ];
    
    let streamUrl = null;
    for (const api of pipedMirrors) {
      try {
        console.log(`🔌 Testing node: ${api}`);
        const res = await fetch(`${api}/streams/${job.source_video_id}`);
        if (res.ok) {
          const data: any = await res.json();
          const stream = data.videoStreams.find((s: any) => !s.videoOnly && s.quality === '720p') || data.videoStreams.find((s: any) => !s.videoOnly);
          if (stream && stream.url) {
            streamUrl = stream.url;
            console.log(`✅ Success! Stream resolved.`);
            break;
          }
        }
      } catch (e) {
         console.log(`⚠️ Node offline, jumping to next...`);
      }
    }

    if (!streamUrl) throw new Error(`All Piped API nodes failed to resolve the stream.`);

    console.log(`📡 Downloading raw bytes...`);
    const fileRes = await fetch(streamUrl);
    const arrayBuffer = await fileRes.arrayBuffer();
    fs.writeFileSync(downloadPath, Buffer.from(arrayBuffer));

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