import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import InstallPrompt from "../components/InstallPrompt";
import AdLoader from "../components/AdLoader";
import VisibilityAdReloader from "../components/VisibilityAdReloader";

export const metadata = {
  title:
    "FirstJobly - Jobs in South Africa | Internships, Learnerships, Graduate Jobs & Entry-Level Positions 2025",
  description:
    "Find internships, learnerships, bursaries, graduate jobs, and entry-level positions in South Africa.",
  metadataBase: new URL("https://firstjobly.co.za"),
  keywords:
    "jobs in South Africa, internships South Africa, learnerships, graduate jobs, entry level jobs",
  authors: [{ name: "FirstJobly" }],
  creator: "FirstJobly",
  publisher: "FirstJobly",
  openGraph: {
    title:
      "FirstJobly - Find Graduate Jobs, Internships & Learnerships in South Africa",
    description:
      "Discover internships, learnerships, bursaries, and entry-level jobs for South African youth.",
    url: "https://firstjobly.co.za",
    siteName: "FirstJobly",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstJobly - Graduate Jobs & Internships in South Africa",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://firstjobly.co.za",
  },
  // Required for Google Discover large image cards on every page
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Required for Google Discover large image previews */}
        <meta name="robots" content="max-image-preview:large" />

        {/* Advergic Script - afterInteractive prevents blocking page render */}
        <Script
          id="advergic-script"
          strategy="afterInteractive"
          src="https://avads.live/s/av-firstjobly.js"
        />

        {/* Google Analytics */}
        <Script
          id="ga-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HKHVEJR9N2"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          suppressHydrationWarning dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HKHVEJR9N2');`,
          }}
        />
      </head>

      <body className="bg-white text-gray-800 relative">

        {/* ORGANISATION SCHEMA — trust signal for Google + AI search engines.
            Lives in layout so it applies to every page automatically.
            Tells Google who FirstJobly is as an entity — critical for
            E-E-A-T scoring and appearing in AI search answers. */}
        <script
          type="application/ld+json"
          suppressHydrationWarning dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FirstJobly",
              "url": "https://firstjobly.co.za",
              "logo": "https://firstjobly.co.za/logo.png",
              "description": "South Africa's leading youth employment portal. Find internships, learnerships, bursaries, and entry-level jobs for graduates.",
              "foundingLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "ZA",
                },
              },
              "areaServed": {
                "@type": "Country",
                "name": "South Africa",
              },
              "sameAs": [
                "https://whatsapp.com/channel/0029VbBbQOK4inoxcWKjHY2v",
              ],
            }),
          }}
        />

        {/* TOP SCROLL AD */}
        <div id="Firstjobly_Top_Scroll" className="av-lazy"></div>

        {/* Ad loader on route changes */}
        <AdLoader />

        {/* Reload ads when user returns to tab */}
        <VisibilityAdReloader />

        {/* ANCHOR AD */}
        <div id="Firstjobly_Anchor_ATF" className="av-lazy mb-6"></div>

        <Navbar />

        {/* Main Layout */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 py-6">
          <main className="space-y-6">
            {children}
          </main>

          {/* SIDEBAR AD */}
          <aside className="sticky top-24 h-fit space-y-6">
            <div id="Firstjobly_Sidebar_Top_ATF" className="av-lazy"></div>
          </aside>
        </div>

        {/* Right rail removed — was overlapping sidebar on lg screens
            and causing ad auction dilution across 4 simultaneous slots */}

        <Footer />

        {/* Install Prompt */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
          <InstallPrompt variant="floating-right" />
        </div>

        {/* WhatsApp Channel */}
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
      </body>
    </html>
  );
}
