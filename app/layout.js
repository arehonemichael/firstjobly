// app/layout.js
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import AdSlot from "../components/AdSlot"; // <-- import

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
    description: "Explore internships, entry-level, remote, and government jobs.",
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
        {/* GA */}
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

        {/* AdSense (load once) */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1505001993402465"
          crossOrigin="anonymous"
        />

        <Navbar />

        {/* content + desktop sidebar */}
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <main>{children}</main>
          <aside className="hidden lg:block sticky top-4 h-fit space-y-4">
            {/* Desktop sidebar ad */}
            <AdSlot slot="2290721371" responsive style={{ display: "block", minHeight: 600 }} />
          </aside>
        </div>

        {/* Mobile footer ad (shows on sm/md; hidden on lg since sidebar exists) */}
        <div className="lg:hidden mx-auto max-w-3xl px-4 mt-6">
          <AdSlot
            slot="4489509306"   // 
            layout="auto"
            responsive
            style={{ display: "block", minHeight: 250 }}
          />
        </div>

        <Footer />
      </body>
    </html>
  );
}
