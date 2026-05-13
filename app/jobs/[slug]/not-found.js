import Link from "next/link";
import { getJobsListing } from "../../../lib/jobs";

export const metadata = {
  title: "Job No Longer Available | FirstJobly",
  description: "This job listing has expired or been removed. Browse similar opportunities on FirstJobly.",
};

export default async function JobNotFound() {
  // Fetch a few recent jobs to show instead of a blank page
  let recentJobs = [];
  try {
    const allJobs = await getJobsListing();
    recentJobs = allJobs.slice(0, 6); // Show 6 recent jobs
  } catch {
    // Silent fail — page still renders without jobs
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 sm:pb-10">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Message */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            This Job Is No Longer Available
          </h1>
          <p className="text-gray-500 mb-6">
            This listing has expired or been filled. But don't worry — new
            opportunities are added every day.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-all active:scale-95"
          >
            Browse All Jobs
          </Link>
        </div>

        {/* Ad slot — still earns revenue on expired job visits */}
        <div className="mb-6">
          <div id="Firstjobly_Incontent_Lazy" className="av-lazy" />
        </div>

        {/* Related jobs — keeps user on site */}
        {recentJobs.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Latest Opportunities
            </h2>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug}`}
                  className="flex items-start justify-between p-4 rounded-xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50/30 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors truncate">
                      {job.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {job.company || "Confidential"}
                      {job.location && ` · ${job.location}`}
                    </p>
                  </div>
                  {job.category && (
                    <span className="ml-3 flex-shrink-0 text-xs font-medium bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full">
                      {job.category}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <Link
                href="/jobs"
                className="text-pink-600 text-sm font-medium hover:underline"
              >
                View all jobs →
              </Link>
            </div>
          </div>
        )}

        {/* Bottom ad */}
        <div className="mt-6">
          <div id="Firstjobly_Bottom_BTF" className="av-lazy" />
        </div>

      </div>
    </div>
  );
}