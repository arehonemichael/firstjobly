import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16 py-6">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        
        {/* Brand */}
        <h2 className="text-2xl font-bold text-pink-600">
          First<span className="text-gray-900">Jobly.</span>
        </h2>
        
        {/* Links */}
        <div className="flex justify-center space-x-6 text-gray-600 text-sm">
          <Link href="/privacy" className="hover:text-pink-600 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-pink-600 transition">
            Terms of Use
          </Link>
          <Link href="/cookie-policy" className="hover:text-pink-600 transition">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
