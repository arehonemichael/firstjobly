"use client";

import { useEffect, useRef } from "react";

const AD_CLIENT = "ca-pub-1505001993402465";

const AD_UNITS = {
  display: { slot: "2384027274", format: "auto", fullWidthResponsive: true },
  display2: { slot: "1941174145", format: "auto", fullWidthResponsive: true },
  native: { slot: "9819664161", format: "fluid", layoutKey: "-gf+f-3-5e+9w" },
  inArticle: { slot: "5086212235", layout: "in-article", format: "fluid" },
  multiplex: { slot: "2460048898", format: "autorelaxed" },
};

/**
 * AdSlot - renders a Google AdSense unit.
 * type: "display" | "display2" | "native" | "inArticle" | "multiplex" | "none"
 */
export default function AdSlot({
  type = "display",
  className = "",
  minHeight = 250,
}) {
  const insRef = useRef(null);
  const pushed = useRef(false);
  const isNone = type === "none";

  useEffect(() => {
    if (isNone || pushed.current || !insRef.current) return;
    if (insRef.current.getAttribute("data-adsbygoogle-status")) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch (error) {
      console.error("AdSense request failed:", error);
    }
  }, [isNone, type]);

  if (isNone) return null;

  const unit = AD_UNITS[type] || AD_UNITS.display;
  const isInArticle = unit.layout === "in-article";

  return (
    <div className={className} style={{ minHeight }}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={
          isInArticle
            ? { display: "block", textAlign: "center" }
            : { display: "block" }
        }
        data-ad-client={AD_CLIENT}
        data-ad-slot={unit.slot}
        {...(unit.format ? { "data-ad-format": unit.format } : {})}
        {...(unit.fullWidthResponsive
          ? { "data-full-width-responsive": "true" }
          : {})}
        {...(unit.layoutKey ? { "data-ad-layout-key": unit.layoutKey } : {})}
        {...(unit.layout ? { "data-ad-layout": unit.layout } : {})}
      />
    </div>
  );
}

