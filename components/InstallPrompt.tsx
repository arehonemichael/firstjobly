"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const dismissed = localStorage.getItem("installPromptDismissed");

    if (!dismissed) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("installPromptDismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-3">
      <div className="bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-4 w-full max-w-md border border-gray-200 animate-slideDown">
        {/* App Icon */}
        <div className="flex-shrink-0">
          <Image
            src="/icon-192.png"
            alt="FirstJobly App"
            width={56}
            height={56}
            className="rounded-xl shadow-sm"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">
            Install FirstJobly
          </h3>
          <p className="text-sm text-gray-500 leading-tight">
            Get job updates instantly and manage your profile faster.
          </p>
          <Link
            href="https://play.google.com/store/apps/details?id=com.first.firstjobly"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-blue-600 text-white text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Install from Play Store
          </Link>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
