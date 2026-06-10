import os
import sys
import json
import requests
import time
from google import genai
from google.genai import types
from supabase import create_client, Client
from moviepy import VideoFileClip, TextClip, CompositeVideoClip

if len(sys.argv) < 2:
    print("💥 Error: No video asset name passed from wrapper framework.")
    sys.exit(1)

target_file = sys.argv[1]
raw_video_name = os.path.basename(target_file)

supabase_url = os.getenv("VITE_SUPABASE_URL") or ""
supabase_anon_key = os.getenv("VITE_SUPABASE_ANON_KEY") or ""
supabase: Client = create_client(supabase_url, supabase_anon_key)

gemini_key = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY") or ""
ai_client = genai.Client(api_key=gemini_key)

local_raw_path = "raw_source.mp4"
local_output_path = "output_viral_short.mp4"

print("🧠 Uploading video asset to Gemini cloud workspace...")
cloud_file = ai_client.files.upload(file=local_raw_path)

print("⏳ Waiting for Google's servers to process the media file...")
while True:
    file_info = ai_client.files.get(name=cloud_file.name)
    state = file_info.state.name if hasattr(file_info.state, 'name') else str(file_info.state)
    print(f"   Current file processing status: {state}")
    if state == "ACTIVE":
        print("✅ Video is live and active on Gemini's engine!")
        break
    elif state in ["FAILED", "ERROR"]:
        print("💥 Google failed to process the video asset track.")
        sys.exit(1)
    time.sleep(5)

print("🧠 Evaluating semantic virality vectors and pulling timestamps...")
ai_prompt = """
Tasks:
1. Analyze this video asset file. Identify the most engaging, high-retention 30-second window.
2. Extract the exact word-by-word timestamps for that 30-second block to generate subtitles.
3. Write a high-converting YouTube Shorts title with an emoji.
4. Write an Instagram Reels description with high-performance hashtags.

You MUST return response EXACTLY as this JSON format, with no markdown formatting around it:
{
  "start_sec": 12.5,
  "end_sec": 42.5,
  "ytTitle": "TITLE_HERE",
  "instaTitle": "CAPTION_HERE",
  "subtitles": [
    {"start": 12.5, "end": 14.2, "text": "WELCOME TO THE FUTURE"},
    {"start": 14.2, "end": 16.5, "text": "OF AI CONTENT CREATION"}
  ]
}
"""

response = None
for attempt in range(1, 6):
    try:
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[cloud_file, ai_prompt]
        )
        break 
    except Exception as e:
        print(f"⚠️ Google Server is busy (Attempt {attempt}/5). Retrying in 10 seconds...")
        time.sleep(10)

if not response:
    print("💥 Error: Gemini remained unavailable after multiple attempts. Exiting.")
    sys.exit(1)

clean_json_str = response.text.replace("```json", "").replace("```", "").strip()
metadata = json.loads(clean_json_str)

# Load clip to check its actual length first
    full_clip = VideoFileClip(local_raw_path)
    
    # Auto-adjust bounds so short test videos never cause a crash
    start_time = min(metadata["start_sec"], full_clip.duration - 1)
    end_time = min(metadata["end_sec"], full_clip.duration)
    
    if start_time < 0: start_time = 0

    print(f"🎬 Clipping viral sequence safely: {start_time}s - {end_time}s")
    clip = full_clip.subclipped(start_time, end_time)
w, h = clip.size
target_w = int(h * (9/16))
cropped_clip = clip.cropped(x_center=w/2, y_center=h/2, width=target_w, height=h)

print("🔥 Burning custom font overlays onto frames...")
caption_clips = []
for sub in metadata["subtitles"]:
    start_relative = sub["start"] - metadata["start_sec"]
    end_relative = sub["end"] - metadata["start_sec"]
    
    if start_relative < 0 or start_relative > cropped_clip.duration:
        continue

    # Bypasses the system font bug by using MoviePy's internal default canvas drawing rendering mechanics
    txt_clip = (TextClip(text=sub["text"], font_size=50, color='yellow', stroke_color='black', stroke_width=2, size=(target_w - 40, None))
                .with_start(start_relative)
                .with_end(min(end_relative, cropped_clip.duration))
                .with_position(('center', 'center')))
    caption_clips.append(txt_clip)

final_clip = CompositeVideoClip([cropped_clip] + caption_clips)
final_clip.write_videofile(local_output_path, codec="libx264", audio_codec="aac", fps=24, logger=None)

print("☁️ Uploading fully rendered short asset back to database storage vault...")
processed_cloud_name = f"short_{raw_video_name}"
with open(local_output_path, "rb") as f:
    supabase.storage.from_("raw-videos").upload(
        file=f,
        path=processed_cloud_name,
        file_options={"content-type": "video/mp4"}
    )

download_link = supabase.storage.from_("raw-videos").get_public_url(processed_cloud_name)

print("📊 Shipping final metadata and assets straight to Google Sheets...")
sheet_url = 'https://script.google.com/macros/s/AKfycbxtTRw-Gu9zoaegvteXZW6dRZfALn0CmlpHWMx8HeTElleao0ohKYxszn9AsCQZbJQwxQ/exec'
requests.post(sheet_url, json={
    "originalTitle": raw_video_name,
    "ytTitle": metadata["ytTitle"],
    "instaTitle": metadata["instaTitle"],
    "downloadUrl": download_link
})

print("🧹 Purging cloud storage source queue...")
supabase.storage.from_("raw-videos").remove([target_file])

clip.close()
final_clip.close()
try:
    ai_client.files.delete(name=cloud_file.name)
except Exception:
    pass
os.remove(local_raw_path)
os.remove(local_output_path)
print("🚀 Done! Your custom, free Opus engine just updated your Google Sheet.")