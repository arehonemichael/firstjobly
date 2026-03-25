'use client';

import RouteChangeHandler from "./RouteChangeHandler";
import AdLoader from "./AdLoader";
import VisibilityAdReloader from "./VisibilityAdReloader";
import InstallPrompt from "./InstallPrompt";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Client-only components */}
      <RouteChangeHandler />
      <AdLoader />
      <VisibilityAdReloader />

      {/* Top scroll anchor */}
      <div id="Firstjobly_Top_Scroll" className="av-lazy"></div>
      <div id="Firstjobly_Anchor_ATF" className="av-lazy mb-6"></div>

      {/* Page content passed from layout */}
      {children}

      {/* Floating Install Prompt */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <InstallPrompt variant="floating-right" />
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <a
          href="https://whatsapp.com/channel/0029VbBbQOK4inoxcWKjHY2v"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white pl-4 pr-5 py-3 rounded-r-full shadow-lg hover:bg-green-600 transition-all duration-300"
          aria-label="Join our WhatsApp channel"
        >
          <span className="text-sm font-semibold">Join Channel</span>
        </a>
      </div>
    </>
  );
}