"use client"; // Client component for ad reload functionality

import { useEffect } from "react";

export default function AdRefresh() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Avads && typeof window.Avads.loadAds === "function") {
      window.Avads.loadAds();
      console.log("Advergic ads loaded on job detail page");
    }
  }, []);

  return null;
}