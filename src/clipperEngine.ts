
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import YTDlpWrap from 'yt-dlp-wrap';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import ws from 'ws';

// Initialize Supabase Context with Node WebSocket workaround
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { transport: ws }
});

// Initialize Gemini AI Context
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// Initialize yt-dlp binary wrapper pointing directly to the runner's system path
const ytDlpWrap = new YTDlpWrap.default('/usr/local/bin/yt-dlp');

async function transcribeAudio(audioPath: string): Promise<any[]> {
  console.log("🎙️ Sending extracted audio track to serverless Whisper AI node...");
  const hfToken = process.env.HF_API_KEY || '';
  const audioData = fs.readFileSync(audioPath);

  // Calling OpenAI's Whisper Large V3 via Hugging Face Serverless API for free
  const response = await fetch(
    "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
    {
      headers: { 
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/octet-stream"
      },
      method: "POST",
      body: audioData,
    }
  );

  const result = await response.json();
  if (!result.chunks) {
    console.log("⚠️ Detailed timestamps unavailable. Falling back to basic chunk alignments.");
    return [{ text: result.text || "", timestamp: [0, 10] }];
  }
  return result.chunks;
}

function generateViralSubtitleFile(chunks: any[], subtitlePath: string) {
  // Creating an Advanced SubStation Alpha script for high-impact viral subtitles
  let assContent = `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: ViralFont,Impact,85,&H00FFFFFF,&H0000FFFF,&H00000000,&H00000000,1,0,0,0,100,100,2,0,1,8,0,5,30,30,960,1
`;

  assContent += `\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;

  chunks.forEach((chunk) => {
    const startSec = chunk.timestamp[0] || 0;
    const endSec = chunk.timestamp[1] || startSec + 2;

    const formatTime = (secs: number) => {
      const h = Math.floor(secs / 3600).toString().padStart(1, '0');
      const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
      const s = (secs % 60).toFixed(2).padStart(5, '0');
      return `${h}:${m}:${s}`;
    };

    const startStr = formatTime(startSec);
    const endStr = formatTime(endSec);
    
    // Randomly highlight key phrases in electric yellow (\c&H00FFFF&) to capture mobile attention strings
    let cleanText = chunk.text.trim().toUpperCase();
    if (Math.random() > 0.6) {
      const words = cleanText.split(" ");
      if (words.length > 1) {
        words[0] = `{\\c&H00FFFF&}\${words[0]}{\\c&H00FFFFFF&}`;
        cleanText = words.join(" ");
      }
    }

    assContent += `Dialogue: 0,\${startStr},\${endStr},ViralFont,,0,0,0,,\${cleanText}\n`;
  });

  fs.writeFileSync(subtitlePath, assContent);
  console.log("🎨 Premium kinetic .ass subtitle matrix script written successfully.");
}

async function runClipperEngine() {
  console.log("📡 Clipper Engine initialized. Scanning database for queued assets...");

  const { data: job, error: fetchError } = await supabase
    .from('clipping_jobs')
    .select('*')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (fetchError || !job) {
    console.log("💤 No queued video clipping jobs found. Standby mode active.");
    return;
  }

  console.log(`🎯 Found Target: "\${job.video_title}" (ID: \${job.source_video_id})`);

  const { error: updateError } = await supabase
    .from('clipping_jobs')
    .update({ status: 'processing' })
    .eq('id', job.id);

  if (updateError) {
    console.error("❌ Failed to lock job execution status:", updateError.message);
    return;
  }

  const downloadPath = path.join(process.cwd(), 'raw_video.mp4');
  const croppedPath = path.join(process.cwd(), 'cropped_video.mp4');
  const audioPath = path.join(process.cwd(), 'extracted_audio.mp3');
  const subtitlePath = path.join(process.cwd(), 'subtitles.ass');
  const finalVideoPath = path.join(process.cwd(), 'output_short.mp4');

  try {
    console.log(`📥 Downloading source media stream directly from YouTube...`);
    const videoUrl = `https://www.youtube.com/watch?v=\${job.source_video_id}`;
    
    // Download video combining best tracks, utilizing secure cookies, and binding the node runtime environment path explicitly
    await ytDlpWrap.execPromise([
      videoUrl,
      '--cookies', path.join(process.cwd(), 'cookies.txt'),
      '--js-runtimes', 'node',
      '-f', 'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]',
      '-o', downloadPath
    ]);
    console.log("✅ Raw source video downloaded successfully.");

    // Step A: Extract a 30-second center-cropped 9:16 clip base layout
    console.log("🎬 Spawning FFmpeg Stage 1: Running center-crop calculations...");
    await new Promise<void>((resolve, reject) => {
      ffmpeg(downloadPath)
        .setStartTime('00:00:10') 
        .setDuration(30)          
        .videoFilters([
          'crop=in_h*(9/16):in_h:(in_w-out_w)/2:0',
          'scale=1080:1920'
        ])
        .output(croppedPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });

    // Step B: Extract isolated MP3 audio sample track for the AI transcription layout
    console.log("🎵 Spawning FFmpeg Stage 2: Isolating audio tracking layout...");
    await new Promise<void>((resolve, reject) => {
      ffmpeg(croppedPath)
        .output(audioPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });

    // Step C: Run serverless voice AI transcription and compile subtitle script loops
    const chunks = await transcribeAudio(audioPath);
    generateViralSubtitleFile(chunks, subtitlePath);

    // Step D: Burn the stylized subtitles directly into the vertical video stream containers natively
    console.log("🔥 Spawning FFmpeg Stage 3: Baking kinetic caption structures into final frames...");
    await new Promise<void>((resolve, reject) => {
      ffmpeg(croppedPath)
        .videoFilters(`subtitles=\${subtitlePath}`)
        .output(finalVideoPath)
        .on('end', () => {
          console.log("🎬 Final video composite with kinetic text subtitles rendered successfully!");
          resolve();
        })
        .on('error', (err) => reject(err))
        .run();
    });

    // Step E: Fire the Viral Marketing Strategy Copywriter Layer
    console.log("🧠 Invoking Gemini AI Engine. Crafting viral title hooks and hashtags...");
    const aiPrompt = `
      You are an expert viral social media manager specializing in hyper-growth for YouTube Shorts and Instagram Reels.
      Analyze the following original video title: "\${job.video_title}"
      
      Generate a highly-engaging response formatted EXACTLY like this text template block below, with no other conversational markdown filler text:
      
      VIRAL TITLE HOOK: [Write an ultra-catchy short title hook here under 60 characters with an emoji]
      
      VIRAL DESCRIPTION CONTAINER:
      [Write a 2-sentence highly engaging summary designed to keep users in the comments section longer]
      
      🔥 Trending Hashtags:
      #shorts #reels #[3 niche hashtags matching the video context topic here]
    `;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: aiPrompt,
    });
    
    console.log("🔥 AI Metadata Generation Strategy Finalized:\n", aiResponse.text || "");

    // Cleanup workspace local files
    [downloadPath, croppedPath, audioPath, subtitlePath, finalVideoPath].forEach((p) => {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

    await supabase
      .from('clipping_jobs')
      .update({ status: 'completed' })
      .eq('id', job.id);

    console.log("🚀 Short asset processing and AI metadata loop successfully finalized!");

  } catch (executionError) {
    console.error("💥 Critical runtime engine exception caught:", executionError);
    [downloadPath, croppedPath, audioPath, subtitlePath, finalVideoPath].forEach((p) => {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });
    await supabase
      .from('clipping_jobs')
      .update({ status: 'failed' })
      .eq('id', job.id);
  }
}

runClipperEngine();