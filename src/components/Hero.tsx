import React, { useState } from "react";
import { Youtube, Sparkles, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  channelUrl: string;
  setChannelUrl: (url: string) => void;
  onAutomate: (url: string) => void;
}

export default function Hero({ channelUrl, setChannelUrl, onAutomate }: HeroProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Quick preset channels to make it immediately fun and accessible
  const suggestions = [
    { handle: "@MrBeast", url: "https://youtube.com/@MrBeast" },
    { handle: "@MKBHD", url: "https://youtube.com/@mkbhd" },
    { handle: "@HubermanLab", url: "https://youtube.com/@hubermanlab" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelUrl.trim()) {
      setErrorMsg("Please enter a YouTube channel URL or @Handle to continue");
      return;
    }
    setErrorMsg("");

    // Simulate mobile haptic feedback if available (vibration)
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate([40, 30, 40]);
      } catch (err) {
        // Safe fallback if permission is blocked in iframe
      }
    }

    onAutomate(channelUrl);
  };

  const insertSuggestion = (url: string) => {
    setChannelUrl(url);
    setErrorMsg("");
    // Pulsing highlight
    setIsFocused(true);
    setTimeout(() => setIsFocused(false), 800);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-visible flex flex-col items-center justify-center bg-[#020617] cyber-gradient">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Floating ambient orb */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-40 left-1/3 w-60 h-60 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 overflow-visible">
        {/* Eyebrow Tag Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/40 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mx-auto mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold font-mono tracking-wider text-slate-100 uppercase">
            🤖 DUAL-STREAM AI SYNDICATION — 100% <span className="text-emerald-400 font-extrabold">FREE</span> FOREVER
          </span>
        </motion.div>

        {/* Main Title - overflow-visible prevents truncation on custom fonts */}
        <div className="overflow-visible py-2 mb-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display leading-[1.05] overflow-visible"
          >
            <span className="bg-gradient-to-b from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent block pb-1">
              Automated Clips.
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-violet-500 to-emerald-400 bg-clip-text text-transparent block">
              Zero Effort.
            </span>
          </motion.h1>
        </div>

        {/* Sub-Headline Descriptive Prose */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-slate-400 max-w-3xl mx-auto font-sans leading-relaxed mb-10"
        >
          AutoClip is the world's first autonomous content arbitrage engine. Paste any public YouTube URL (like FIFA, top podcasts, or massive creators) and link your target channel. The moment they drop a long-form video, our cloud AI analyzes retention heatmaps to extract both high-engagement 3-minute summary videos and viral vertical Shorts. Complete with AI-generated kinetic captions, metadata titles, viral tag matrices, and fully automated scheduling straight to your channel. <span className="text-emerald-400 font-extrabold">100% Free</span>.
        </motion.p>

        {/* Channel Connect Input Field & Connect Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto overflow-visible mb-5"
        >
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-slate-900/50 backdrop-blur-sm border transition-all duration-350 relative input-glow ${
              isFocused
                ? "border-indigo-500 shadow-lg shadow-indigo-500/15"
                : "border-slate-800 hover:border-slate-750"
            }`}
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-0">
              <Youtube className="w-5.5 h-5.5 text-red-500 flex-shrink-0" />
              <input
                type="text"
                value={channelUrl}
                onChange={(e) => {
                  setChannelUrl(e.target.value);
                  setErrorMsg("");
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter any target YouTube channel URL or @handle to clone..."
                className="w-full bg-transparent text-slate-100 font-medium placeholder-slate-600 text-sm focus:outline-none focus:ring-0"
              />
            </div>

            {/* Premium Interactive Action Button with glow-button style from theme */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-bold text-sm tracking-wide shadow-md glow-button flex items-center justify-center gap-2 group transition-all cursor-pointer border-t border-white/20"
            >
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse group-hover:scale-110 transition-transform" />
              <span>Automate This Channel</span>
              <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left px-4 mt-2 text-red-400 text-xs font-semibold flex items-center gap-1"
            >
              ⚠️ {errorMsg}
            </motion.p>
          )}
        </motion.div>

        {/* Suggestion tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-500 mb-12"
        >
          <span>Or test popular creators immediately:</span>
          <div className="flex gap-2">
            {suggestions.map((item) => (
              <button
                key={item.handle}
                type="button"
                onClick={() => insertSuggestion(item.url)}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-indigo-400 font-medium font-mono text-[11px] transition-all cursor-pointer"
              >
                {item.handle}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trust Badging Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-slate-900/60 max-w-3xl mx-auto"
        >
          {[
            {
              icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
              title: "No Account Required",
              desc: "Get started instantly without entering any credit card or details"
            },
            {
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
              title: "Unlimited Rendering",
              desc: "Create up to 4K resolution short clips with zero watermark overlay"
            },
            {
              icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
              title: "Fully Automated Engine",
              desc: "AI identifies highlights, speaker position, and captions in seconds"
            }
          ].map((trait, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 p-3 rounded-xl hover:bg-slate-900/20 transition-all">
              <div className="flex items-center gap-2">
                {trait.icon}
                <span className="text-white font-semibold text-xs tracking-wide">{trait.title}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">{trait.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
