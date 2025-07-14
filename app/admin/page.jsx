"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../lib/firebaseConfig";
import { getJobs, deleteJob } from "../../lib/jobs";
import Link from "next/link";
import AdminJobForm from "../../components/AdminJobForm";

// Force dynamic to avoid static rendering interfering with auth
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    if (user) fetchJobs();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteJob(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  if (loading) return <p className="p-6">Checking authentication...</p>;
  if (!user) return null; // Avoid flicker

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Job Admin Panel</h1>

      <AdminJobForm />

      <h2 className="text-xl font-semibold mt-10 mb-4">Posted Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded mb-4">
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
          <div className="mt-2 flex gap-4">
            <Link
              href={`/admin/edit/${job.id}`}
              className="text-blue-600 text-sm underline"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(job.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
