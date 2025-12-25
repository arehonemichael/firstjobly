import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import AdSlot from "../components/AdSlot";
import InstallPrompt from "../components/InstallPrompt";

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
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-gray-800 relative">
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

        {/* Footer + Install Prompt */}
        <Footer />
        <InstallPrompt />

        {/* Floating WhatsApp Channel Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://whatsapp.com/channel/0029VbBbQOK4inoxcWKjHY2v"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 text-white px-5 py-4 rounded-full shadow-2xl hover:bg-green-600 hover:shadow-green-600 transition-all duration-300 group"
          >
            <svg
              className="w-7 h-7 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.088" />
            </svg>
            <span className="font-semibold text-base hidden sm:inline">
              Join WhatsApp Channel
            </span>
            <span className="font-semibold text-base sm:hidden">
              Join Channel
            </span>
          </a>

          {/* Hover tooltip (desktop only) */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg">
              Get daily job alerts!
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}