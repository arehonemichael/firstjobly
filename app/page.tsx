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
  title: "FirstJobly - Find Your First Job Fast",
  description:
    "Explore internships, entry-level, remote, and government jobs for youth and graduates on FirstJobly.",
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

  return (
    <main className="bg-white min-h-screen text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-pink-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text Content - Left Side */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
                Your Career{" "}
                <span className="text-pink-600">Starts Here.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Explore opportunities, gain experience, and find your first step 
                toward a successful career all in one place.
              </p>

              <Link href="/jobs">
                <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition shadow-md">
                  Browse Jobs
                </button>
              </Link>
            </div>

            {/* Image - Right Side */}
            <div className="order-1 lg:order-2">
              <Image
                src="/images/hero-image.png"
                alt="Young professional working"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Popular Job Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.href}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     
    </main>
  );
}