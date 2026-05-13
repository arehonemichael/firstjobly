import Link from "next/link";
import Image from "next/image";
import {
  FaBriefcase,
  FaUniversity,
  FaBuilding,
  FaSuitcaseRolling,
  FaBookOpen,
} from "react-icons/fa";

export const metadata = {
  metadataBase: new URL("https://firstjobly.co.za"),
  title: "FirstJobly: Internships & Graduate Jobs in South Africa",
  description:
    "Apply for 2026 internships, learnerships, and graduate jobs in South Africa. Government & private sector opportunities for youth and first-time job seekers.",
  openGraph: {
    title: "FirstJobly - Find Your First Job in South Africa",
    description: "Daily updates on internships, learnerships, and entry-level careers.",
    url: "https://firstjobly.co.za",
    siteName: "FirstJobly",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FirstJobly South Africa" }],
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstJobly - Graduate Jobs in SA",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://firstjobly.co.za", // Fixed: absolute URL
  },
};

export default function Home() {
  const categories = [
    {
      title: "Internships",
      desc: "Paid and unpaid programs for SA graduates.",
      href: "/jobs?category=Internships",
      icon: <FaBriefcase className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Entry-Level Jobs",
      desc: "Roles for youth with 0-2 years experience.",
      href: "/jobs?category=Entry-Level",
      icon: <FaSuitcaseRolling className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Bursaries",
      desc: "2026 funding for university and college students.",
      href: "/jobs?category=Bursary",
      icon: <FaUniversity className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Government Jobs",
      desc: "Latest Z83 positions and public sector roles.",
      href: "/jobs?category=Government",
      icon: <FaBuilding className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Permanent Jobs",
      desc: "Full-time career foundations across all provinces.",
      href: "/jobs?category=Permanent",
      icon: <FaBriefcase className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Learnerships",
      desc: "SETA-approved learnerships to earn while you learn.",
      href: "/jobs?category=Learnership",
      icon: <FaBookOpen className="text-pink-600 w-10 h-10 mb-3" />,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "FirstJobly",
        "url": "https://firstjobly.co.za",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://firstjobly.co.za/jobs?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        "name": "Popular Job Categories in South Africa",
        "itemListElement": categories.map((cat, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": cat.title,
          "url": `https://firstjobly.co.za${cat.href}`
        }))
      }
    ]
  };

  // Fixed: removed wrapping <main> — layout.js already provides one
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-pink-50 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Your South African Career <span className="text-pink-600">Starts Here.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                Connect with the latest <strong>2026 internships</strong>, SETA-approved <strong>learnerships</strong>, and government opportunities across Gauteng, Western Cape, and all SA provinces.
              </p>
              <Link
                href="/jobs"
                className="inline-block bg-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg hover:shadow-pink-200 active:scale-95"
              >
                Browse Jobs in South Africa
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <Image
                src="/images/hero-image.png"
                alt="South African graduates finding career opportunities"
                width={800}
                height={600}
                className="rounded-3xl shadow-2xl w-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Top Job Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Find the right path for your skills. From financial bursaries to technical learnerships, we curate the best for South African youth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group">
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex flex-col h-full">
                    {cat.icon}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-gray-600 leading-snug">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-Rich Contextual Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-pink lg:prose-lg mx-auto">
            <h2 className="text-center">South Africa's Leading Youth Employment Portal</h2>
            <p>
              At <strong>FirstJobly</strong>, we bridge the gap between education and employment. Our platform is specifically designed for the South African job market, focusing on:
            </p>
            <ul>
              <li><strong>Graduate Internships:</strong> Gain experience at top-tier SA firms.</li>
              <li><strong>Learnerships & Skills Development:</strong> Earn an NQF qualification while receiving a stipend.</li>
              <li><strong>Public Sector Opportunities:</strong> Direct access to Government Internships and Departmental roles.</li>
            </ul>
            <div className="bg-gray-900 text-white p-8 rounded-2xl mt-12 not-prose shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Protecting Your Job Search</h3>
              <p className="text-gray-300 mb-0">
                We manually verify every listing. FirstJobly will <strong>never</strong> ask you to pay for a job application. Join thousands of South Africans who started their careers right here.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}