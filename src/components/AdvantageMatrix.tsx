import { useState } from "react";
import { motion } from "motion/react";
import { Check, X, ShieldAlert, Sparkles, AlertCircle, TrendingDown, Clock, Tv } from "lucide-react";

export default function AdvantageMatrix() {
  const [highlightTier, setHighlightTier] = useState<string>("autoclip");

  const matrixData = [
    {
      feature: "Monthly Subscription",
      autoclip: "$0 / Forever Free",
      alternatives: "$20 to $60 per month",
      autoclipHighlight: "text-emerald-400 font-extrabold",
      alternativesHighlight: "text-slate-550 font-normal",
      icon: <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
    },
    {
      feature: "Dual-Format Splitting (Shorts + Longform)",
      autoclip: "Included (Extracts 3-min summaries + multiple vertical Shorts concurrently)",
      alternatives: "Shorts only or requires separate processing queues",
      autoclipHighlight: "text-slate-200",
      alternativesHighlight: "text-slate-500",
      icon: <Tv className="w-4 h-4 text-indigo-400 shrink-0" />
    },
    {
      feature: "Output Video Quality",
      autoclip: "Source-Match Integrity (Up to 4K Ultra HD uncompressed)",
      alternatives: "Capped at 1080p or compressed bitrates to cut cloud hosting costs",
      autoclipHighlight: "text-slate-200",
      alternativesHighlight: "text-slate-500",
      icon: <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
    },
    {
      feature: "Time Investment Per Stream",
      autoclip: "Instantaneous (Set target link once, completely hands-free)",
      alternatives: "2+ Hours (Manual downloading, slicing, rendering wait-times)",
      autoclipHighlight: "text-slate-200",
      alternativesHighlight: "text-slate-500",
      icon: <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
    },
    {
      feature: "Cross-Platform Distribution",
      autoclip: "Fully Autonomous API syndication straight to scheduled queues",
      alternatives: "Manual file downloading and platform-by-platform uploading",
      autoclipHighlight: "text-slate-200",
      alternativesHighlight: "text-slate-500",
      icon: <Check className="w-4 h-4 text-emerald-400 shrink-0" />
    }
  ];

  return (
    <section 
      id="matrix" 
      className="py-24 bg-[#020617] relative overflow-visible border-t border-slate-900/85"
    >
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[#030615] opacity-25 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

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
              📊 ENTERPRISE AUTOMATION • FIXED AT $0/MO
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-[1.1] mb-5 overflow-visible"
          >
            The Economics of Automation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            See how AutoClip collapses traditional video editing time and platform subscription fees into a single, uncompressed, zero-cost framework.
          </motion.p>
        </div>

        {/* Advantage Matrix Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-1 rounded-2xl bg-gradient-to-tr from-slate-900 via-emerald-950/20 to-indigo-950/10 border border-slate-800 shadow-2xl relative overflow-visible"
        >
          {/* Inner body wrapper */}
          <div className="p-5 sm:p-8 bg-slate-950/90 rounded-[14px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 select-none border-b border-slate-900 pb-5">
              <div>
                <h3 className="text-white text-base sm:text-lg font-bold font-display">
                  Platform Feature Vector Evaluation
                </h3>
                <p className="text-[11px] text-slate-500 font-mono mt-1">
                  Comparing uncompressed multi-channel syndication protocols.
                </p>
              </div>

              {/* Selector modes to highlight table aspects */}
              <div className="flex gap-2 bg-slate-900/60 p-1 rounded-xl border border-slate-850/60 w-max shrink-0">
                <button
                  type="button"
                  onClick={() => setHighlightTier("autoclip")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    highlightTier === "autoclip"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Highlight AutoClip
                </button>
                <button
                  type="button"
                  onClick={() => setHighlightTier("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    highlightTier === "all"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Show Baseline
                </button>
              </div>
            </div>

            {/* Matrix Data Table with safe horizontal scroll capability */}
            <div className="w-full overflow-x-auto scrollbar-thin">
              <table className="w-full text-left min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-920 text-[11px] uppercase tracking-wider font-mono text-slate-500 font-bold select-none">
                    <th className="py-4 px-4 font-bold">Feature Vector</th>
                    <th className="py-4 px-5 text-emerald-400 font-black">AutoClip Engine</th>
                    <th className="py-4 px-4">Traditional Paid Tools / Manual Editing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 text-xs font-medium">
                  {matrixData.map((row, idx) => {
                    const isAutoclipFeatured = highlightTier === "autoclip" || highlightTier === "all";
                    return (
                      <tr 
                        key={idx} 
                        className={`transition-all duration-200 group ${
                          highlightTier === "autoclip" ? "hover:bg-indigo-950/10" : "hover:bg-slate-900/20"
                        }`}
                      >
                        {/* Column 1: Feature label */}
                        <td className="py-4.5 px-4 text-slate-200 font-bold flex items-center gap-3">
                          <span className="p-1.5 rounded-md bg-slate-900 border border-slate-800">
                            {row.icon}
                          </span>
                          <span>{row.feature}</span>
                        </td>

                        {/* Column 2: AutoClip capability */}
                        <td className={`py-4.5 px-5 transition-all text-xs border-l border-r border-[#10b981]/10 bg-slate-925/20 ${
                          isAutoclipFeatured ? "bg-emerald-950/5" : ""
                        }`}>
                          <div className="flex items-start gap-2.5">
                            <span className="p-0.5 rounded-md bg-emerald-950 border border-emerald-500/20 mt-0.5 shrink-0">
                              <Check className="w-3 h-3 text-emerald-400 font-black" />
                            </span>
                            <span className={row.autoclipHighlight}>{row.autoclip}</span>
                          </div>
                        </td>

                        {/* Column 3: Alternative paid tools/manual editing constraints */}
                        <td className="py-4.5 px-4 text-slate-400 text-xs leading-normal">
                          <div className="flex items-start gap-2.5">
                            <span className="p-0.5 rounded-md bg-red-950/20 border border-red-500/10 mt-0.5 shrink-0">
                              <X className="w-3 h-3 text-red-500/50" />
                            </span>
                            <span>{row.alternatives}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom context notice */}
            <div className="mt-6 p-4 rounded-xl bg-indigo-950/10 border border-indigo-500/10 flex gap-3 text-left">
              <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-normal">
                Traditional limits like rendering cooldowns or forced export tags are fundamentally anti-creator. 
                We operate on compute surplus grants and open-source stacks to maintain this service at a fixed <span className="text-emerald-400 font-bold font-mono">$0/mo</span> cost with uncompressed throughput.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
