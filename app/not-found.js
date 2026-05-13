import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            This Page No Longer Exists
          </h1>
          <p className="text-gray-500 mb-6">
            This job may have been filled or removed. New opportunities
            are added every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/jobs"
              className="inline-block bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-all"
            >
              Browse All Jobs
            </Link>
            <Link
              href="/blog"
              className="inline-block bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:border-pink-300 transition-all"
            >
              Read Career Tips
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <div id="Firstjobly_Incontent_Lazy" className="av-lazy" />
        </div>

        <div className="mt-6">
          <div id="Firstjobly_Bottom_BTF" className="av-lazy" />
        </div>
      </div>
    </div>
  );
}