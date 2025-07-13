"use client";
import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../lib/jobs";
import AdminJobForm from "../../components/AdminJobForm";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    await deleteJob(id);
    const updated = await getJobs();
    setJobs(updated);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin: Manage Jobs</h1>

      {/* Job Posting Form */}
      <AdminJobForm />

      <h2 className="text-xl font-semibold mt-10 mb-4">Posted Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="border rounded p-4 mb-4">
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>

          <div className="flex space-x-4 mt-2">
            <button
              onClick={() => handleDelete(job.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => router.push(`/admin/edit/${job.id}`)}
              className="text-blue-600 text-sm"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
