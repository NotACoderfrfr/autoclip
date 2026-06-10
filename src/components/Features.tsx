import { Crop, Sparkles, TrendingUp, Calendar, ArrowUpRight, Scissors, Play, Check } from "lucide-react";
import { motion } from "motion/react";

export default function Features() {
  const features = [
    {
      icon: <Crop className="w-5 h-5 text-indigo-400" />,
      tag: "VIDEO CRITICAL CROP",
      title: "AI Multi-Speaker Auto-Crop to 9:16",
      desc: "Our model detects faces, speaking focus, and action bounding boxes simultaneously, intelligently keeping focus centered in vertical format as the subject moves.",
      badge: "Aspect Smart",
      accent: "from-indigo-500/20 to-violet-500/5",
      border: "hover:border-indigo-500/30",
      layout: "col-span-1 md:col-span-2",
      interactiveElement: (
        <div className="mt-5 relative h-36 rounded-xl bg-slate-950 border border-slate-900 overflow-hidden flex items-center justify-center">
          {/* Grid bg inside crop illustration */}
          <div className="absolute inset-0 bg-[#090b16] opacity-60 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem]" />
          
          {/* Aspect box indicators */}
          <div className="absolute top-2 bottom-2 aspect-[9/16] bg-violet-600/10 border-2 border-dashed border-indigo-500 rounded flex flex-col justify-between p-1.5 overflow-hidden shadow-lg shadow-indigo-500/10">
            <span className="text-[8px] font-mono font-bold text-indigo-400 bg-slate-950/80 px-1 rounded border border-indigo-500/20 w-max">9:16 ACTIVE FIELD</span>
            <div className="w-full flex items-center justify-center gap-1.5 py-4">
              {/* Talking head mock */}
              <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center relative">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span className="absolute -inset-1 rounded-full border border-indigo-400/40 animate-ping" />
              </div>
            </div>
            <span className="text-[7px] text-center font-mono text-indigo-300">STABILIZED CAPTURING</span>
          </div>
          {/* Horizontal landscape bounds representing raw widescreen video */}
          <div className="w-5/6 h-28 border border-white/5 rounded-lg flex items-center justify-between px-4 text-slate-600 pointer-events-none">
            <span className="text-[9px] font-mono">16:9 Left Crop</span>
            <span className="text-[9px] font-mono">16:9 Right Crop</span>
          </div>
        </div>
      )
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      tag: "DYNAMIC PHONETIC",
      title: "Viral Dynamic Captions & Emojis",
      desc: "Instantly transcribes any audio track with pristine phonetic accuracy. Infuses dynamic, interactive styles with custom multi-line subtitle overlays and context-aware emoji injection.",
      badge: "No Watermark",
      accent: "from-emerald-500/20 to-teal-500/5",
      border: "hover:border-emerald-500/30",
      layout: "col-span-1",
      interactiveElement: (
        <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-900 flex flex-col gap-2.5 font-sans justify-center h-36">
          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">Hormozi Style</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-400">Beast Style</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-400">Cyber Style</span>
          </div>
          <div className="text-center py-2">
            <span className="text-sm font-black tracking-tight font-display text-emerald-400 drop-shadow-md">
              THIS is how you <span className="bg-emerald-400 text-slate-950 px-1 py-0.2 rounded font-extrabold uppercase">SCALE</span> your brand! 📈🚀
            </span>
          </div>
        </div>
      )
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
      tag: "AUDIENCE HOOKS",
      title: "Algorithmic Virality Predictor",
      desc: "Analyzes conversational momentum, loud pitch points, transcript speed-ups, and user-defined hook words to precisely extract the most retention-driving chunks.",
      badge: "Real-Time Scan",
      accent: "from-indigo-500/20 to-blue-500/5",
      border: "hover:border-indigo-500/30",
      layout: "col-span-1",
      interactiveElement: (
        <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-900 h-36 flex flex-col justify-end">
          <div className="flex items-end gap-1.5 h-16 w-full px-1.5">
            {[40, 25, 75, 45, 90, 30, 85, 35, 100, 50, 40].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    val >= 85 ? "bg-indigo-500 shadow-md shadow-indigo-500/30 h-14" : "bg-slate-800 h-8"
                  }`}
                  style={{ height: `${(val / 100) * 44}px` }} 
                />
                {val >= 85 && <span className="text-[8px] font-mono font-bold text-indigo-400">HOOK</span>}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3 border-t border-slate-900 pt-2 px-1 text-[10px] font-mono text-slate-400">
            <span>Video Segment Track</span>
            <span className="text-emerald-400 font-bold">Max Virality 96%</span>
          </div>
        </div>
      )
    },
    {
      icon: <Calendar className="w-5 h-5 text-indigo-400" />,
      tag: "BUFFER AUTOPOST",
      title: "No-Limit Social Posting & Scheduling",
      desc: "Integrate with YouTube Shorts, TikTok, and Instagram Reels pipelines. Run custom buffer templates, schedule exact drops, and watch your multi-platform traffic grow automatically.",
      badge: "Direct Pipeline",
      accent: "from-indigo-500/20 to-emerald-500/5",
      border: "hover:border-emerald-500/30",
      layout: "col-span-1 md:col-span-2",
      interactiveElement: (
        <div className="mt-5 grid grid-cols-3 gap-2 h-36">
          {[
            { platform: "TikTok", time: "Everyday @ 12:00 PM", active: true, color: "text-slate-200 border-slate-800" },
            { platform: "YouTube Shorts", time: "Mon, Wed, Fri @ 5:30 PM", active: true, color: "text-red-400 border-red-500/20 bg-red-950/10" },
            { platform: "Instagram Reels", time: "Tue, Thu @ 9:00 AM", active: false, color: "text-pink-400 border-pink-500/20 bg-pink-950/10" }
          ].map((item, idx) => (
            <div key={idx} className={`p-2.5 rounded-xl bg-slate-950 border ${item.color} flex flex-col justify-between text-left`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{item.platform}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-emerald-400" : "bg-slate-600"}`} />
                </div>
                <span className="text-[9px] text-slate-500 block mt-1 font-mono">{item.time}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded border border-white/5 text-[9px] font-mono text-emerald-400">
                <Check className="w-2.5 h-2.5" />
                <span>Simulated Pipeline</span>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#020617] border-t border-slate-900/80 relative overflow-visible">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase font-mono bg-indigo-950/30 px-3 py-1 rounded-full w-max mx-auto border border-indigo-500/10 mb-4">
            PRO-GRADE TOOLSET
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-5 leading-tight">
            Stop Paying for AI Clip Editors.
          </h3>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed font-sans">
            AutoClip bundles high-end automation components previously locked behind $30+/month subscriptions — absolutely free with unlimited monthly exports.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-visible">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 hover:border-slate-700/80 shadow-md ${feature.layout} ${feature.border} flex flex-col justify-between group transition-all duration-300 relative overflow-visible`}
            >
              {/* Corner decorative light element */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${feature.accent} blur-[35px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div>
                {/* Header Tag and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      {feature.icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider font-mono text-slate-500 group-hover:text-slate-400 transition-colors uppercase">
                      {feature.tag}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold font-mono text-slate-400 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded-full">
                    {feature.badge}
                  </span>
                </div>

                <h4 className="text-lg md:text-xl font-bold font-display text-white mb-2 leading-snug">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Render dynamic interactive illustrations */}
              {feature.interactiveElement}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
