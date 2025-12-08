"use client";

import { useEffect, useRef, useState } from "react";

export default function AdSlot({
  slot = "2290721371",
  layout = "auto",
  responsive = true,
  style = { display: "block", minHeight: 300 },
}) {
  const ref = useRef(null);
  const [inserted, setInserted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeoutMs = 3500; // wait for TC string

    function insertAd() {
      if (cancelled || inserted || !ref.current) return;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setInserted(true);
        console.log("[AdSlot] Ad requested for slot", slot);
      } catch (e) {
        console.warn("[AdSlot] adsbygoogle.push failed", e);
      }
    }

    function handleTC(tcData) {
      if (cancelled) return;

      if (tcData && tcData.tcString) {
        console.log("[AdSlot] TC string detected:", tcData.tcString.slice(0, 10) + "...");
        insertAd();
      } else {
        console.log("[AdSlot] No TC string — defaulting to non-personalized ads");
        insertAd();
      }
    }

    function checkTCF() {
      // 1) Try IAB TCF API (__tcfapi)
      if (typeof window.__tcfapi === "function") {
        try {
          window.__tcfapi("getTCData", 2, (tcData, success) => {
            if (success) handleTC(tcData);
            else handleTC(null);
          });
          return;
        } catch (e) {
          console.warn("[AdSlot] __tcfapi failed", e);
        }
      }

      // 2) Try Funding Choices API
      if (window.FundingChoices) {
        try {
          window
            .FundingChoices("getTCData")
            .then((tcData) => handleTC(tcData))
            .catch(() => handleTC(null));
          return;
        } catch (e) {
          console.warn("[AdSlot] FundingChoices API error", e);
        }
      }

      // 3) No CMP API yet → fallback
      console.log("[AdSlot] No CMP ready → fallback to non-personalized");
      insertAd();
    }

    // Trigger on load
    if (document.readyState === "complete") {
      checkTCF();
    } else {
      window.addEventListener("load", checkTCF, { once: true });
    }

    // Hard timeout (ensures ad still loads if CMP is slow)
    const t = setTimeout(() => {
      if (!inserted) {
        console.log("[AdSlot] Timeout — inserting ad");
        insertAd();
      }
    }, timeoutMs);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [slot, layout, responsive, style, inserted]);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-1505001993402465"
      data-ad-slot={slot}
      data-ad-format={layout}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
