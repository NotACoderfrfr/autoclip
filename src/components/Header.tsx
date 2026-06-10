import { useState, useEffect } from "react";
import { Scissors, Play, Menu, X, Github, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavigateToDashboard: () => void;
}

export default function Header({ onNavigateToDashboard }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass-header shadow-lg shadow-violet-950/20"
          : "py-5 glass-header border-b border-slate-800/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left Side: Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 overflow-hidden shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              {/* Scissors overlapping Play Icon */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Play className="w-4 h-4 text-white fill-white translate-x-px translate-y-[-1px] group-hover:scale-105 transition-transform" />
              <div className="absolute right-1 bottom-1 bg-emerald-400 p-0.5 rounded-md shadow-sm">
                <Scissors className="w-2.5 h-2.5 text-slate-950" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                AutoClip
              </span>
              <span className="text-[9px] font-semibold text-emerald-400 tracking-widest font-mono uppercase bg-emerald-950/30 px-1 rounded-sm w-max border border-emerald-500/10">
                100% FREE
              </span>
            </div>
          </div>

          {/* Center: Scroll Anchors */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "The Core Engine", target: "features" },
              { label: "Dual-Format Pipeline", target: "dashboard-pipeline" },
              { label: "Zero-Cost Matrix", target: "why-free" },
              { label: "Launch Hub", target: "dashboard", highlight: true }
            ].map((item) => (
              <button
                key={item.target}
                onClick={item.target === "dashboard" || item.target === "dashboard-pipeline" ? onNavigateToDashboard : () => scrollToSection(item.target)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 cursor-pointer ${
                  item.highlight
                    ? "text-indigo-400 hover:text-indigo-300 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
                {!item.highlight && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-200 hover:w-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Side: Trust & Social Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900/60 hover:bg-slate-900 hover:text-white border border-slate-800 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>Get Source Code</span>
              <span className="bg-emerald-950 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded font-mono border border-emerald-500/20">Free</span>
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 rounded-xl flex items-center gap-2 shadow-sm hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-100" />
              <span>Join Developer Discord</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {[
                { label: "The Core Engine", target: "features" },
                { label: "Dual-Format Pipeline", target: "dashboard-pipeline" },
                { label: "Zero-Cost Matrix", target: "why-free" }
              ].map((item) => (
                <button
                  key={item.target}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.target === "dashboard-pipeline") {
                      onNavigateToDashboard();
                    } else {
                      scrollToSection(item.target);
                    }
                  }}
                  className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-all duration-150 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToDashboard();
                }}
                className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/20 transition-all duration-150 cursor-pointer"
              >
                Launch Hub ⚡
              </button>

              <div className="pt-4 border-t border-slate-900 flex flex-col gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Get Source Code</span>
                </a>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600/90 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Developer Discord</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
