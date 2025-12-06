"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PlayStoreFooter({ rating, reviewCount, compact }) {
  const [variant, setVariant] = useState("A");

  // Values coming from layout (you set them there)
  const safeRating =
    typeof rating === "number" && rating > 0 ? rating : 4.8;
  const safeReviews =
    typeof reviewCount === "number" && reviewCount > 0
      ? reviewCount
      : 120;

  // A/B test + GA impression event
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const key = "fj_playstore_ab_variant";
      let stored = window.localStorage.getItem(key);

      if (stored !== "A" && stored !== "B") {
        stored = Math.random() < 0.5 ? "A" : "B";
        window.localStorage.setItem(key, stored);
      }

      setVariant(stored);

      const w = window;
      if (w.gtag) {
        w.gtag("event", "playstore_bar_impression", {
          event_category: "engagement",
          event_label: stored,
        });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleClick = () => {
    if (typeof window === "undefined") return;
    try {
      const w = window;
      if (w.gtag) {
        w.gtag("event", "playstore_install_click", {
          event_category: "engagement",
          event_label: variant,
          value: safeRating,
        });
      }
    } catch (e) {
      // ignore
    }
  };

  const ctaText =
    variant === "A" ? "Install on Google Play" : "Get the Android app";

  // Star display (real-looking 5-star row)
  const totalStars = 5;
  const fullStars = Math.round(safeRating); // e.g. 4.8 -> 5 stars

  const StarsRow = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }).map((_, index) => (
        <span
          key={index}
          className={
            index < fullStars
              ? "text-yellow-400 text-sm"
              : "text-gray-500 text-sm"
          }
        >
          ★
        </span>
      ))}
    </div>
  );

  // ✅ Compact sticky bar (mobile) – must stand out from ads
  if (compact) {
    return (
      <div className="bg-[#111]/95 backdrop-blur border-t border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Image
              src="/icon-192.png"
              alt="FirstJobly app icon"
              width={40}
              height={40}
              className="rounded-2xl shadow-lg border border-white/10"
            />

            <div className="leading-tight">
              <p className="text-xs font-semibold text-white flex items-center gap-1">
                FirstJobly
                <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-[2px] text-[10px] font-medium text-green-300 border border-green-500/40">
                  ★ {safeRating.toFixed(1)} on Google Play
                </span>
              </p>

              <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-300">
                <StarsRow />
                <span className="text-gray-400">
                  {safeReviews.toLocaleString()} reviews
                </span>
              </div>
            </div>
          </div>

          <Link
            href="https://play.google.com/store/apps/details?id=com.first.firstjobly"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="shrink-0 inline-flex items-center rounded-full bg-gradient-to-r from-[#00c853] to-[#00e676] px-3 py-1.5 text-[11px] font-semibold text-[#04210e] shadow-lg hover:brightness-110 active:scale-95 transition-transform"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Full desktop footer strip – looks “official”, not like an ad slot
  return (
    <footer className="bg-[#111] text-white py-6 border-t border-white/10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
        {/* Left: icon + rating block */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src="/icon-192.png"
            alt="FirstJobly app icon"
            width={60}
            height={60}
            className="rounded-2xl shadow-xl border border-white/15"
          />

          <div className="space-y-1">
            <p className="text-sm font-semibold flex items-center gap-2">
              FirstJobly
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-[2px] text-[10px] font-medium text-green-300 border border-green-500/40">
                Official app
              </span>
            </p>

            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-end gap-1">
                  <span className="text-lg font-semibold">
                    {safeRating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400">/ 5.0</span>
                </div>
                <StarsRow />
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <div className="text-xs text-gray-300">
                <p>{safeReviews.toLocaleString()} reviews</p>
                <p className="text-[11px] text-gray-400">
                  Trusted by job seekers on Android
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: big install button + small “Google Play” text */}
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <Link
            href="https://play.google.com/store/apps/details?id=com.first.firstjobly"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00c853] to-[#00e676] px-4 py-2 text-sm font-semibold text-[#04210e] shadow-xl hover:brightness-110 active:scale-95 transition-transform"
          >
            <span className="text-lg">⬇️</span>
            <span>Install on Google Play</span>
          </Link>

          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={110}
              height={33}
              className="opacity-80"
            />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} FirstJobly • Available on Google Play
      </p>
    </footer>
  );
}
