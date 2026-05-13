"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 800;
const INITIAL_DELAY_MS = 600;

export default function AdLoader() {
  const pathname = usePathname();
  const hasLoaded = useRef(false);

  useEffect(() => {
    hasLoaded.current = false;
    let retryCount = 0;
    let retryTimer;

    const tryLoadAds = () => {
      if (hasLoaded.current) return true;

      if (window.Avads && typeof window.Avads.loadAds === "function") {
        try {
          window.Avads.loadAds();
          hasLoaded.current = true;
          return true;
        } catch (error) {
          // Hard error from SDK — stop retrying
          return false;
        }
      }

      return false;
    };

    // Give DOM time to settle after route change before first attempt
    const initialTimer = setTimeout(() => {
      if (!tryLoadAds()) {
        retryTimer = setInterval(() => {
          retryCount++;
          if (tryLoadAds() || retryCount >= MAX_RETRIES) {
            clearInterval(retryTimer);
          }
        }, RETRY_DELAY_MS);
      }
    }, INITIAL_DELAY_MS);

    // Cleanup timers on route change or unmount
    // Do NOT call clearAds() — let any live impressions finish earning
    return () => {
      clearTimeout(initialTimer);
      clearInterval(retryTimer);
    };
  }, [pathname]);

  return null;
}