import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import AdSlot from "../components/AdSlot";
import PlayStoreFooter from "../components/PlayStoreFooter";

export const metadata = {
  title: "FirstJobly - Find Your First Job Fast",
  description:
    "Explore internships, entry-level, remote, and government jobs for youth and graduates on FirstJobly.",
  metadataBase: new URL("https://firstjobly.co.za"),
  openGraph: {
    title: "FirstJobly - Find Your First Job Fast",
    description:
      "Explore internships, entry-level, remote, and government jobs for youth and graduates.",
    url: "https://firstjobly.co.za",
    siteName: "FirstJobly",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstJobly - Find Your First Job Fast",
    description:
      "Explore internships, entry-level, remote, and government jobs.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  // 🔢 👉 PUT YOUR REAL RATING & REVIEW COUNT HERE
  const rating = 4.8; // e.g. your real rating from Play Store
  const reviewCount = 120; // e.g. your real review count

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ------------------------------------------------------------------ */}
        {/* FUNDING CHOICES (Google CMP) - must load BEFORE AdSense/ads code */}
        {/* ------------------------------------------------------------------ */}
        <Script
          id="funding-choices"
          strategy="beforeInteractive"
          async
          src="https://fundingchoicesmessages.google.com/i/ca-pub-1505001993402465?ers=1"
        />

        {/* Small diagnostic handler for Funding Choices / TCF (optional) */}
        <Script
          id="fc-diagnostics"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function logFCState(label) {
                  try {
                    if (window.FundingChoices && typeof window.FundingChoices === 'function') {
                      window.FundingChoices('getTCData').then(function(tcData) {
                        console.log('[FC] getTCData', label, tcData);
                      }).catch(function(err){
                        console.log('[FC] getTCData err', label, err);
                      });
                    } else if (typeof window.__tcfapi === 'function') {
                      window.__tcfapi('getTCData', 2, function(tcData, success) {
                        console.log('[__tcfapi] getTCData', label, 'success=', success, tcData);
                      });
                    } else {
                      console.log('[FC] CMP not yet available (' + label + ')');
                    }
                  } catch(e) {
                    console.warn('[FC] diagnostic exception', e);
                  }
                }

                // log immediately and once on load
                logFCState('immediate');
                window.addEventListener('load', function(){ logFCState('load'); }, { once: true });
                setTimeout(function(){ logFCState('timeout-3s'); }, 3000);
              })();
            `,
          }}
        />
        {/* ------------------------------------------------------------------ */}

        {/* Consent Mode defaults: ensure denied until Funding Choices updates consent */}
        <Script
          id="consent-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Default to denied until CMP updates consent
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `,
          }}
        />
      </head>

      <body className="bg-white text-gray-800">
        {/* Google Analytics */}
        <Script
          id="ga-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HKHVEJR9N2"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Use existing gtag from consent-defaults
              gtag('js', new Date());
              gtag('config', 'G-HKHVEJR9N2');
            `,
          }}
        />

        {/* Google AdSense (kept after CMP + consent defaults) */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1505001993402465"
          crossOrigin="anonymous"
        />

        {/* Navbar */}
        <Navbar />

        {/* Main Layout */}
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 pt-4">
          <main>{children}</main>

          {/* Left Ad Column (for lg screens) */}
          <aside className="hidden lg:block xl:hidden sticky top-4 h-fit space-y-4">
            <AdSlot
              slot="2290721371"
              responsive
              style={{ display: "block", minHeight: 600 }}
            />
          </aside>
        </div>

        {/* Right rail ads (XL screens) */}
        <div className="hidden xl:block">
          <aside
            className="fixed right-4 top-24 w-[336px] space-y-4 z-20"
            aria-label="Right rail ads"
          >
            <AdSlot
              slot="2290721371"
              responsive
              style={{ display: "block", minHeight: 600 }}
            />
            <AdSlot
              slot="8280865915"
              format="autorelaxed"
              responsive
              style={{ display: "block", minHeight: 280 }}
            />
          </aside>
        </div>

        {/* Mobile Bottom Ad */}
        <div className="lg:hidden mx-auto max-w-3xl px-4 mt-6">
          <AdSlot
            slot="4489509306"
            layout="auto"
            responsive
            style={{ display: "block", minHeight: 250 }}
          />
        </div>

        {/* Desktop Bottom Ad */}
        <div className="hidden lg:block mx-auto max-w-5xl px-4 mt-8">
          <AdSlot
            slot="2290721371"
            layout="in-article"
            responsive
            style={{ display: "block", minHeight: 250 }}
          />
        </div>

        {/* Desktop / tablet Google Play strip */}
        <div className="hidden sm:block mx-auto max-w-4xl px-4 mt-10">
          <PlayStoreFooter rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Sticky mobile Google Play bar with slide-up animation */}
        <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden animate-slideUp">
          <PlayStoreFooter
            rating={rating}
            reviewCount={reviewCount}
            compact={true}
          />
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
