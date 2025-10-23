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
      desc: "Kickstart your career with real-world experience.",
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
    <main className="bg-white min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-white h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Image on Left */}
          <div className="flex-shrink-0 flex justify-center items-center relative w-3/5 sm:w-1/2">
            {/* Background Circle */}
            <div className="absolute -z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[32rem] lg:h-[32rem] bg-pink-100 rounded-full blur-3xl opacity-60 -top-10 -left-10"></div>
            <Image
              src="/images/hero-image.png"
              alt="Young professional working"
              width={1600}
              height={1280}
              className="rounded-2xl shadow-2xl object-contain w-full max-w-[400px] sm:max-w-[640px] lg:max-w-[800px]"
              priority
            />
          </div>
          {/* Text on Right */}
          <div className="flex-1 flex flex-col justify-center items-start text-left max-w-sm sm:max-w-md relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug text-gray-900 mb-6">
              Your Career <span className="text-pink-600">Starts Here.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              Explore opportunities, gain experience, and find your first step toward a successful career all in one place.
            </p>
            <Link href="/jobs">
              <button className="bg-pink-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition shadow-md text-base sm:text-lg">
                Browse Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Popular Job Categories */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
          Popular Job Categories
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.href}>
              <div className="group cursor-pointer bg-white border rounded-xl p-8 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 text-center">
                <div className="flex flex-col items-center">
                  {cat.icon}
                  <h3 className="text-lg font-semibold text-gray-900 mt-2 group-hover:text-pink-600 transition">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{cat.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}