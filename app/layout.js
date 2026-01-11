import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import InstallPrompt from "../components/InstallPrompt";
import AdLoader from "../components/AdLoader";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Advergic Script - Load EARLY */}
        <Script
          id="advergic-script"
          strategy="beforeInteractive"
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
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HKHVEJR9N2');`,
          }}
        />
      </head>

      <body className="bg-white text-gray-800 relative">
        {/* Global Ad Loader - handles all route changes */}
        <AdLoader />

        <div id="Firstjobly_Anchor_ATF" className="mb-6"></div>

        <Navbar />

        <div id="Firstjobly_Top_Leaderboard_ATF" className="mb-6"></div>

        {/* Main Layout */}
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 py-6">
          <main className="space-y-6">
            <div id="Firstjobly_Incontent_Lazy" className="my-6"></div>
            {children}
          </main>

          <aside className="sticky top-24 h-fit space-y-6">
            <div id="Firstjobly_Sidebar_Top_ATF"></div>
          </aside>
        </div>

        <div
          id="Firstjobly_Bottom_BTF"
          className="w-full flex justify-center my-12"
        ></div>

        <aside
          className="fixed right-4 top-36 w-[336px] space-y-6 z-20"
          aria-label="Right rail ads"
        >
          <div id="Firstjobly_RightRail_ATF"></div>
        </aside>

        {/* Footer */}
        <Footer />

        {/* RIGHT-SIDE INSTALL PROMPT */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
          <InstallPrompt variant="floating-right" />
        </div>

        {/* Left-side WhatsApp Channel */}
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