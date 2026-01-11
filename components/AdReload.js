"use client"; // Client component for route-based ad reload

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdReload() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.Avads && typeof window.Avads.loadAds === "function") {
      window.Avads.loadAds();
      console.log("Advergic ads reloaded for route:", pathname);
    }
  }, [pathname]);

  return null;
}