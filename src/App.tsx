import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Workflow from "./components/Workflow";
import AdvantageMatrix from "./components/AdvantageMatrix";
import Infrastructure from "./components/Infrastructure";
import Features from "./components/Features";
import WhyFree from "./components/WhyFree";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

export default function App() {
  const [channelUrl, setChannelUrl] = useState("");

  const handleLaunchDashboardWithUrl = (url: string) => {
    setChannelUrl(url);
    const dashboardElement = document.getElementById("dashboard");
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToDashboard = () => {
    const dashboardElement = document.getElementById("dashboard");
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans antialiased text-slate-100 overflow-visible selection:bg-indigo-500 selection:text-white">
      {/* Structural Glass Header Menu */}
      <Header onNavigateToDashboard={handleScrollToDashboard} />

      {/* Cyber Hero Header with Channel Connection input */}
      <Hero 
         channelUrl={channelUrl} 
         setChannelUrl={setChannelUrl} 
         onAutomate={handleLaunchDashboardWithUrl} 
      />

      {/* Autonomous Syndication Workflow Pipeline */}
      <Workflow />

      {/* The Free-Tier Advantage Matrix */}
      <AdvantageMatrix />

      {/* Transparency & Open-Source Infrastructure */}
      <Infrastructure />

      {/* Bento Grid Feature Display */}
      <Features />

      {/* Open Source Comparison Section (Why Free?) */}
      <WhyFree />

      {/* Fully Interactive Workspace Client Dashboard */}
      <Dashboard 
        channelUrl={channelUrl} 
        setChannelUrl={setChannelUrl} 
      />

      {/* Minimalist Trust Footer with Links */}
      <Footer 
        channelUrl={channelUrl} 
        setChannelUrl={setChannelUrl} 
        onAutomate={handleLaunchDashboardWithUrl} 
      />
    </div>
  );
}
