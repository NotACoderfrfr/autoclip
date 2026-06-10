import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  DownloadCloud, 
  GitFork, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Cpu, 
  Play, 
  Maximize2, 
  Globe, 
  Activity, 
  Shuffle, 
  Languages, 
  Check, 
  FileText
} from "lucide-react";

export default function Workflow() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(true);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [captionIndex, setCaptionIndex] = useState<number>(0);

  // Define steps
  const steps = [
    {
      id: 0,
      stepNumber: "STEP 01",
      title: "Direct Stream Acquisition",
      subLabel: "Source-Match Delivery Protocol",
      icon: <DownloadCloud className="w-5 h-5 text-indigo-400" />,
      description: "The moment your target channel uploads, our pipeline captures the source stream directly. Unlike other platforms that heavily compress video files to save on their own bandwidth bills, AutoClip pulls the absolute maximum resolution available—supporting pristine, uncompressed 1080p, 2K, and 4K configurations without losing a single bit of visual fidelity.",
      accent: "indigo",
      telemetry: [
        { label: "Connection Speed", value: "10 Gbps DevLink" },
        { label: "Packet Loss Rate", value: "0.000%" },
        { label: "Ingest Buffer Limit", value: "Unlimited Caching" },
        { label: "Format Resolution", value: "Smart Source-Bitrate (2K/4K)" }
      ]
    },
    {
      id: 1,
      stepNumber: "STEP 02",
      title: "Dual-Format AI Splitting",
      subLabel: "Heatmap & Retention Extraction",
      icon: <GitFork className="w-5 h-5 text-violet-400" />,
      description: "Our AI scans audio peaks, optical cuts, and metadata trends to fork the content into two distinct asset streams: an engaging 3-minute long-form summary video and multiple viral, fast-paced 9:16 vertical Shorts.",
      accent: "violet",
      telemetry: [
        { label: "Scan Engine Mode", value: "Retention Heatmaps & Cuts" },
        { label: "Shorts Extracted", value: "5-8 clips per stream" },
        { label: "Avg. Duration", value: "32s (Shorts) / 180s (Summary)" },
        { label: "Audio Pitch Analysis", value: "Momentum Highlight Spikes" }
      ]
    },
    {
      id: 2,
      stepNumber: "STEP 03",
      title: "Kinetic Context Engine",
      subLabel: "Automated Metadata & Graphic Styling",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      description: "The engine transcribes audio in real-time, overlaying dynamic kinetic captions. Simultaneously, it generates high-retention titles, optimized description fields, and targeted viral tag matrices custom-tailored to YouTube's search algorithms.",
      accent: "emerald",
      telemetry: [
        { label: "Whisper Transcription", value: "99.8% Accuracy Score" },
        { label: "Caption Style Preset", value: "Epic Bold Kinetic (Hormozi)" },
        { label: "Title Optimization", value: "AI-Augmented CTR Focus" },
        { label: "Tag Matrices generated", value: "30+ High-Search Queries" }
      ]
    },
    {
      id: 3,
      stepNumber: "STEP 04",
      title: "Secure API Syndication",
      subLabel: "Direct-to-Channel API Publishing",
      icon: <Send className="w-5 h-5 text-indigo-400" />,
      description: "Your finalized high-definition assets are securely handed off directly to your connected channel via optimized OAuth pipelines. Content publishes automatically into your scheduled slots on complete autopilot.",
      accent: "indigo",
      telemetry: [
        { label: "Authentication protocol", value: "Secure Enterprise OAuth 2.0" },
        { label: "API Handshake speed", value: "120ms Latency" },
        { label: "Daily Syndication Cap", value: "Unlimited Submissions" },
        { label: "Publish Mode", value: "Scheduled Queue Buffer" }
      ]
    }
  ];

  // Dynamic Telemetry Console Generator to simulate a real-time process
  useEffect(() => {
    if (!isPlayingSimulation) return;

    const interval = setInterval(() => {
      let logs: string[] = [];
      const now = new Date().toLocaleTimeString();

      if (activeStep === 0) {
        logs = [
          `[${now}] INGEST: Checking target feed on RSS socket...`,
          `[${now}] INGEST: New stream event detected (4K UHD metadata accepted)`,
          `[${now}] INGEST: Est. handshake with raw CDN delivery servers`,
          `[${now}] INGEST: Pulling uncompressed payload segment... 48.4 MB/s`
        ];
      } else if (activeStep === 1) {
        logs = [
          `[${now}] AI_SPLIT: Generating audio waveform pitch points...`,
          `[${now}] AI_SPLIT: Analyzing viewport motion-vector differentials`,
          `[${now}] AI_SPLIT: High engagement candidate found at offsets 04:12 - 04:45`,
          `[${now}] AI_SPLIT: Forking streams -> 1x 3-Min Master, 5x Vertical Shorts`
        ];
      } else if (activeStep === 2) {
        logs = [
          `[${now}] KINETIC: Transcription started: converting phonetic vectors...`,
          `[${now}] KINETIC: Overlaying Hormozi gradient styling structure`,
          `[${now}] KINETIC: Optimizing metadata titles targeting SEO trends`,
          `[${now}] KINETIC: Tag matrix mapped out safely to database schemas`
        ];
      } else if (activeStep === 3) {
        logs = [
          `[${now}] SYNDICATE: Initializing client OAuth 2.0 security token`,
          `[${now}] SYNDICATE: Video upload packet #493 dispatched and acknowledged`,
          `[${now}] SYNDICATE: Scheduling state: QUEUED to hit peak timezone at 18:00`,
          `[${now}] SYNDICATE: Syndicated stream live on target channels successfully!`
        ];
      }

      // Mix them and set state
      setSimulationLog((prev) => {
        const withNew = [...prev, ...logs];
        return withNew.slice(-5); // keep last 5
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [activeStep, isPlayingSimulation]);

  // Handle active caption animations
  const captionsList = [
    { text: "BUT HOW DO YOU SCALE?", color: "text-white" },
    { text: "YOU DON'T RECORD MORE.", color: "text-indigo-400 font-extrabold" },
    { text: "YOU SYNDICATE PRE-EXISTING POWER!", color: "text-emerald-400 font-black uppercase tracking-wider" }
  ];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % captionsList.length);
    }, 2200);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section 
      id="workflow" 
      className="py-24 bg-[#020617] relative overflow-visible border-t border-slate-900/80"
    >
      {/* Visual background grids & orbs */}
      <div className="absolute inset-0 bg-[#04081b] opacity-30 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/30 border border-indigo-500/20 mb-4"
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400 uppercase">
              ⚙️ NO STORAGE LOSS • SOURCE-BITRATE INTEGRITY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-[1.1] mb-5 overflow-visible"
          >
            The Autonomous Syndication Pipeline
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            AutoClip replaces complex cloud setups, multi-gigabyte storage transfers, and video editing suites 
            with a singular, zero-cost pipeline designed specifically to keep your channels fresh on autopublish.
          </motion.p>
        </div>

        {/* Horizontal Desktop Step Linkages / Vertical Mobile list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* STEP CARDS (Left Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold font-mono text-slate-500 tracking-wider uppercase mb-2">
              ACTIVE CLOUD STAGES (SELECT A STEP TO VIEW TELMETRY)
            </h3>
            
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    onClick={() => setActiveStep(idx)}
                    className={`p-6 md:p-8 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-visible ${
                      isActive 
                        ? "bg-slate-900/85 border-indigo-500/40 shadow-lg shadow-indigo-500/5 glow-indigo" 
                        : "bg-[#090b16]/65 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/30"
                    }`}
                  >
                    {/* Active side indicator tag */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl" />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Step index & icon container */}
                      <div className={`p-3 rounded-xl border flex-shrink-0 ${
                        isActive 
                          ? "bg-indigo-950/40 border-indigo-500/30 text-indigo-400" 
                          : "bg-slate-950 border-slate-850 text-slate-500"
                      }`}>
                        {step.icon}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black text-indigo-400 tracking-wider">
                            {step.stepNumber}
                          </span>
                          <span className={`text-[10px] font-mono border px-2 py-0.5 rounded-full ${
                            isActive 
                              ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20" 
                              : "bg-slate-900 text-slate-500 border-transparent"
                          }`}>
                            {step.subLabel}
                          </span>
                        </div>

                        <h4 className="text-white text-base sm:text-lg font-bold font-display tracking-tight">
                          {step.title}
                        </h4>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-2">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* TELEMETRY / WORKSPACE DEMO PREVIEW (Right Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-bold font-mono text-slate-500 tracking-wider uppercase mb-2">
              REAL-TIME PROCESS SIMULATION
            </h3>

            {/* Simulated Live Display Frame */}
            <div className="glass-panel rounded-2xl border border-slate-800/80 p-6 flex flex-col h-[520px] justify-between relative overflow-hidden shadow-2xl">
              
              {/* Dynamic top header bar */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase">Pipeline Live Console</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-tight">ONLINE</span>
                </div>
              </div>

              {/* SIMULATED INTERACTIVE WORK AREA */}
              <div className="flex-1 flex flex-col justify-between py-2 overflow-visible">
                
                {/* 1. VISUAL INTERACTION STATE PREVIEW */}
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-900 min-h-[160px] flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-600">
                    STAGE PREVIEW
                  </div>

                  {/* Active step custom illustration/simulation markup */}
                  {activeStep === 0 && (
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <div className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold animate-pulse">
                          Bitrate: 85 Mbps
                        </div>
                        <div className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono">
                          SSL Secure
                        </div>
                      </div>
                      <div className="flex max-w-xs mx-auto items-center justify-between border border-slate-850 p-3 rounded-lg bg-slate-900/60">
                        <span className="text-[10px] font-mono text-slate-400">YouTube CDN IP</span>
                        <span className="text-xs font-bold font-mono text-indigo-400">172.217.15.78</span>
                      </div>
                      <p className="text-[10px] text-slate-500 px-4">
                        Zero bandwidth throttle system pulling direct media buffers safely.
                      </p>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Heatmap Peaks Scan</span>
                        <span className="text-indigo-400 font-bold">8.4x Engagement Weight</span>
                      </div>
                      <div className="h-10 border border-slate-900 rounded-lg flex items-end gap-1 p-1 bg-slate-900/40 relative">
                        {[50, 80, 45, 95, 30, 75, 40, 85, 99, 60, 45, 90, 30].map((v, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-t-sm transition-all duration-300 ${
                              v > 80 ? "bg-indigo-500 h-full" : "bg-slate-800 h-6"
                            }`} 
                            style={{ height: `${v}%` }}
                          />
                        ))}
                        {/* Overlay marker */}
                        <div className="absolute inset-y-0 left-[60%] w-0.5 bg-emerald-400 shadow-md flex items-center justify-center">
                          <span className="absolute -top-3 text-[7px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-bold font-mono px-1 rounded">
                            SPLIT POINT
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 text-center">
                        Intelligent fork isolates full summary & 9:16 vertical short regions.
                      </p>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-3 flex flex-col justify-center items-center">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        LIVE WORDS STYLING GENERATOR
                      </div>
                      
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 w-full text-center">
                        {captionsList.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ 
                              opacity: captionIndex === index ? 1 : 0,
                              display: captionIndex === index ? "block" : "none"
                            }}
                            transition={{ duration: 0.3 }}
                            className={`text-sm tracking-tight font-black font-display font-sans ${item.color}`}
                          >
                            {item.text}
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-bold">
                          #VIRALSIGNALS
                        </span>
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/20">
                          CTR OPTIMIZED
                        </span>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                        <CheckCircle2 className="w-6 h-6 animate-pulse" />
                      </div>
                      <h5 className="text-white text-xs font-bold font-display">
                        API Handshake Secured
                      </h5>
                      <div className="text-[10px] font-mono text-slate-400 max-w-xs mx-auto">
                        Channels: YouTube Shorts <span className="text-emerald-400">•</span> Instagram Reels <span className="text-emerald-400">•</span> TikTok Sync
                      </div>
                      <p className="text-[10px] text-emerald-400 font-mono font-bold">
                        AUTOPILOT ARBITRAGE ACTIVE
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. DYNAMIC REAL-TIME EVENT STREAM TELEMETRY TABLE */}
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>STEP LOG STREAM</span>
                    <button 
                      onClick={() => {
                        setSimulationLog([]);
                        const now = new Date().toLocaleTimeString();
                        setSimulationLog([`[${now}] MONITOR: Log console buffer cleared.`]);
                      }} 
                      className="text-indigo-400 hover:text-indigo-300 font-bold uppercase transition"
                    >
                      Clear Log
                    </button>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4 border border-slate-900 h-[178px] font-mono text-[10.5px] text-slate-300 leading-relaxed overflow-y-auto space-y-1.5 scrollbar-thin select-none">
                    {simulationLog.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-slate-600 text-xs">
                        Connecting socket... logs will append automatically.
                      </div>
                    ) : (
                      simulationLog.map((log, lidx) => (
                        <div key={lidx} className="border-b border-slate-950 pb-1 last:border-b-0">
                          <span className="text-emerald-400">&gt; </span>
                          <span>{log}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic bottom telemetry parameters */}
              <div className="border-t border-slate-900 pt-4 mt-2 grid grid-cols-2 gap-3 text-left">
                {steps[activeStep].telemetry.map((t, tid) => (
                  <div key={tid} className="bg-slate-950/80 p-2 rounded-lg border border-white/[0.02]">
                    <div className="text-[9px] font-mono text-slate-500 uppercase">{t.label}</div>
                    <div className="text-[11px] font-mono text-slate-200 mt-0.5 truncate font-bold">{t.value}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic bottom pipeline metrics callout to show enterprise scale */}
        <div className="mt-12 glass-panel border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-visible">
          <div className="text-left space-y-1">
            <h4 className="text-white text-base sm:text-lg font-bold font-display">
              Ready to automate your social arbitrage network?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              Connect multiple YouTube channels and start farming high-engagement content clips completely automated.
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto h-12 flex-shrink-0">
            <button
              onClick={() => {
                const urlInput = document.getElementById("main-channel-url-input");
                if (urlInput) {
                  urlInput.focus();
                }
                const heroElement = document.getElementById("main-header");
                if (heroElement) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs sm:text-sm tracking-wide rounded-xl shadow-md glow-button cursor-pointer flex items-center justify-center gap-2 text-white border-t border-white/15 h-full w-full md:w-auto"
            >
              <span>Launch First Channel</span>
              <Play className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
