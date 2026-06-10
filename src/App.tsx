import { supabase } from './supabaseClient'; // Adjusted path to pull from src root
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

  const handleLaunchDashboardWithUrl = async (url: string) => {
    setChannelUrl(url);

    if (!url) {
      alert("Please enter a valid YouTube channel URL or @handle.");
      return;
    }

    // --- MANUAL SUPABASE DATABASE INSERTION ---
    try {
      const { data, error } = await supabase
        .from('automated_channels')
        .insert([{ target_youtube_url: url }]);

      if (error) {
        console.error("Supabase Write Error:", error.message);
      } else {
        console.log("🚀 Stream tracking initialized successfully in Supabase!");
      }
    } catch (err) {
      console.error("Database connection failure:", err);
    }
    // ------------------------------------------

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