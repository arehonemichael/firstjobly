"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdLoader() {
  const pathname = usePathname();

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 20;
    let retryTimer;

    const forceReloadAds = () => {
      if (typeof window === "undefined") return false;

      // Method 1: Standard loadAds call
      if (window.Avads && typeof window.Avads.loadAds === "function") {
        try {
          // Clear any existing ads first
          if (window.Avads.clearAds && typeof window.Avads.clearAds === "function") {
            window.Avads.clearAds();
          }
          
          // Force reload
          window.Avads.loadAds();
          console.log("✅ Ads loaded successfully on:", pathname);
          return true;
        } catch (error) {
          console.error("❌ Error loading ads:", error);
        }
      }

      // Method 2: Force reload by finding all ad containers and triggering them
      const adContainers = document.querySelectorAll('[id*="Firstjobly"]');
      if (adContainers.length > 0) {
        console.log(`📦 Found ${adContainers.length} ad containers on ${pathname}`);
        
        // Try to trigger Avads again
        if (window.Avads && window.Avads.loadAds) {
          try {
            window.Avads.loadAds();
            console.log("✅ Ads triggered via container detection");
            return true;
          } catch (e) {
            console.error("Error triggering ads:", e);
          }
        }
      }

      // Method 3: Manual script reload as last resort
      if (!window.Avads && retryCount > 5) {
        console.warn("⚠️ Avads not loaded, attempting script reload...");
        const existingScript = document.querySelector('script[src*="av-firstjobly.js"]');
        if (existingScript) {
          // Remove and re-add script
          existingScript.remove();
          const newScript = document.createElement('script');
          newScript.src = 'https://avads.live/s/av-firstjobly.js';
          newScript.async = true;
          document.head.appendChild(newScript);
          console.log("🔄 Reloaded Advergic script");
        }
      }

      return false;
    };

    // Clear any existing ads first (if the function exists)
    if (window.Avads && window.Avads.clearAds) {
      try {
        window.Avads.clearAds();
      } catch (e) {
        // Ignore errors
      }
    }

    // Small delay to ensure DOM is fully ready after navigation
    const initialLoadTimer = setTimeout(() => {
      if (!forceReloadAds()) {
        // Start retry loop
        retryTimer = setInterval(() => {
          retryCount++;
          
          if (forceReloadAds()) {
            clearInterval(retryTimer);
          } else if (retryCount >= maxRetries) {
            clearInterval(retryTimer);
            console.warn("⚠️ Could not load ads after", maxRetries, "attempts on:", pathname);
          }
        }, 300);
      }
    }, 250); // Wait 250ms after route change

    // Cleanup
    return () => {
      clearTimeout(initialLoadTimer);
      if (retryTimer) {
        clearInterval(retryTimer);
      }
    };
  }, [pathname]); // Re-run EVERY time the route changes

  return null;
}