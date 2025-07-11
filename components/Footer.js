import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 mt-16 border-t">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Centered Site Name */}
        <h4 className="text-2xl font-bold mb-8 text-blue-700">FirstJobly</h4>

        {/* Grid layout: 2 rows of 4 links each */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 justify-items-center mb-8">
          <Link href="/" className="hover:underline text-base">Home</Link>
          <Link href="/jobs" className="hover:underline text-base">Jobs</Link>
          <Link href="/blog" className="hover:underline text-base">Blog</Link>
          <Link href="/about" className="hover:underline text-base">About</Link>

          <Link href="/contact" className="hover:underline text-base">Contact</Link>
          <Link href="/privacy" className="hover:underline text-base">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline text-base">Terms of Use</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>

        </div>

        {/* Contact and copyright */}
        <div className="text-sm text-gray-600">
          <p>info@firstjobly.co.za</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} FirstJobly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
