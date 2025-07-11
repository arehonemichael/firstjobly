export const metadata = {
  title: "FirstJobly - Find Your First Job Fast",
  description:
    "Explore internships, entry-level, remote, and government jobs for youth and graduates on FirstJobly.",
  openGraph: {
    title: "FirstJobly - Find Your First Job Fast",
    description:
      "Explore internships, entry-level, remote, and government jobs for youth and graduates.",
    url: "https://firstjobly.co.za",
    siteName: "FirstJobly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstJobly - Find Your First Job Fast",
    description: "Explore internships, entry-level, remote, and government jobs.",
    images: ["/og-image.png"],
  },
};

import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-gray-800">
      {/* ✅ Modern Gradient Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your First Job, Fast
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover internships, entry-level jobs, and career-starting opportunities.
          </p>
          <Link href="/jobs">
            <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
              Browse Jobs
            </button>
          </Link>
        </div>
      </section>

      {/* ✅ Popular Job Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Popular Job Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/jobs?category=Internships">
            <div className="cursor-pointer bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition">
              <h4 className="text-xl font-medium mb-2">Internships</h4>
              <p className="text-gray-600 text-sm">
                Paid and unpaid internships across industries.
              </p>
            </div>
          </Link>
          <Link href="/jobs?category=Entry-Level">
            <div className="cursor-pointer bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition">
              <h4 className="text-xl font-medium mb-2">Entry-Level Jobs</h4>
              <p className="text-gray-600 text-sm">
                Roles with little to no experience required.
              </p>
            </div>
          </Link>
          <Link href="/jobs?category=Remote">
            <div className="cursor-pointer bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition">
              <h4 className="text-xl font-medium mb-2">Remote Opportunities</h4>
              <p className="text-gray-600 text-sm">
                Work from anywhere jobs for fresh graduates.
              </p>
            </div>
          </Link>
          <Link href="/jobs?category=Government">
            <div className="cursor-pointer bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition">
              <h4 className="text-xl font-medium mb-2">Government Jobs</h4>
              <p className="text-gray-600 text-sm">
                Entry-level government jobs & internships.
              </p>
            </div>
          </Link>
          <Link href="/jobs?category=Permanent">
            <div className="cursor-pointer bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition">
              <h4 className="text-xl font-medium mb-2">Permanent Jobs</h4>
              <p className="text-gray-600 text-sm">
                Secure full-time roles with long-term growth.
              </p>
            </div>
          </Link>
          <Link href="/jobs?category=Learnership">
            <div className="cursor-pointer bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition">
              <h4 className="text-xl font-medium mb-2">Learnerships</h4>
              <p className="text-gray-600 text-sm">
                Programs combining learning and work experience.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
