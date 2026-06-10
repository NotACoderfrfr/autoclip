import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Scissors, 
  Youtube, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Github, 
  MessageSquare, 
  ExternalLink,
  Lock,
  Globe,
  Info
} from "lucide-react";

interface FooterProps {
  channelUrl: string;
  setChannelUrl: (url: string) => void;
  onAutomate: (url: string) => void;
}

export default function Footer({ channelUrl, setChannelUrl, onAutomate }: FooterProps) {
  const [localUrl, setLocalUrl] = useState(channelUrl);
  const [errorMsg, setErrorMsg] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeTelemetryCount, setActiveTelemetryCount] = useState(1428);
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  // Keep local input URL synchronized with global state if changed elsewhere
  useEffect(() => {
    setLocalUrl(channelUrl);
  }, [channelUrl]);

  // Slowly increment active telemetry channels count to simulate real persistent growth
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTelemetryCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localUrl.trim()) {
      setErrorMsg("Please enter a YouTube channel URL or @Handle to continue");
      return;
    }
    setErrorMsg("");

    // Mobile haptic feedback trigger simulation
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate([40, 30]);
      } catch (err) {
        // Safe catch for iframe security constraints
      }
    }

    setChannelUrl(localUrl);
    onAutomate(localUrl);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Google OAuth transparency and privacy disclosures
  const openDisclosure = (type: "privacy" | "terms" | "google") => {
    if (type === "privacy") {
      setModalContent({
        title: "Privacy & Personal Data Protection Policy",
        body: "Your privacy is our core engineering priority. AutoClip acts as a zero-cache secure wrapper. OAuth tokens retrieved through Google services are stored locally inside sandboxed browser metadata or highly encrypted short-lived cloud memory keys. Your raw metrics, uncompressed video frames, and audience segments are processed strictly in transit and never stored on persistent storage. We do not maintain user profile catalogs or share analytics databases with third-party tracking conglomerates."
      });
    } else if (type === "terms") {
      setModalContent({
        title: "AutoClip Open Terms of Service",
        body: "All background engines and stream splitting features are distributed under open-source licenses (MIT/GPL). By linking your media channel, you authorize the AutoClip engine to execute container-level video slicing, kinetic sub-tile overlays, and scheduled dispatch calls on your behalf. Submitting video streams of third-party creators requires appropriate licensing or authorization under public fair use guidelines. You remain fully liable for any content syndicate pipelines deployed on your networks."
      });
    } else {
      setModalContent({
        title: "Google & YouTube Data Disclosure",
        body: "AutoClip is committed to strict Google Developer Security compliance. Our service accesses standard YouTube Data API (v3) endpoints to retrieve public channel URLs, upload vertical shorts, and schedule playlist queue offsets. This application strictly complies with the Google API Services User Data Policy, including all Limited Use requirements. None of your Google OAuth session metadata is written to non-volatile databases, ensuring absolute programmatic containment."
      });
    }
  };

  return (
    <footer 
      id="cta-footer" 
      className="bg-[#020617] relative overflow-visible border-t border-slate-900 pt-24 pb-8"
    >
      {/* Background neon elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-40 rounded-full bg-indigo-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
        
        {/* ==========================================
            2. THE LIVE-TELEMETRY CONVERSION CARD 
           ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-1 bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 shadow-2xl overflow-visible mb-20 group"
        >
          {/* Subtle hover gradient glow active behind */}
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />

          <div className="relative rounded-[22px] bg-slate-950/95 p-8 md:p-12 text-center overflow-visible">
            
            {/* Live Telemetry Pulse Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/20 mb-6 select-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[10px] md:text-xs font-mono font-black text-emerald-400 uppercase tracking-widest leading-none">
                ● LIVE TELEMETRY: {activeTelemetryCount.toLocaleString()} CHANNELS ACTIVE RIGHT NOW
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-[1.1] mb-4 overflow-visible">
              Automate Your Network. Command the Algorithm.
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-10">
              Stop paying massive corporate subscription fees for compressed videos and limited queues. 
              Paste your target channel URL below, secure your distribution stream via safe Google OAuth, 
              and launch your automated short-form and long-form growth channels today.
            </p>

            {/* Duplicate Input Re-entry console */}
            <div className="max-w-2xl mx-auto overflow-visible mb-5">
              <form
                onSubmit={handleSubmit}
                className={`flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-slate-900/50 backdrop-blur-sm border transition-all duration-300 relative input-glow ${
                  isFocused
                    ? "border-indigo-500 shadow-lg shadow-indigo-500/15"
                    : "border-slate-800 hover:border-slate-750"
                }`}
              >
                <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-0">
                  <Youtube className="w-5.5 h-5.5 text-red-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={localUrl}
                    onChange={(e) => {
                      setLocalUrl(e.target.value);
                      setErrorMsg("");
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter any target YouTube channel URL or @handle to clone..."
                    className="w-full bg-transparent text-slate-100 font-medium placeholder-slate-600 text-sm focus:outline-none focus:ring-0"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-bold text-sm tracking-wide shadow-md glow-button flex items-center justify-center gap-2 group transition-all cursor-pointer border-t border-white/20"
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse group-hover:scale-110 transition-transform" />
                  <span>Launch Free Automation</span>
                  <ArrowRight className="w-4 h-4 text-white/85 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-left px-4 mt-2 text-red-400 text-xs font-semibold"
                >
                  ⚠️ {errorMsg}
                </motion.p>
              )}
            </div>

            {/* Custom Google compliance disclaimer links */}
            <p className="text-[11px] text-slate-500 max-w-xl mx-auto leading-relaxed">
              🔒 Secure Google OAuth integration. Read our{" "}
              <button 
                onClick={() => openDisclosure("privacy")}
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline cursor-pointer hover:brightness-110"
              >
                Data & Privacy Protection Policy
              </button>{" "}
              to see how we safeguard your channel metrics.
            </p>

          </div>
        </motion.div>

        {/* ==========================================
            3. THE SEAMLESS GLOBAL CORPORATE FOOTER 
           ========================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 pb-8 border-t border-slate-900 text-left overflow-visible">
          
          {/* Column 1: Brand & Logo */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600">
                <Play className="w-3.5 h-3.5 text-white fill-white translate-x-[1px]" />
              </div>
              <span className="text-base font-black tracking-tight text-white font-display">
                AutoClip
              </span>
            </div>
            
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              Autonomous content syndication. Uncompressed fidelity. Always free. Monetized transparently through voluntary sponsorship grants.
            </p>
            
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-mono select-none">
              <span className="shrink-0 flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Bitrate Protocol Match Active</span>
            </div>
          </div>

          {/* Column 2: Architecture Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-[11px] font-bold uppercase tracking-wider">
              Architecture
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button 
                onClick={() => scrollToSection("features")}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
              >
                The Engine
              </button>
              <button 
                onClick={() => scrollToSection("matrix")}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
              >
                Advantage Matrix
              </button>
              <button 
                onClick={() => scrollToSection("infrastructure")}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
              >
                FFmpeg Core
              </button>
              <button 
                onClick={() => scrollToSection("why-free")}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
              >
                Open-Source
              </button>
            </div>
          </div>

          {/* Column 3: Trust & Legal Disclosures */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-[11px] font-bold uppercase tracking-wider">
              Safety & Compliance
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button 
                onClick={() => openDisclosure("privacy")}
                className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer font-medium"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => openDisclosure("terms")}
                className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer font-medium"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => openDisclosure("google")}
                className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer font-medium text-indigo-400 hover:text-indigo-300"
              >
                Google Data Disclosure
              </button>
            </div>
          </div>

          {/* Column 4: Community Contributions */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-[11px] font-bold uppercase tracking-wider">
              Development
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a 
                href="https://discord.gg" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Developer Discord</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-650" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
              >
                <Github className="w-3.5 h-3.5 text-slate-500" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-650" />
              </a>
              <button 
                onClick={() => scrollToSection("workflow")}
                className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer font-medium"
              >
                Support Infrastructure
              </button>
            </div>
          </div>

        </div>

        {/* ==========================================
            4. BOTTOM LEGAL BANNER 
           ========================================== */}
        <div className="pt-8 mt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left select-none">
          <p className="text-[10px] md:text-xs text-slate-605 text-slate-500 leading-relaxed font-medium">
            © 2026 AutoClip. Open-source distribution under the MIT License. YouTube, TikTok, and Instagram are registered trademarks of their respective owners.
          </p>

          <div className="flex gap-3 font-mono text-[10px] items-center shrink-0">
            <span className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10 font-bold">100% FREE FOREVER</span>
            <span className="text-slate-500">NO ADWARE COOKIES</span>
          </div>
        </div>

      </div>

      {/* COMPLIANCE DISCLOSURE INTERACTIVE MODAL */}
      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 relative shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-slate-900 pb-3">
                <Info className="w-5 h-5 text-indigo-400" />
                <h4 className="text-white text-sm sm:text-base font-black font-display text-left">
                  {modalContent.title}
                </h4>
              </div>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed text-left mb-6 whitespace-pre-line">
                {modalContent.body}
              </p>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalContent(null)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-md"
                >
                  Acknowledge and Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
