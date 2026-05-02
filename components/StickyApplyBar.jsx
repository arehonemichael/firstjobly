"use client";

import { useState, useEffect } from "react";
import ApplyButton from "./ApplyButton";

export default function StickyApplyBar({ title, company, link }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!link) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex items-center justify-between gap-4 transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 truncate">{company || "Confidential"}</p>
      </div>
      <ApplyButton
        link={link}
        className="flex-shrink-0 bg-pink-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-pink-700 active:scale-95 transition"
      >
        Apply Now
      </ApplyButton>
    </div>
  );
}