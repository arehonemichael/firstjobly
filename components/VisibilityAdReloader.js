"use client";

import { useEffect, useRef } from "react";

const COOLDOWN_MS = 30000; // minimum 30 seconds between reloads

export default function VisibilityAdReloader() {
  const lastReloadTime = useRef(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Only act when user returns to the tab
      if (document.hidden) return;

      const now = Date.now();
      const timeSinceLastReload = now - lastReloadTime.current;

      // Skip if we reloaded too recently — prevents fraud signals
      if (timeSinceLastReload < COOLDOWN_MS) return;

      // Small delay to let any rendering finish before loading ads
      setTimeout(() => {
        if (window.Avads && typeof window.Avads.loadAds === "function") {
          try {
            window.Avads.loadAds();
            lastReloadTime.current = Date.now();
          } catch (error) {
            // Silent fail
          }
        }
      }, 500);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}