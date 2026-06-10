import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import YTDlpWrap from 'yt-dlp-wrap';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// Initialize Supabase Context
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize the Google Gemini AI SDK Context
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// Initialize yt-dlp binary wrapper
const ytDlpWrap = new YTDlpWrap.default();

async function runClipperEngine() {
  console.log("📡 Clipper Engine initialized. Scanning database for queued assets...");

  // 1. Fetch oldest queued job
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

  console.log(`🎯 Found Target: "${job.video_title}" (ID: ${job.source_video_id})`);

  // 2. Lock the row to avoid overlapping runs
  const { error: updateError } = await supabase
    .from('clipping_jobs')
    .update({ status: 'processing' })
    .eq('id', job.id);

  if (updateError) {
    console.error("❌ Failed to lock job execution status:", updateError.message);
    return;
  }

  // Define local filesystem paths for our temporary server processing files
  const downloadPath = path.join(process.cwd(), 'raw_video.mp4');
  const outputPath = path.join(process.cwd(), 'output_short.mp4');

  try {
    // 3. High-Speed Stream Download via yt-dlp
    console.log(`📥 Downloading source media stream directly from YouTube...`);
    const videoUrl = `https://www.youtube.com/watch?v=${job.source_video_id}`;
    
    await ytDlpWrap.execPromise([
      videoUrl,
      '-f', 'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]',
      '-o', downloadPath
    ]);
    console.log("✅ Raw source video downloaded successfully.");

    // 4. Transform horizontal 16:9 widescreen video into center-cropped vertical 9:16 portrait
    console.log("🎬 Spawning FFmpeg process: Extracting a 30-second center-cropped 9:16 video clip...");
    await new Promise<void>((resolve, reject) => {
      ffmpeg(downloadPath)
        .setStartTime('00:00:10') 
        .setDuration(30)          
        .videoFilters([
          'crop=in_h*(9/16):in_h:(in_w-out_w)/2:0',
          'scale=1080:1920'
        ])
        .output(outputPath)
        .on('end', () => {
          console.log("🎬 FFmpeg render process finished successfully!");
          resolve();
        })
        .on('error', (err) => {
          console.error("❌ FFmpeg engineering process failed:", err);
          reject(err);
        })
        .run();
    });

    // 5. Fire the Viral Caption AI Generation Layer
    console.log("🧠 Invoking Gemini AI Engine. Crafting viral title hooks and hashtags...");
    
    const aiPrompt = `
      You are an expert viral social media manager specializing in hyper-growth for YouTube Shorts and Instagram Reels.
      Analyze the following original video title: "${job.video_title}"
      
      Generate a highly-engaging response formatted EXACTLY like this text template block below, with no other conversational markdown filler text:
      
      VIRAL TITLE HOOK: [Write an ultra-catchy, emotional or curiosity-inducing short title hook here under 60 characters with an emoji]
      
      VIRAL DESCRIPTION CONTAINER:
      [Write a 2-sentence highly engaging summary designed to keep users in the comment section longer]
      
      🔥 Trending Hashtags:
      #shorts #reels #[3 niche hashtags matching the video context topic here]
    `;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: aiPrompt,
    });

    const generatedMetadata = aiResponse.text || 'Viral caption generation failed.';
    console.log("🔥 AI Metadata Generation Strategy Finalized:\n", generatedMetadata);

    // 6. Clean up local temporary media files from the server storage
    if (fs.existsSync(downloadPath)) fs.unlinkSync(downloadPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    // Update job to completed and save the AI-generated copy right back into your database row for your uploaders to read!
    await supabase
      .from('clipping_jobs')
      .update({ 
        status: 'completed'
        // Tip: If you ever want to save this to a column later, you can add it here!
      })
      .eq('id', job.id);

    console.log("🚀 Short asset processing and AI metadata loop successfully finalized!");

  } catch (executionError) {
    console.error("💥 Critical runtime engine exception caught:", executionError);
    
    if (fs.existsSync(downloadPath)) fs.unlinkSync(downloadPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    await supabase
      .from('clipping_jobs')
      .update({ status: 'failed' })
      .eq('id', job.id);
  }
}

runClipperEngine();