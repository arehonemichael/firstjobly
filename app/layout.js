import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import AdSlot from "../components/AdSlot";
import InstallPrompt from "../components/InstallPrompt";
import Image from "next/image";
import Link from "next/link";

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

        {/* ✅ Navbar */}
        <Navbar />

        {/* ✅ Main Layout */}
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

        {/* ✅ Right rail ads (XL screens) */}
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

        {/* ✅ Mobile Ad */}
        <div className="lg:hidden mx-auto max-w-3xl px-4 mt-6">
          <AdSlot
            slot="4489509306"
            layout="auto"
            responsive
            style={{ display: "block", minHeight: 250 }}
          />
        </div>

        {/* ✅ WhatsApp Ad Banner with Gentle Movement */}
<div className="w-full flex justify-center mt-10 px-4">
  <Link
    href="https://wa.me/27827940534?text=Hi%2C%20I%20saw%20your%20ad%20on%20Firstly%20Jobly.%20I%20have%20a%20dream%20of%20starting%20or%20upgrading%20a%20business%2C%20what%20solutions%20do%20you%20have%20to%20offer%3F"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full max-w-[420px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[720px] xl:max-w-[800px] hover:scale-[1.03] transition-transform duration-300"
  >
    <div className="rounded-2xl overflow-hidden shadow-lg bg-[#0B132B] animate-float">
      <Image
        src="/whatsapp-banner.png"
        alt="Chat with us on WhatsApp"
        width={1146}
        height={895}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  </Link>
</div>


        {/* ✅ Footer + Install Prompt */}
        <Footer />
        <InstallPrompt />
      </body>
    </html>
  );
}
