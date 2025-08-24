"use client";
import { useEffect } from "react";

export default function AdSlot({
  slot = "2290721371",            // your slot ID
  layout = "auto",
  responsive = true,
  style = { display: "block", minHeight: 300 }, // tweak height for sidebar
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-1505001993402465"
      data-ad-slot={slot}
      data-ad-format={layout}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
