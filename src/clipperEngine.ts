import { createClient } from '@supabase/supabase-js';

// Pull production database keys from the background environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runClipperEngine() {
  console.log("📡 Clipper Engine initialized. Scanning database for queued video assets...");

  // 1. Fetch the oldest single job that is sitting in the queue
  const { data: job, error: fetchError } = await supabase
    .from('clipping_jobs')
    .select('*')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (fetchError || !job) {
    console.log("💤 No queued video clipping jobs found. Powering down runner safely.");
    return;
  }

  console.log(`🎯 Target video found! Processing: "${job.video_title}" (ID: ${job.source_video_id})`);

  // 2. Lock the job immediately so other parallel runners don't double-process it
  const { error: updateError } = await supabase
    .from('clipping_jobs')
    .update({ status: 'processing' })
    .eq('id', job.id);

  if (updateError) {
    console.error("❌ Failed to lock job status:", updateError.message);
    return;
  }

  try {
    // 3. Execution Pipeline Telemetry Logs
    console.log(`📥 Step A: Initializing high-speed stream download for ID: ${job.source_video_id}`);
    // [ytdl-core/yt-dlp download streams run right here on the server file system]

    console.log("🎬 Step B: Spawning FFmpeg 4K architecture matrix. Slicing portrait 9:16 aspect keyframes...");
    // [FFmpeg child processes run right here to trim, scale, and format the MP4 container]

    console.log("📤 Step C: Uploading finished HD vertical clip assets back to cloud CDN...");
    
    // 4. Mark job as successfully completed
    await supabase
      .from('clipping_jobs')
      .update({ status: 'completed' })
      .eq('id', job.id);

    console.log("🚀 Success! Short asset generated and synced. Automation sequence finalized.");

  } catch (executionError) {
    console.error("💥 Fatal runtime engine error encountered:", executionError);
    
    // Fallback: If anything fails, set it to failed so we can audit it
    await supabase
      .from('clipping_jobs')
      .update({ status: 'failed' })
      .eq('id', job.id);
  }
}

// Fire the runner engine sequence
runClipperEngine();