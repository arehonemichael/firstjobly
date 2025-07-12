"use client";
import { useState, useEffect } from "react";
import { addJob, getJobs, deleteJob } from "../../lib/jobs";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../lib/firebaseConfig";

export default function AdminJobPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({
    title: "",
    company: "",
    logo: "",
    category: "",
    link: "",
    description: "",
    requirements: "",
  });
  const [error, setError] = useState("");

  // 🔐 Check if user is logged in
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 🔄 Fetch existing jobs
  useEffect(() => {
    const loadJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    loadJobs();
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJob(job);
      setJob({
        title: "",
        company: "",
        logo: "",
        category: "",
        link: "",
        description: "",
        requirements: "",
      });
      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
    } catch (err) {
      console.error(err);
      setError("Failed to add job.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin - Post a Job</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="url"
          name="logo"
          placeholder="Company Logo URL"
          value={job.logo}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="category"
          value={job.category}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Internships">Internships</option>
          <option value="Entry-Level">Entry-Level</option>
          <option value="Remote">Remote</option>
          <option value="Government">Government</option>
          <option value="Permanent">Permanent</option>
          <option value="Learnership">Learnership</option>
        </select>
        <input
          type="url"
          name="link"
          placeholder="Application Link"
          value={job.link}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
          rows={3}
        />
        <textarea
          name="requirements"
          placeholder="Job Requirements"
          value={job.requirements}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>

      {/* ✅ Job List with Delete Option */}
      <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
            <button
              onClick={() => handleDelete(job.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
