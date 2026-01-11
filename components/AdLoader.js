"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdLoader() {
  const pathname = usePathname();

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 15;
    let retryTimer;

    const loadAdvergicAds = () => {
      // Check if Advergic script is loaded
      if (typeof window !== "undefined") {
        // Method 1: Try window.Avads.loadAds()
        if (window.Avads && typeof window.Avads.loadAds === "function") {
          try {
            window.Avads.loadAds();
            console.log("✅ Ads loaded successfully via Avads.loadAds() on:", pathname);
            return true;
          } catch (error) {
            console.error("❌ Error loading ads:", error);
          }
        }

        // Method 2: Check if ad containers exist and script is loaded
        const adContainers = document.querySelectorAll('[id*="Firstjobly"]');
        if (adContainers.length > 0 && window.Avads) {
          console.log(`📦 Found ${adContainers.length} ad containers`);
          
          // Force reload by triggering the script again
          if (window.Avads.loadAds) {
            try {
              window.Avads.loadAds();
              console.log("✅ Ads reloaded successfully");
              return true;
            } catch (error) {
              console.error("❌ Error reloading ads:", error);
            }
          }
        }

        // Method 3: If Avads not ready, check again
        if (!window.Avads) {
          console.log("⏳ Waiting for Advergic script to load... attempt", retryCount + 1);
          return false;
        }
      }
      return false;
    };

    // Initial load attempt
    if (!loadAdvergicAds()) {
      // Retry logic with increasing delays
      retryTimer = setInterval(() => {
        retryCount++;
        
        if (loadAdvergicAds()) {
          clearInterval(retryTimer);
        } else if (retryCount >= maxRetries) {
          clearInterval(retryTimer);
          console.warn("⚠️ Could not load Advergic ads after", maxRetries, "attempts");
          console.warn("Please check if the Advergic script is loaded correctly");
        }
      }, 300); // Check every 300ms
    }

    // Cleanup
    return () => {
      if (retryTimer) {
        clearInterval(retryTimer);
      }
    };
  }, [pathname]); // Re-run on route change

  return null;
}