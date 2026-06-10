import { createClient } from '@supabase/supabase-js';
import YTDlpWrap from 'yt-dlp-wrap';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// Initialize Supabase Context
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    
    // Download video combining best video and audio track formats into a single container
    await ytDlpWrap.execPromise([
      videoUrl,
      '-f', 'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]',
      '-o', downloadPath
    ]);
    console.log("✅ Raw source video downloaded successfully.");

    // 4. Transform horizontal 16:9 widescreen video into a center-cropped vertical 9:16 portrait video
    console.log("🎬 Spawning FFmpeg process: Extracting a 30-second center-cropped 9:16 video clip...");
    
    await new Promise<void>((resolve, reject) => {
      ffmpeg(downloadPath)
        .setStartTime('00:00:10') // Start cutting 10 seconds into the video to skip intros
        .setDuration(30)          // Extract exactly 30 seconds of high-fidelity footage
        .videoFilters([
          // Crop matrix math formulas: crop widescreen video down to a 9:16 vertical box right in the center
          'crop=in_h*(9/16):in_h:(in_w-out_w)/2:0',
          // Force standard mobile Shorts/Reels dimensions (1080x1920 portrait HD resolution)
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

    // 5. Clean up local temporary media files from the server storage
    if (fs.existsSync(downloadPath)) fs.unlinkSync(downloadPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    // Update job to completed
    await supabase
      .from('clipping_jobs')
      .update({ status: 'completed' })
      .eq('id', job.id);

    console.log("🚀 Short asset processing loop successfully finalized!");

  } catch (executionError) {
    console.error("💥 Critical runtime engine exception caught:", executionError);
    
    // Reset file allocations if things crash mid-flight
    if (fs.existsSync(downloadPath)) fs.unlinkSync(downloadPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    await supabase
      .from('clipping_jobs')
      .update({ status: 'failed' })
      .eq('id', job.id);
  }
}

runClipperEngine();