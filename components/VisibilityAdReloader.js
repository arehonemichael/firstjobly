"use client";

import { useEffect } from "react";

export default function VisibilityAdReloader() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      // When user returns to the tab
      if (!document.hidden && typeof window !== "undefined") {
        console.log("👀 Tab became visible, reloading ads...");
        
        // Wait a moment for any rendering to finish
        setTimeout(() => {
          if (window.Avads && typeof window.Avads.loadAds === "function") {
            try {
              window.Avads.loadAds();
              console.log("✅ Ads reloaded on visibility change");
            } catch (error) {
              console.error("❌ Error reloading ads on visibility:", error);
            }
          }
        }, 500);
      }
    };

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}