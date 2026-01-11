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
  title: "FirstJobly - Jobs in South Africa | Internships, Learnerships, Graduate Jobs & Entry-Level Positions 2025",
  description:
    "Find internships, learnerships, bursaries, graduate jobs, and entry-level positions in South Africa. Browse government jobs, permanent roles, and opportunities for youth. Your first job starts here.",
  keywords: "jobs in South Africa, internships South Africa, learnerships, graduate jobs, entry level jobs, government jobs, bursaries, youth employment, first job, graduate opportunities, SA jobs, careers South Africa, internship programs, learnership opportunities, permanent jobs South Africa",
  openGraph: {
    title: "FirstJobly - Find Graduate Jobs, Internships & Learnerships in South Africa",
    description:
      "Discover internships, learnerships, bursaries, and entry-level jobs for South African youth and graduates. Start your career journey today.",
    url: "https://firstjobly.co.za",
    siteName: "FirstJobly",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstJobly - Graduate Jobs & Internships in South Africa",
    description:
      "Find internships, learnerships, and entry-level jobs for South African youth.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://firstjobly.co.za",
  },
};

export default function Home() {
  const categories = [
    {
      title: "Internships",
      desc: "Start your career with real-world experience.",
      href: "/jobs?category=Internships",
      icon: <FaBriefcase className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Entry-Level Jobs",
      desc: "Roles designed for fresh graduates and youth.",
      href: "/jobs?category=Entry-Level",
      icon: <FaSuitcaseRolling className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Bursaries",
      desc: "Funding programs to help you study and grow.",
      href: "/jobs?category=Bursary",
      icon: <FaUniversity className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Government Jobs",
      desc: "Public sector internships and entry-level positions.",
      href: "/jobs?category=Government",
      icon: <FaBuilding className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Permanent Jobs",
      desc: "Long-term roles to build your career foundation.",
      href: "/jobs?category=Permanent",
      icon: <FaBriefcase className="text-pink-600 w-10 h-10 mb-3" />,
    },
    {
      title: "Learnerships",
      desc: "Earn while you learn through hands-on programs.",
      href: "/jobs?category=Learnership",
      icon: <FaBookOpen className="text-pink-600 w-10 h-10 mb-3" />,
    },
  ];

  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FirstJobly",
    "url": "https://firstjobly.co.za",
    "description": "South Africa's leading job portal for internships, learnerships, graduate jobs, and entry-level positions for youth and graduates.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://firstjobly.co.za/jobs?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "areaServed": {
      "@type": "Country",
      "name": "South Africa"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FirstJobly",
    "url": "https://firstjobly.co.za",
    "logo": "https://firstjobly.co.za/logo.png",
    "description": "FirstJobly connects South African youth and graduates with internships, learnerships, bursaries, and entry-level job opportunities.",
    "areaServed": "ZA",
    "sameAs": [
      "https://whatsapp.com/channel/0029VbBbQOK4inoxcWKjHY2v"
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      <main className="bg-white min-h-screen text-gray-800 overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-pink-50 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Text Content */}
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
                  Your Career{" "}
                  <span className="text-pink-600">Starts Here.</span>
                </h1>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Explore internships, learnerships, bursaries, and entry-level jobs
                  for South African youth and graduates. Start your career journey today
                  with opportunities across all provinces.
                </p>

                <Link href="/jobs">
                  <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition shadow-md">
                    Browse Jobs in South Africa
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2">
                <Image
                  src="/images/hero-image.png"
                  alt="South African graduates and youth finding jobs, internships and learnerships"
                  width={1600}
                  height={1280}
                  className="rounded-2xl shadow-lg w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Job Categories */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/*  MOVED: Advergic In-Content Unit - Now above categories */}
            <div id="Firstjobly_Incontent_Lazy" className="mb-10"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Job Categories in South Africa
            </h2>
            <p className="text-gray-600 mb-10">
              Browse the latest opportunities for graduates, youth, and first-time job seekers across South Africa
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link key={cat.title} href={cat.href}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">{cat.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {cat.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{cat.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO-Rich Content Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Gateway to Employment Opportunities in South Africa
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 text-gray-600">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Internships for South African Graduates
                  </h3>
                  <p className="mb-4">
                    FirstJobly connects you with internship programs from leading companies across South Africa. 
                    Whether you're in Johannesburg, Cape Town, Durban, or Pretoria, find paid and unpaid internships 
                    that offer real-world experience in your field of study.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Learnerships & Skills Development
                  </h3>
                  <p className="mb-4">
                    Discover learnership opportunities that combine theoretical learning with practical experience. 
                    Our platform features SETA-approved learnerships across various industries, helping you gain 
                    nationally recognized qualifications while earning an income.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Entry-Level & Graduate Jobs
                  </h3>
                  <p className="mb-4">
                    Browse entry-level positions perfect for recent graduates and first-time job seekers. From 
                    administrative roles to technical positions, find opportunities that match your qualifications 
                    and career aspirations across South Africa's job market.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Government & Public Sector Jobs
                  </h3>
                  <p className="mb-4">
                    Access the latest government job listings, including positions in national departments, 
                    provincial administrations, and municipalities. Stay updated on public sector internships, 
                    graduate programs, and permanent appointments.
                  </p>
                </div>
              </div>

              <div className="mt-10 bg-pink-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose FirstJobly for Your Job Search?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span><strong>Daily Updates:</strong> New opportunities added every day from employers across South Africa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span><strong>Youth-Focused:</strong> Specialized in opportunities for graduates and first-time job seekers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span><strong>Free Access:</strong> Browse and apply to unlimited jobs at no cost</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span><strong>Verified Listings:</strong> All opportunities screened to protect you from scams</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span><strong>Mobile-Friendly:</strong> Search and apply from anywhere in South Africa</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords-Rich Footer Section */}
        <section className="py-12 bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
          </div>
        </section>
      </main>
    </>
  );
}
