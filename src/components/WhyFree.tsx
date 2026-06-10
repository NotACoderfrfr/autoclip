import { Heart, Landmark, Check, X, ShieldAlert, BadgeInfo } from "lucide-react";
import { motion } from "motion/react";

export default function WhyFree() {
  const tableData = [
    {
      feature: "Monthly Cost",
      paidTools: "$39 to $89 / mo",
      autoClip: "$0/mo",
      highlight: true
    },
    {
      feature: "Watermark Overlays",
      paidTools: "Yes (unless paid premium)",
      autoClip: "FREE (None)",
      highlight: true
    },
    {
      feature: "Monthly Clip Hours",
      paidTools: "5 hours limit max",
      autoClip: "UNLIMITED",
      highlight: true
    },
    {
      feature: "Export Resolutions",
      paidTools: "720p maximum basic",
      autoClip: "UP TO 4K HD",
      highlight: false
    },
    {
      feature: "AI Bounding Box Crop",
      paidTools: "Yes (sometimes paywalled)",
      autoClip: "FREE INCLUDED",
      highlight: true
    },
    {
      feature: "Direct Platform Schedule",
      paidTools: "Premium only feature",
      autoClip: "FREE INCLUDED",
      highlight: false
    }
  ];

  return (
    <section id="why-free" className="py-24 bg-[#020617] relative overflow-visible border-t border-slate-900/80">
      {/* Decorative dark grid helper */}
      <div className="absolute inset-0 bg-[#060814] opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-visible">
          {/* Left Side: Honest narrative */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase font-mono bg-emerald-950/40 px-3 py-1 rounded-full w-max border border-emerald-500/10 mb-4">
              WHY IS THIS 100% FREE?
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white mb-6">
              Our Commitment to an Open Creator Creative Suite.
            </h3>
            
            <div className="space-y-5 text-slate-400 text-sm md:text-base leading-relaxed">
              <p>
                Paid AI video clip programs charge up to $80 every month just to use standard open-source tools like whisper transcription, ffmpeg aspect cropper, and basic templates. We think that restricts creative freedom.
              </p>
              <p>
                AutoClip represents a community-backed initiative. We sustain server operations through corporate sponsorships, private grants, and voluntary user sponsorships. This means students, developers, and amateur creators can scale content with zero financial barriers.
              </p>
              <p className="border-l-2 border-emerald-500/30 pl-4 py-2 text-slate-300 italic text-sm">
                "Our business model relies on voluntary contributions and compute surplus. Standard high-volume exports are, and will remain, <span className="text-emerald-400 font-bold font-mono text-base">FREE</span> forever."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3">
                <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold font-mono">DONATION BACKED</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">Voluntary supporters sustain direct hosting expenses.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3">
                <Landmark className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold font-mono">SPONSOR SUPPORT</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">Compute surpluses from corporate nodes fund scaling.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: High impact comparison table */}
          <div className="lg:col-span-7 overflow-visible">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-1 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950/20 to-emerald-950/20 border border-slate-800/80 shadow-xl overflow-visible relative"
            >
              {/* Outer decorative ribbon */}
              <div className="absolute -top-3 right-5 bg-emerald-400 text-slate-950 text-[10px] font-black font-mono px-3 py-1 rounded-full uppercase shadow-md shadow-emerald-400/20 tracking-wider">
                COMMUNITY DRIVEN
              </div>

              <div className="p-5 sm:p-6 bg-slate-950 rounded-[14px]">
                <h4 className="text-lg font-bold font-display text-white mb-4">
                  Feature Comparison Study
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800/60 pb-3">
                        <th className="py-3 font-semibold text-slate-400">Capability</th>
                        <th className="py-3 font-semibold text-slate-400">Typical Paid Subscriptions</th>
                        <th className="py-3 font-semibold text-emerald-400 text-right">AutoClip Platform</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/60 font-medium">
                      {tableData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/20 transition-all">
                          <td className="py-3 font-semibold text-slate-200">{row.feature}</td>
                          <td className="py-3 text-slate-400 text-xs flex items-center gap-1.5 self-center">
                            {idx === 0 || idx === 1 || idx === 2 ? (
                              <ShieldAlert className="w-3.5 h-3.5 text-red-500/80 flex-shrink-0" />
                            ) : null}
                            <span>{row.paidTools}</span>
                          </td>
                          <td className={`py-3 text-right font-extrabold ${row.highlight ? "text-emerald-400" : "text-emerald-400/80"}`}>
                            {row.autoClip}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footnote stating open transparency */}
                <div className="mt-5 p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/10 flex gap-2.5 items-start text-left">
                  <BadgeInfo className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-normal">
                    We maintain full billing receipts on GitHub for hosting costs. We do not require credit cards or track user cookies. This app is <span className="text-emerald-400 font-bold">100% FREE</span> for standard high volume uploads.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
