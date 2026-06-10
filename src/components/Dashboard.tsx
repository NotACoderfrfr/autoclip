import React, { useState, useEffect, useRef } from "react";
import { 
  Youtube, Search, Play, Scissors, Sparkles, Sliders, Check, 
  Download, RefreshCw, Send, PlayCircle, PauseCircle, CornerDownRight, 
  Settings, ChevronRight, Share2, Eye, Calendar, Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MockVideo, MockClip, CaptionStyle, LogLine } from "../types";

// Caption styling templates available
const STYLES: CaptionStyle[] = [
  {
    id: "beast",
    name: "MrBeast Style ⚡",
    fontClass: "font-display font-black tracking-tighter uppercase text-yellow-400 rotate-[-2deg]",
    textColor: "text-white",
    highlightColor: "text-yellow-400",
    textShadow: "drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000]",
    emojiStyle: "scale-125 inline-block mx-1 animate-bounce"
  },
  {
    id: "hormozi",
    name: "Hormozi Vocal 🟢",
    fontClass: "font-sans font-extrabold tracking-tight uppercase text-white",
    textColor: "text-slate-100",
    highlightColor: "text-emerald-400",
    textShadow: "[text-shadow:_1.5px_1.5px_0_#000]",
    emojiStyle: "scale-110 inline-block align-middle ml-1"
  },
  {
    id: "cyberpunk",
    name: "Cyber Punk 🧬",
    fontClass: "font-mono tracking-wide text-pink-500 uppercase",
    textColor: "text-pink-400",
    highlightColor: "text-emerald-400",
    textShadow: "drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]",
    emojiStyle: "opacity-80 scale-100"
  },
  {
    id: "editorial",
    name: "Editorial Cozy ☕",
    fontClass: "font-serif italic capitalize text-slate-100",
    textColor: "text-slate-200",
    highlightColor: "text-indigo-300",
    textShadow: "none",
    emojiStyle: "hidden"
  }
];

// Seed sample videos for simulation
const MOCK_VIDEOS: MockVideo[] = [
  {
    id: "beast-1",
    title: "Testing the World's Most Expensive Workspace Setup",
    duration: "15:20",
    thumbnailUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600&auto=format&fit=crop",
    views: "2.4M views",
    publishedAt: "2 days ago",
    defaultClips: [
      {
        id: "clip-b1",
        title: "The $500,000 Levitating Ergonomic Smart Chair",
        viralScore: 98,
        duration: "0:45",
        startTimestamp: "02:15",
        endTimestamp: "03:00",
        socialPlatforms: ["TikTok", "Shorts"],
        captions: [
          "Wait, does this support actual zero gravity?",
          "OH MY GOD! It actually levitates off the floor!",
          "This is literally the craziest chair ever made! 🚀"
        ]
      },
      {
        id: "clip-b2",
        title: "Dual Core Gaming Command Desk Tour",
        viralScore: 93,
        duration: "0:58",
        startTimestamp: "07:44",
        endTimestamp: "08:42",
        socialPlatforms: ["Shorts", "Reels"],
        captions: [
          "Check out these triple 4K sliding display monitors.",
          "It has a built-in refrigerated beverage drawer!",
          "This is every developers' dream workspace configuration. 🔥"
        ]
      }
    ]
  },
  {
    id: "mkbhd-1",
    title: "Why Apple Vision Pro 2 Will Change Wearables Forever",
    duration: "11:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=600&auto=format&fit=crop",
    views: "980K views",
    publishedAt: "5 days ago",
    defaultClips: [
      {
        id: "clip-m1",
        title: "The Micro-OLED Pixel Density Breakthrough",
        viralScore: 96,
        duration: "0:38",
        startTimestamp: "01:22",
        endTimestamp: "02:00",
        socialPlatforms: ["TikTok", "Reels", "Shorts"],
        captions: [
          "This displays 4,000 pixels per inch of visual panel.",
          "You literally cannot spot individual pixels anymore.",
          "It feels like real light is hitting your eyes! 🕶️"
        ]
      },
      {
        id: "clip-m2",
        title: "The Vision Pro Gesture Tracking Dilemma",
        viralScore: 89,
        duration: "0:50",
        startTimestamp: "05:10",
        endTimestamp: "06:00",
        socialPlatforms: ["TikTok"],
        captions: [
          "Gesture tracking is flawless, but there is one major flaw.",
          "Every single random hand movement triggers a button click.",
          "They need to build direct eye micro-gaze calibration! 🧐"
        ]
      }
    ]
  },
  {
    id: "huberman-1",
    title: "Optimize Your Focus: 3 Fast Steps to Master Dopamine",
    duration: "14:10",
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    views: "1.2M views",
    publishedAt: "1 week ago",
    defaultClips: [
      {
        id: "clip-h1",
        title: "The Critical 10-Minute Outdoor Light Trick",
        viralScore: 97,
        duration: "0:52",
        startTimestamp: "02:05",
        endTimestamp: "02:57",
        socialPlatforms: ["TikTok", "Reels", "Shorts"],
        captions: [
          "Get outside within sixty minutes of waking up.",
          "Direct photons block your internal melatonin synthesis.",
          "This launches your cortisol rhythm perfectly for 16 hours. ☀️"
        ]
      },
      {
        id: "clip-h2",
        title: "Why Afternoon Energy Crashes are Normal",
        viralScore: 91,
        duration: "0:47",
        startTimestamp: "09:30",
        endTimestamp: "10:17",
        socialPlatforms: ["Reels"],
        captions: [
          "Do not ingest caffeine for ninety minutes after waking up.",
          "This lets adenosine naturally clear from your brain buffers.",
          "Once you try this, your 2 PM slump goes to absolute ZERO! 🧠☕"
        ]
      }
    ]
  }
];

interface DashboardProps {
  channelUrl: string;
  setChannelUrl: (url: string) => void;
}

export default function Dashboard({ channelUrl, setChannelUrl }: DashboardProps) {
  // State managers
  const [activeChannelName, setActiveChannelName] = useState("");
  const [isChannelConnected, setIsChannelConnected] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<MockVideo | null>(null);
  const [selectedClip, setSelectedClip] = useState<MockClip | null>(null);
  
  // Custom caption style
  const [activeStyle, setActiveStyle] = useState<CaptionStyle>(STYLES[0]);
  const [activePlatforms, setActivePlatforms] = useState<string[]>(["TikTok", "Shorts"]);

  // Video playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(15);
  const [activeCaptionIdx, setActiveCaptionIdx] = useState(0);

  // Transcription edits state
  const [editableCaptions, setEditableCaptions] = useState<string[]>([]);

  // Rendering logs state
  const [isRendering, setIsRendering] = useState(false);
  const [renderingPercent, setRenderingPercent] = useState(0);
  const [renderingLogs, setRenderingLogs] = useState<LogLine[]>([]);

  // Schedule modal simulation
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("18:00");
  const [scheduleDate, setScheduleDate] = useState("2026-06-11");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger channel connection simulation if parent inputs a link
  useEffect(() => {
    if (channelUrl) {
      handleConnectChannel(channelUrl);
    }
  }, []);

  const handleConnectChannel = (urlOrHandle: string) => {
    // Determine title or creator handle name
    let cleanName = "My YouTube Channel";
    if (urlOrHandle.toLowerCase().includes("mrbeast")) {
      cleanName = "MrBeast Channel Vibe";
    } else if (urlOrHandle.toLowerCase().includes("mkbhd") || urlOrHandle.toLowerCase().includes("marques")) {
      cleanName = "Marques Brownlee Channel Vibe";
    } else if (urlOrHandle.toLowerCase().includes("huberman")) {
      cleanName = "Dr. Andrew Huberman Channel Vibe";
    } else if (urlOrHandle.startsWith("@")) {
      cleanName = `${urlOrHandle} Studio`;
    } else {
      cleanName = "Auto-synchronized Creator Channel";
    }

    setActiveChannelName(cleanName);
    setIsChannelConnected(true);
    // Reset video selections
    setSelectedVideo(MOCK_VIDEOS[0]);
    setSelectedClip(MOCK_VIDEOS[0].defaultClips[0]);
    setEditableCaptions(MOCK_VIDEOS[0].defaultClips[0].captions);
    setActiveCaptionIdx(0);
    setProgressPercent(15);
    setIsPlaying(false);
  };

  const handleVideoSelect = (video: MockVideo) => {
    setSelectedVideo(video);
    setSelectedClip(video.defaultClips[0]);
    setEditableCaptions(video.defaultClips[0].captions);
    setActiveCaptionIdx(0);
    setProgressPercent(15);
    setIsPlaying(false);
  };

  const handleClipSelect = (clip: MockClip) => {
    setSelectedClip(clip);
    setEditableCaptions(clip.captions);
    setActiveCaptionIdx(0);
    setProgressPercent(15);
    setIsPlaying(false);
  };

  // Toggle play/pause simulation with shifting captions and progress updates
  useEffect(() => {
    if (isPlaying) {
      progressRef.current = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 100) {
            setActiveCaptionIdx(0);
            return 0;
          }
          const nextVal = prev + 1;
          // Split active captions across progress percentage (0 - 100)
          const numCaptions = editableCaptions.length;
          if (numCaptions > 0) {
            const step = Math.floor(100 / numCaptions);
            const currentIdx = Math.min(Math.floor(nextVal / step), numCaptions - 1);
            setActiveCaptionIdx(currentIdx);
          }
          return nextVal;
        });
      }, 200);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, editableCaptions]);

  // Edit simple caption line
  const handleCaptionTextChange = (idx: number, newText: string) => {
    const updated = [...editableCaptions];
    updated[idx] = newText;
    setEditableCaptions(updated);
  };

  // Trigger rendering action logs
  const handleGenerateClips = () => {
    setIsRendering(true);
    setRenderingPercent(0);
    setRenderingLogs([]);

    const logTemplates = [
      { text: "Initializing High-Speed Video Buffer pipelines...", type: "info" as const },
      { text: "Phonetic voice alignment: Detecting vocal focus frequencies...", type: "info" as const },
      { text: "Successfully matched multi-speaker focus at timestamp boundaries.", type: "success" as const },
      { text: "Stabilizing vertical crop (Aspect Ratio 9:16) with active motion bounding tracker...", type: "info" as const },
      { text: "Warning: Low lighting detected in frame 204. Compensation applied.", type: "warning" as const },
      { text: "Synthesized subtitle overlay with chosen custom aesthetics...", type: "success" as const },
      { text: "Compiling micro-animations, color grades, and optimized video codecs...", type: "info" as const },
      { text: "AutoClip output fully compiled to 1080x1920 MP4 high-bitrate format!", type: "success" as const }
    ];

    let step = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setRenderingPercent((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRendering(false);
          return 100;
        }
        
        // Push raw logs over time
        if (prev % 12 === 0 && step < logTemplates.length) {
          const now = new Date();
          const pad = (n: number) => n.toString().padStart(2, "0");
          const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
          
          setRenderingLogs((current) => [
            ...current,
            { ...logTemplates[step], timestamp: timeStr }
          ]);
          step++;
        }

        return prev + 2;
      });
    }, 100);
  };

  // Handle preset channel search
  const triggerManualChannelInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelUrl) {
      handleConnectChannel("@CustomPartner");
    } else {
      handleConnectChannel(channelUrl);
    }
  };

  return (
    <section id="dashboard" className="py-24 bg-[#020617] relative border-t border-slate-900/80 overflow-visible">
      {/* Background neon visual anchors */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[10%] w-96 h-96 rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-500/15 uppercase tracking-widest inline-block mb-3">
            INTERACTIVE GRAPHICAL DEMO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white mb-4">
            The Interactive Studio
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Paste any active YouTube channel handle below to fetch its video stream, auto-extract viral shorts, style active captions, and test the system workflow.
          </p>
        </div>

        {/* Channel connector bar inside Workspace */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={triggerManualChannelInput} className="flex gap-2">
            <div className="flex-1 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 focus-within:border-indigo-500/50 flex items-center px-3.5 py-2 transition-all input-glow">
              <Youtube className="w-5 h-5 text-red-500 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="Enter creator channel URL or handle..."
                className="w-full bg-transparent text-white text-xs font-medium placeholder-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wide rounded-xl shadow-md glow-button cursor-pointer transition-all flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Stream</span>
            </button>
          </form>
          <div className="flex justify-center gap-3 mt-3">
            <span className="text-[10px] text-slate-500">Shortcut test channels:</span>
            {MOCK_VIDEOS.map((v, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const channelHandles = ["@MrBeast", "@MKBHD", "@HubermanLab"];
                  setChannelUrl(channelHandles[idx]);
                  handleConnectChannel(channelHandles[idx]);
                }}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono underline cursor-pointer"
              >
                {idx === 0 ? "MrBeast" : idx === 1 ? "MKBHD" : "Huberman Lab"}
              </button>
            ))}
          </div>
        </div>

        {/* WORKSPACE PANELS CONTAINERS */}
        {!isChannelConnected ? (
          <div className="p-12 rounded-2xl glass-panel text-center max-w-xl mx-auto">
            <Sliders className="w-10 h-10 text-slate-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-white font-bold font-display text-lg mb-2">No Connected Channel</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Connect your YouTube channel using the bar above or test our interactive clipping suite with one of our preset templates.
            </p>
            <button
              type="button"
              onClick={() => handleConnectChannel("https://youtube.com/@MrBeast")}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-550 rounded-xl text-xs font-bold text-white shadow-lg glow-button cursor-pointer hover:brightness-115 transition-all text-center mx-auto block"
            >
              Auto-Connect MrBeast (Demo Stream)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start overflow-visible">
            
            {/* LEFT AREA: Video List & Clip Stream Segment Choice (Col: 5) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Channel Header Status Banner */}
              <div className="p-4 rounded-xl glass-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white text-xs font-bold uppercase tracking-wider font-mono">CHANNEL PIPELINE ACTIVE</h3>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px] font-sans font-medium">{activeChannelName}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                  Connected
                </span>
              </div>

              {/* Recent Video selector */}
              <div className="p-5 rounded-2xl glass-panel">
                <h3 className="text-white text-xs font-bold font-mono tracking-wider mb-4 flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                  <span>RECENT VIDEOS ON STREAM</span>
                </h3>

                <div className="space-y-3">
                  {MOCK_VIDEOS.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`p-2.5 rounded-xl border flex gap-3 transition-all cursor-pointer ${
                        selectedVideo?.id === video.id
                          ? "bg-indigo-950/20 border-indigo-600/40 shadow-md shadow-indigo-500/5"
                          : "bg-slate-950/80 border-slate-900 hover:border-slate-800"
                      }`}
                    >
                      <div className="w-20 h-12 rounded-lg bg-slate-900 border border-slate-800 relative overflow-hidden flex-shrink-0">
                        <img src={video.thumbnailUrl} alt="Video preview thumbnail img" className="w-full h-full object-cover opacity-80" />
                        <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.2 rounded text-[8px] text-slate-300 font-mono font-bold">
                          {video.duration}
                        </span>
                      </div>
                      <div className="flex flex-col justify-between overflow-hidden">
                        <h4 className="text-xs font-bold text-white leading-snug truncate group-hover:text-indigo-400 transition-colors">
                          {video.title}
                        </h4>
                        <div className="flex gap-2 text-[10px] text-slate-500">
                          <span>{video.views}</span>
                          <span>•</span>
                          <span>{video.publishedAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted clips list */}
              {selectedVideo && (
                <div className="p-5 rounded-2xl glass-panel">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-xs font-bold font-mono tracking-wider flex items-center gap-2">
                       <Scissors className="w-3.5 h-3.5 text-indigo-400" />
                       <span>AUTO-EXTRACTED VIRAL SHORTS</span>
                    </h3>
                    <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      FREE UNLIMITED
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedVideo.defaultClips.map((clip) => (
                      <div
                        key={clip.id}
                        onClick={() => handleClipSelect(clip)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                          selectedClip?.id === clip.id
                            ? "bg-slate-950 border-indigo-500 shadow-md shadow-indigo-500/5"
                            : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                        }`}
                      >
                        <div className="flex items-start gap-2.5 overflow-hidden">
                          <div className="p-1.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 mt-0.5 text-indigo-400">
                            <Sparkle className="w-3.5 h-3.5 animate-pulse" />
                          </div>
                          <div className="text-left overflow-hidden">
                            <h4 className="text-xs font-semibold text-white leading-snug truncate">
                              {clip.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                              <span>Score: <span className="text-emerald-400 font-bold">{clip.viralScore}/100</span></span>
                              <span>•</span>
                              <span>Dur: {clip.duration}</span>
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT AREA: Studio Workspace, Subtitle Layout Style & Video Player Preview (Col: 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Workspace Main Frame Container */}
              <div className="p-5 sm:p-6 rounded-2xl glass-panel relative overflow-visible">
                {/* Visual decoration corners */}
                <div className="absolute top-4 left-4 flex gap-1 items-center font-mono text-[9px] text-slate-500 select-none">
                  <Settings className="w-3 h-3 text-slate-600 animate-spin-slow" />
                  <span>AUTOCLIP-CORE_ENG_V1</span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-visible">
                  
                  {/* Studio Control Options (Col: 6) */}
                  <div className="md:col-span-6 space-y-5 text-left">
                    
                    {/* Setup Preset Pickers */}
                    <div>
                      <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                        1. SUBTITLE CAPTION PRESET
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {STYLES.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setActiveStyle(style)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-bold tracking-wide transition-all cursor-pointer ${
                              activeStyle.id === style.id
                                ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20"
                                : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            {style.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Social Frame configuration */}
                    <div>
                      <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                        2. TARGET SOCIAL CHANNELS
                      </h4>
                      <div className="flex gap-2">
                        {["TikTok", "Shorts", "Reels"].map((platform) => {
                          const isPlatformActive = activePlatforms.includes(platform);
                          return (
                            <button
                              key={platform}
                              type="button"
                              onClick={() => {
                                if (isPlatformActive) {
                                  setActivePlatforms(activePlatforms.filter(p => p !== platform));
                                } else {
                                  setActivePlatforms([...activePlatforms, platform]);
                                }
                              }}
                              className={`flex-1 py-2 px-1.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                                isPlatformActive
                                  ? "bg-slate-950 text-emerald-400 border-emerald-500/30"
                                  : "bg-slate-950/40 text-slate-500 border-slate-900 hover:border-slate-800"
                              }`}
                            >
                              {platform}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interactive Subtitles Manual Editing Block */}
                    {selectedClip && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                            3. INTERACTIVE TRANSCRIPT
                          </h4>
                          <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-semibold">
                            <Sparkles className="w-3 h-3" /> Auto-Synced Client
                          </span>
                        </div>

                        <div className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-900 max-h-40 overflow-y-auto">
                          {editableCaptions.map((phrase, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <span className="text-[10px] font-mono text-slate-600 select-none shrink-0 w-8">
                                00:{idx * 15}s
                              </span>
                              <input
                                type="text"
                                value={phrase}
                                onChange={(e) => handleCaptionTextChange(idx, e.target.value)}
                                className={`flex-1 bg-slate-900/40 text-xs font-semibold px-2 py-1 rounded border border-slate-800/80 text-white focus:outline-none focus:border-indigo-500 ${
                                  activeCaptionIdx === idx ? "text-yellow-400 border-indigo-500 bg-indigo-950/10" : ""
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1.5 italic">
                          💡 Typos in auto-captions? Click and type to correct. Changes update immediately on preview.
                        </p>
                      </div>
                    )}

                    {/* Rendering action triggers */}
                    <div className="pt-2">
                      <button
                        type="button"
                        disabled={isRendering}
                        onClick={handleGenerateClips}
                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 disabled:text-slate-500 font-extrabold text-xs tracking-wider rounded-xl uppercase shadow-md shadow-emerald-400/10 cursor-pointer active:scale-98 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRendering ? "animate-spin" : ""}`} />
                        <span>{isRendering ? `COMPILING VERTICAL CLIP... ${renderingPercent}%` : "GENERATE AND EXPORT HD CLIP"}</span>
                      </button>
                    </div>

                  </div>

                  {/* ACTIVE PREVIEW PHONE MOCKUP FRAME (Col: 6) */}
                  <div className="md:col-span-6 flex flex-col items-center overflow-visible">
                    
                    {/* Phone Layout wrapper */}
                    <div className="relative w-64 h-[440px] rounded-[36px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden ring-1 ring-white/10 relative">
                      
                      {/* Speaker ear slit top */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                        <div className="w-12 h-1 bg-slate-800 rounded-full" />
                      </div>

                      {/* Mock Video Stream Area */}
                      <div className="relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
                        
                        {/* Background cover image representing widescreen crop frame */}
                        {selectedVideo && (
                          <div className="absolute inset-0 z-0">
                            <img 
                              src={selectedVideo.thumbnailUrl} 
                              alt="Landscape backdrop crop" 
                              className={`w-full h-full object-cover scale-150 blur-sm transition-all duration-300 ${
                                isPlaying ? "opacity-40 animate-pulse" : "opacity-60"
                              }`} 
                            />
                            {/* Face Tracker Overlay Lines when editing style */}
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-dashed border-emerald-500/20 rounded-xl flex items-center justify-center animate-pulse pointer-events-none">
                              <span className="text-[8px] font-mono text-emerald-400 font-bold bg-[#020617]/80 px-1 rounded absolute top-[-8px]">
                                FACIAL TRACKER PIN_ACTIVE
                              </span>
                            </div>
                          </div>
                        )}

                        {/* SUBTITLE OVERLAYS IN ACTION CANVAS (Render dynamically based on preset style) */}
                        <div className="absolute inset-x-4 bottom-20 z-10 text-center select-none pointer-events-none">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeCaptionIdx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className={`${activeStyle.fontClass} ${activeStyle.textColor} ${activeStyle.textShadow} text-sm px-2`}
                            >
                              {editableCaptions[activeCaptionIdx] || "Generating dynamic transcript..."}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Player manual center controls overlay */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:scale-110 active:scale-95 transition-all text-white cursor-pointer"
                          >
                            {isPlaying ? <PauseCircle className="w-10 h-10" /> : <PlayCircle className="w-10 h-10" />}
                          </button>
                        </div>

                        {/* Bottom Metadata bar mockup */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between text-left">
                          <div className="max-w-[150px] overflow-hidden text-white">
                            <p className="text-[10px] font-bold font-mono">@{activeChannelName.split(" ")[0].toLowerCase()}</p>
                            <p className="text-[9px] text-slate-300 line-clamp-1 mt-0.5">{selectedClip?.title}</p>
                          </div>
                          
                          <div className="flex flex-col gap-2 items-center">
                            <div className="p-1.5 bg-black/60 rounded-full border border-white/10 text-emerald-400">
                              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                            </div>
                            <span className="text-[8px] text-emerald-400 font-bold font-mono">{selectedClip?.viralScore}% Score</span>
                          </div>
                        </div>

                      </div>

                      {/* Timeline bottom controller bar */}
                      <div className="h-14 bg-slate-950 flex flex-col justify-between p-2.5 border-t border-slate-900 z-20">
                        {/* Play progress tracks */}
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative" onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percent = Math.floor(((e.clientX - rect.left) / rect.width) * 100);
                          setProgressPercent(percent);
                        }}>
                          <div className="h-full bg-indigo-500 transition-all duration-150" style={{ width: `${progressPercent}%` }} />
                        </div>
                        
                        <div className="flex items-center justify-between text-slate-400">
                          <button
                            type="button"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-1 hover:text-white transition-colors cursor-pointer"
                          >
                            {isPlaying ? "Pause Video" : "Simulate Play"}
                          </button>
                          
                          <div className="flex gap-2 items-center">
                            <span className="text-[9px] font-mono text-slate-500">Dur: {selectedClip?.duration}</span>
                            <span className="text-white text-[10px]">{(progressPercent / 10).toFixed(1)}s</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Direct Publish or Local Download Block */}
                    <div className="mt-4 flex gap-2 w-full justify-center">
                      <button
                        type="button"
                        onClick={() => alert(`Simulating clip package download. File: ${selectedClip?.title || "clip"}.mp4 (High Bitrate, Resolution: 1080x1920)`)}
                        className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Download MP4</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsScheduled(true)}
                        className="flex-1 py-1.5 bg-indigo-600/95 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Schedule Post</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>

              {/* LIVE RENDERING SIMULATED CONSOLE PANEL */}
              {isRendering && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 rounded-2xl bg-[#030611] border border-slate-900 text-left overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <h4 className="text-white font-mono text-xs font-bold">LIVE TRANSCRIPTION & RENDER PROCESSOR</h4>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold">{renderingPercent}% PROCESSED</span>
                  </div>

                  <div className="space-y-1.5 font-mono text-[11px] max-h-40 overflow-y-auto">
                    {renderingLogs.length === 0 ? (
                      <p className="text-slate-600 italic">Starting AI processing streams...</p>
                    ) : (
                      renderingLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
                          <span className={
                            log.type === "success" ? "text-emerald-400 font-bold" :
                            log.type === "warning" ? "text-amber-400" :
                            log.type === "error" ? "text-red-400" : "text-slate-300"
                          }>
                            {log.text}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {/* SCHEDULING CONFIGURATION MODAL DIALOG */}
              {isScheduled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-5 rounded-2xl bg-slate-920 border border-slate-800 text-left relative"
                >
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                    <h4 className="text-white font-bold font-display text-sm flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>Configure Social Posting Scheduler</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsScheduled(false)}
                      className="text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Target Date</label>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full bg-slate-950 text-slate-200 border border-slate-850 px-2.5 py-1.5 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Target Hour</label>
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full bg-slate-950 text-slate-200 border border-slate-850 px-2.5 py-1.5 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-slate-950/80 p-3 rounded-lg border border-slate-900 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-mono block text-slate-500">Post buffer channels</span>
                      <span className="text-white font-bold">{activePlatforms.join(", ") || "No platforms chosen"}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        alert(`Clip of URL successfully structured and scheduled in AutoClip background buffers! Posting on ${scheduleDate} @ ${scheduleTime}.`);
                        setIsScheduled(false);
                      }}
                      className="px-4 py-2 bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl hover:brightness-110 transition-all cursor-pointer"
                    >
                      Confirm Schedule
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

          </div>
        )}
      </div>
    </section>
  );
}
