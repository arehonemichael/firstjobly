import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import InstallPrompt from "../components/InstallPrompt";

export const metadata = {
  title: "FirstJobly - Jobs in South Africa | Internships, Learnerships, Graduate Jobs & Entry-Level Positions 2025",
  description:
    "Find internships, learnerships, bursaries, graduate jobs, and entry-level positions in South Africa. Browse government jobs, permanent roles, and opportunities for youth. Your first job starts here.",
  metadataBase: new URL("https://firstjobly.co.za"),
  keywords: "jobs in South Africa, internships South Africa, learnerships, graduate jobs, entry level jobs, government jobs, bursaries, youth employment, first job, graduate opportunities, SA jobs, careers South Africa, internship programs, learnership opportunities, permanent jobs South Africa, jobs Johannesburg, jobs Cape Town, jobs Durban",
  authors: [{ name: "FirstJobly" }],
  creator: "FirstJobly",
  publisher: "FirstJobly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FirstJobly - Find Graduate Jobs, Internships & Learnerships in South Africa",
    description:
      "Discover internships, learnerships, bursaries, and entry-level jobs for South African youth and graduates.",
    url: "https://firstjobly.co.za",
    siteName: "FirstJobly",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstJobly - Graduate Jobs & Internships in South Africa",
    description:
      "Find internships, learnerships, and entry-level jobs for South African youth.",
    images: ["/og-image.png"],
  },
  icons: { 
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://firstjobly.co.za",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Advergic Script */}
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
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HKHVEJR9N2');
            `,
          }}
        />
      </head>

      <body className="bg-white text-gray-800 relative">
        {/* Sticky Anchor Ad (top) */}
        <div id="Firstjobly_Anchor_ATF" className="mb-6"></div>

        {/* Navbar */}
        <Navbar />

        {/* Top Leaderboard */}
        <div id="Firstjobly_Top_Leaderboard_ATF" className="mb-6"></div>

        {/* Main Layout */}
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 py-6">
          <main className="space-y-6">
            {/* In-Content Lazy Ad */}
            <div id="Firstjobly_Incontent_Lazy" className="my-6"></div>

            {/* In-Content Repeater */}
            <div className="lazy" parent-unit="Firstjobly_Incontent_Lazy"></div>

            {/* Page content */}
            {children}

            {/* Bottom Banner (slightly pushed up) */}
            <div id="Firstjobly_Bottom_BTF" className="mt-12"></div>
          </main>

          {/* Sidebar (LG screens) */}
          <aside className="hidden lg:block xl:hidden sticky top-24 h-fit space-y-6">
            {/* Sidebar Top Ad */}
            <div id="Firstjobly_Sidebar_Top_ATF"></div>
          </aside>
        </div>

        {/* Right Rail Ads (XL screens) */}
        <div className="hidden xl:block">
          <aside
            className="fixed right-4 top-36 w-[336px] space-y-6 z-20"
            aria-label="Right rail ads"
          >
            <div id="Firstjobly_RightRail_ATF"></div>
          </aside>
        </div>

        {/* Footer + Install Prompt */}
        <Footer />
        <InstallPrompt />

        {/* Floating WhatsApp Channel Button - Positioned left side, middle height */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
          <a
            href="https://whatsapp.com/channel/0029VbBbQOK4inoxcWKjHY2v"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white pl-4 pr-5 py-3 rounded-r-full shadow-lg hover:bg-green-600 transition-all duration-300 group"
            aria-label="Join our WhatsApp channel"
          >
            <svg
              className="w-6 h-6 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.088" />
            </svg>
            <span className="text-sm font-semibold">Join Channel</span>
          </a>
        </div>
      </body>
    </html>
  );
}