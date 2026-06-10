import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import ws from 'ws';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey, { 
  auth: { persistSession: false }, 
  realtime: { transport: ws } 
});

async function runUnifiedEngine() {
  console.log("🛸 Scanning Supabase raw-videos bucket via JS Client...");
  
  // Natively list the top level files of the bucket without path bugs
  const { data: files, error } = await supabase.storage.from('raw-videos').list('', {
    limit: 10,
    sortBy: { column: 'name', order: 'asc' }
  });

  if (error) {
    console.error("💥 Supabase Storage Error:", error.message);
    return;
  }

  const validVideos = files?.filter(f => f.name !== '.emptyFolderPlaceholder') || [];
  if (validVideos.length === 0) {
    console.log("😴 No raw video files found inside the bucket. Going back to sleep.");
    return;
  }

  const targetFile = validVideos[0].name;
  console.log(`📦 Found unprocessed asset: ${targetFile}. Downloading locally...`);

  const { data: blobData, error: downloadError } = await supabase.storage
    .from('raw-videos')
    .download(targetFile);

  if (downloadError || !blobData) {
    console.error("💥 Download Failed:", downloadError?.message);
    return;
  }

  // Save video file cleanly to root workspace disk
  const buffer = Buffer.from(await blobData.arrayBuffer());
  const localRawPath = path.join(process.cwd(), 'raw_source.mp4');
  fs.writeFileSync(localRawPath, buffer);

  console.log("🐍 Passing local binary allocations over to the Python core execution frame...");
  try {
    // Dynamically invoke our python editor script, passing the video filename as an argument
    execSync(`python src/opusKiller.py "${targetFile}"`, { stdio: 'inherit' });
    console.log("🚀 Complete Pipeline Success!");
  } catch (err: any) {
    console.error("💥 Python Execution Frame Failed:", err.message);
  }
}

runUnifiedEngine();