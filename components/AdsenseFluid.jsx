"use client";
import { useEffect } from "react";

export default function AdsenseFluid() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className="my-4 min-h-[100px]">
      <p className="text-xs text-gray-400 text-center mb-1">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100px" }}
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z"
        data-ad-client="ca-pub-1505001993402465"
        data-ad-slot="7525642544"
      />
    </div>
  );
}