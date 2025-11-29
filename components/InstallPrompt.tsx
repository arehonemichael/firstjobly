"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = window.navigator.userAgent.toLowerCase();
    const isAndroid = ua.includes("android");
    const isMobileWidth = window.innerWidth < 1024; // mobile / small tablet

    // Only target Android + mobile
    if (!isAndroid || !isMobileWidth) return;

    // Limit to 2 views per user
    const count = parseInt(
      window.localStorage.getItem("fj_install_prompt_count") || "0",
      10
    );
    if (count >= 2) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrolledRatio = docHeight > 0 ? scrollTop / docHeight : 0;

      // Show when user has scrolled at least 40% of the page
      if (scrolledRatio >= 0.4) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // In case user is already far down (from navigation / back button)
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);

    if (typeof window !== "undefined") {
      const count = parseInt(
        window.localStorage.getItem("fj_install_prompt_count") || "0",
        10
      );
      window.localStorage.setItem(
        "fj_install_prompt_count",
        String(count + 1)
      );
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 lg:hidden">
      <div className="bg-white shadow-xl rounded-2xl p-3 flex items-center gap-3 w-[260px] border border-gray-200 animate-slideUp">
        <Image
          src="/icon-192.png"
          alt="FirstJobly App"
          width={40}
          height={40}
          className="rounded-xl"
        />

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800">
            Install FirstJobly
          </h3>
          <Link
            href="https://play.google.com/store/apps/details?id=com.first.firstjobly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 font-medium underline"
          >
            Install from Play Store
          </Link>
        </div>

        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close install prompt"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
