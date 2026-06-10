import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Terminal, ShieldCheck, Heart, Code2, Database } from "lucide-react";

export default function Infrastructure() {
  const [activeTab, setActiveTab] = useState<"architecture" | "ffmpeg" | "whisper">("architecture");

  // Telemetry code blocks to simulate developer curiosity
  const codeSnippets = {
    ffmpeg: `# Lossless Container-Level Crop Protocol
ffmpeg -i input_source_4k.mp4 \\
  -vf "crop=ih*9/16:ih" \\
  -c:v libx264 -crf 18 -preset superfast \\
  -c:a copy \\
  -movflags +faststart \\
  output_vertical_shorts_9_16.mp4`,

    whisper: `# Decentralized Whisper Whisper-Large V3 API Payload
import whisper_node
transcription = whisper_node.transcribe(
    media="stream_audio_buffer.wav", 
    model="large-v3", 
    beam_size=5,
    word_timestamps=True,
    syndication_mode="kinetic_caption"
)`,
    architecture: `# Cloud Architecture Orchestrator
version: '3.8'
services:
  ingest_ingress:
    image: autoclip/source-acquisition:latest
    deploy:
      resources:
        reservations:
          cpus: '8.0'
          memory: 16G`
  };

  return (
    <section 
      id="infrastructure" 
      className="py-24 bg-[#020617] relative overflow-visible border-t border-slate-900/85"
    >
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[#04081c] opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 mb-4"
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400 uppercase">
              🔓 OPEN-SOURCE ENGINES • NO HIDDEN CATCHES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-[1.1] mb-5 overflow-visible"
          >
            Architected for Transparency
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            We believe viral growth tools should be accessible to everyone. Here is exactly how we keep AutoClip 100% free while maintaining uncompressed, elite performance.
          </motion.p>
        </div>

        {/* Dual-Engine Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Card 1: FFmpeg Core */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 relative overflow-visible hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white text-base sm:text-lg font-bold font-display">
                      The Core Media Engine
                    </h3>
                    <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">
                      FFmpeg Core integration
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/10">
                  Lossless Native Slicing
                </span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Instead of routing videos through expensive corporate rendering APIs that compress your footage, AutoClip hooks directly into FFmpeg. This lightweight, open-source engine manipulates video streams at the container level. It applies a lossless vertical 9:16 canvas crop and extracts your 3-minute summary clips using the exact original video bitrate. No re-encoding lag, no compression artifacts, and zero corporate overhead fees.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setActiveTab("ffmpeg")}
                className="text-xs font-mono font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-950/20 px-3 py-1.5 rounded-lg border border-indigo-500/10 hover:border-indigo-500/30 transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Inspect Media Stream Cropper Config</span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: Whisper AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 relative overflow-visible hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/20 text-violet-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white text-base sm:text-lg font-bold font-display">
                      The Transcription Matrix
                    </h3>
                    <p className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold">
                      Open-Source Whisper Model
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/10">
                  Local-Node Subtitling
                </span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We handle our voice-to-text transcription using open-source Whisper models. Because these models run efficiently across decentralized GPU clusters, we don't pay per-minute transcription costs to big-tech cloud monopolies. This lets us generate hyper-accurate, animated kinetic captions across unlimited video queues for an infrastructure cost of mere fractions of a penny.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setActiveTab("whisper")}
                className="text-xs font-mono font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 bg-violet-950/20 px-3 py-1.5 rounded-lg border border-violet-500/10 hover:border-violet-500/30 transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Inspect Transcription Schema JSON</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* Console Interactive Code Inspector Dropdown */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mb-12 rounded-2xl border border-slate-800 bg-slate-950/95 overflow-hidden shadow-2xl relative"
        >
          {/* Header tabs */}
          <div className="flex items-center justify-between bg-slate-900/60 border-b border-slate-900 px-6 py-3 select-none">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-emerald-400 animate-spin-slow" />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                System Code Playbook Inspector
              </span>
            </div>
            
            <div className="flex gap-2">
              {(["architecture", "ffmpeg", "whisper"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded text-[10px] font-mono tracking-tight transition-all cursor-pointer border ${
                    activeTab === tab
                      ? "bg-indigo-600/90 border-indigo-500 text-white font-bold"
                      : "bg-[#090a16] border-slate-850 text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "architecture" ? "orchestrator.yml" : tab === "ffmpeg" ? "slice_engine.sh" : "whisper_model.py"}
                </button>
              ))}
            </div>
          </div>

          {/* Code Window */}
          <div className="p-6 font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed text-left bg-[#03050d] overflow-x-auto overflow-y-visible">
            <pre className="text-indigo-300 select-all">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>
        </motion.div>

        {/* How We Keep the Lights On Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 md:p-10 text-left relative overflow-hidden shadow-2xl"
        >
          {/* Subtle decoration overlay */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/[0.02] to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest font-mono uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Autoclip Community Trust Mandate</span>
              </div>
              <h4 className="text-white text-lg sm:text-xl font-bold font-display tracking-tight">
                How We Keep the Lights On
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                AutoClip remains free because it is powered by open-source collaboration. We fund our background server infrastructure entirely through voluntary developer donations, community sponsorships, and optional premium API integrations for large media agencies. Your channel data, OAuth connections, and personal analytics will <span className="text-emerald-400 font-extrabold">never be sold</span>, locked behind paywalls, or monetized.
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center gap-4 w-full md:w-auto pt-2 md:pt-0">
              <a
                href="https://github.com" 
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl text-xs font-bold text-white shadow-lg glow-button cursor-pointer hover:brightness-110 flex items-center justify-center gap-2 text-center"
              >
                <Heart className="w-4 h-4 text-rose-400 fill-rose-450 shrink-0" />
                <span>Support Open Source</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
