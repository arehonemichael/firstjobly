// File: app/layout.jsx
'use client';
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import AdSlot from "../components/AdSlot";
import PlayStoreFooter from "../components/PlayStoreFooter";
import GtagPageView from "../components/GtagPageView";

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
  const rating = 4.8;
  const reviewCount = 120;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* =============================================================== */}
        {/* FUNDING CHOICES (Google CMP) - MUST LOAD BEFORE ANY ADS/GA     */}
        {/* =============================================================== */}
        <Script
          strategy="beforeInteractive"
          src="https://fundingchoicesmessages.google.com/i/pub-1505001993402465?ers=2"
        />

        {/* Funding Choices Initializer */}
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function initFC() {
                  if (typeof __fcInitMessaging === 'function') {
                    __fcInitMessaging();
                  }
                }
                window.__fcConfig = { publisherId: 'pub-1505001993402465' };
                initFC();
              })();
            `,
          }}
        />

        {/* =============================================================== */}
        {/* CONSENT MODE v2 - DEFAULT DENIED + AUTO UPDATE FROM CMP        */}
        {/* =============================================================== */}
        <Script
          id="consent-setup"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }

              // Default: everything denied until user consents
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });

              // Listen for CMP updates (TCF v2)
              window.addEventListener('load', function () {
                function updateConsentFromTCF() {
                  if (typeof window.__tcfapi !== 'function') return;

                  window.__tcfapi('addEventListener', 2, function (tcData, success) {
                    if (!success || !tcData) return;

                    if (
                      tcData.eventStatus === 'useractioncomplete' ||
                      tcData.eventStatus === 'tcloaded'
                    ) {
                      const hasAds = tcData.purpose?.consents?.[1] === true;
                      const hasAnalytics = tcData.purpose?.consents?.[4] === true;

                      gtag('consent', 'update', {
                        ad_storage: hasAds ? 'granted' : 'denied',
                        ad_user_data: hasAds ? 'granted' : 'denied',
                        ad_personalization: hasAds ? 'granted' : 'denied',
                        analytics_storage: hasAnalytics ? 'granted' : 'denied'
                      });

                      console.log('[Consent Updated]', {
                        ad_storage: hasAds,
                        analytics_storage: hasAnalytics
                      });
                    }
                  });
                }

                updateConsentFromTCF();
                setTimeout(updateConsentFromTCF, 2000);
                setTimeout(updateConsentFromTCF, 5000);
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

        {/*
          Wait-for-gtag: this wrapper ensures we only call gtag('config', ...) once
          the gtag function is available. This avoids race conditions where the
          config runs before the library loaded.
        */}
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function waitForGtag(){
                if (window.gtag && typeof window.gtag === 'function') {
                  try {
                    gtag('js', new Date());
                    gtag('config', 'G-HKHVEJR9N2', { page_path: location.pathname });
                  } catch (e) {
                    console.error('gtag config error', e);
                  }
                } else {
                  setTimeout(waitForGtag, 100);
                }
              })();
            `,
          }}
        />

        {/* Google AdSense */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1505001993402465"
          crossOrigin="anonymous"
        />

        {/* Navbar */}
        <Navbar />

        {/* IMPORTANT: This client component sends page_view on route changes */}
        <GtagPageView />

        {/* Main Layout */}
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 pt-4">
          <main>{children}</main>

          {/* Left Ad Column */}
          <aside className="hidden lg:block xl:hidden sticky top-4 h-fit space-y-4">
            <AdSlot
              slot="2290721371"
              responsive
              style={{ display: "block", minHeight: 600 }}
            />
          </aside>
        </div>

        {/* Right rail ads */}
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

        {/* Mobile bottom ad */}
        <div className="lg:hidden mx-auto max-w-3xl px-4 mt-6">
          <AdSlot
            slot="4489509306"
            layout="auto"
            responsive
            style={{ display: "block", minHeight: 250 }}
          />
        </div>

        {/* Desktop bottom ad */}
        <div className="hidden lg:block mx-auto max-w-5xl px-4 mt-8">
          <AdSlot
            slot="2290721371"
            layout="in-article"
            responsive
            style={{ display: "block", minHeight: 250 }}
          />
        </div>

        {/* Google Play Footer (Desktop) */}
        <div className="hidden sm:block mx-auto max-w-4xl px-4 mt-10">
          <PlayStoreFooter rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Play Footer Mobile */}
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

