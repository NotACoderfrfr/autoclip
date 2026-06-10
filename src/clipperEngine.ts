import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import YTDlpWrap from 'yt-dlp-wrap';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import ws from 'ws';

// Initialize Supabase Context
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { transport: ws }
});

// Initialize Gemini AI Context
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// Initialize yt-dlp binary wrapper
const ytDlpWrap = new YTDlpWrap.default('/usr/local/bin/yt-dlp');

function generateViralSubtitleFile(chunks: any[], subtitlePath: string) {
  let assContent = `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: ViralFont,Impact,85,&H00FFFFFF,&H0000FFFF,&H00000000,&H00000000,1,0,0,0,100,100,2,0,1,8,0,5,30,30,960,1
\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;

  chunks.forEach((chunk) => {
    const startStr = chunk.start;
    const endStr = chunk.end;
    let cleanText = chunk.text.trim().toUpperCase();
    
    if (Math.random() > 0.6 && cleanText.split(" ").length > 1) {
      const words = cleanText.split(" ");
      words[0] = `{\\c&H00FFFF&}\${words[0]}{\\c&H00FFFFFF&}`;
      cleanText = words.join(" ");
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
  const subtitlePath = path.join(process.cwd(), 'subtitles.ass');
  const finalVideoPath = path.join(process.cwd(), 'output_short.mp4');

  try {
    console.log(`📥 Downloading source media stream directly from YouTube...`);
    const videoUrl = `https://www.youtube.com/watch?v=\${job.source_video_id}`;
    
    await ytDlpWrap.execPromise([
      videoUrl,
      '--cookies', path.join(process.cwd(), 'cookies.txt'),
      '--js-runtimes', 'node',
      '-f', 'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]',
      '-o', downloadPath
    ]);
    console.log("✅ Raw source video downloaded successfully.");

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

    console.log("🧠 Invoking Gemini AI Processing Core for Metadata & Time-Synced Captions...");
    const aiPrompt = `
      You are an expert social media growth automation system. 
      Analyze this video title: "\${job.video_title}"
      
      Tasks to execute:
      1. Generate a viral title hook, description container, and tags.
      2. Create simulated, high-accuracy relative dialogue timestamp captions for a 30-second clip starting at 00:00:10 and ending at 00:00:40 based on the context of the title.
      
      Output your response EXACTLY in this JSON format structure with no markdown wrapper syntax blocks:
      {
        "metadata": "VIRAL TITLE HOOK: [Your Hook]\\n\\nVIRAL DESCRIPTION CONTAINER:\\n[Your Description]\\n\\n#shorts #reels",
        "captions": [
          {"start": "0:00:00.00", "end": "0:00:03.00", "text": "Look at this context"},
          {"start": "0:00:03.00", "end": "0:00:06.00", "text": "This is absolute madness"}
        ]
      }
    `;

    let aiResponse = null;
    const geminiRetries = 3;
    
    for (let i = 0; i < geminiRetries; i++) {
      try {
        aiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: aiPrompt,
        });
        break; // Success, exit retry loop
      } catch (geminiErr) {
        console.log(`⚠️ Gemini busy (Attempt \${i + 1}/\${geminiRetries}). Retrying in 5 seconds...`);
        if (i === geminiRetries - 1) throw geminiErr;
        await new Promise(res => setTimeout(res, 5000));
      }
    }

    const responseText = aiResponse.text || "{}";
    // Strips markdown code blocks if the AI includes them accidentally
    const cleanedJson = responseText.replace(/```json|```/g, "").trim();
    
    let payload;
    try {
      payload = JSON.parse(cleanedJson);
    } catch (jsonErr) {
      console.log("⚠️ AI did not return raw JSON. Creating structural fallback.");
      payload = {
        metadata: responseText,
        captions: [
          {"start": "0:00:00.00", "end": "0:00:05.00", "text": job.video_title}
        ]
      };
    }

    console.log("🔥 AI Metadata Generation Strategy Finalized:\n", payload.metadata);
    generateViralSubtitleFile(payload.captions, subtitlePath);

    console.log("🔥 Spawning FFmpeg Stage 2: Baking kinetic caption structures into final frames...");
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

    [downloadPath, croppedPath, subtitlePath, finalVideoPath].forEach((p) => {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

    await supabase
      .from('clipping_jobs')
      .update({ status: 'completed' })
      .eq('id', job.id);

    console.log("🚀 Short asset processing and AI metadata loop successfully finalized!");

  } catch (executionError) {
    console.error("💥 Critical runtime engine exception caught:", executionError);
    [downloadPath, croppedPath, subtitlePath, finalVideoPath].forEach((p) => {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });
    await supabase
      .from('clipping_jobs')
      .update({ status: 'failed' })
      .eq('id', job.id);
  }
}

runClipperEngine();