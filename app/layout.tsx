import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import ClientShell from "../components/ClientShell";

export const metadata = {
  title: "FirstJobly - Jobs in South Africa | Internships, Learnerships, Graduate Jobs & Entry-Level Positions 2025",
  description: "Find internships, learnerships, bursaries, graduate jobs, and entry-level positions in South Africa.",
  metadataBase: new URL("https://firstjobly.co.za"),
  keywords: "jobs in South Africa, internships South Africa, learnerships, graduate jobs, entry level jobs",
  authors: [{ name: "FirstJobly" }],
  creator: "FirstJobly",
  publisher: "FirstJobly",
  openGraph: {
    title: "FirstJobly - Find Graduate Jobs, Internships & Learnerships in South Africa",
    description: "Discover internships, learnerships, bursaries, and entry-level jobs for South African youth.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Advergic Ad Script */}
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
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HKHVEJR9N2');`,
          }}
        />
      </head>

      <body className="bg-white text-gray-800 relative">
        <ClientShell>
          <Navbar />

          <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 py-6">
            <main className="space-y-6">
              {children}
            </main>

            <aside className="sticky top-24 h-fit space-y-6">
              <div id="Firstjobly_Sidebar_Top_ATF" className="av-lazy"></div>
            </aside>
          </div>

          {/* Right Rail Ads */}
          <aside
            className="fixed right-4 top-36 w-[336px] space-y-6 z-20 hidden xl:block"
            aria-label="Right rail ads"
          >
            <div id="Firstjobly_RightRail_ATF" className="av-lazy"></div>
          </aside>

          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}