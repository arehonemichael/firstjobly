"use client";
import { useState } from "react";
import { addJob } from "../../lib/jobs";
import { useRouter } from "next/navigation";

export default function AdminJobForm() {
  const router = useRouter();
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

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJob(job);
      router.push("/jobs");
    } catch (err) {
      console.error(err);
      setError("Failed to add job.");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input type="text" name="company" placeholder="Company Name" value={job.company} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input type="url" name="logo" placeholder="Company Logo URL" value={job.logo} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <select name="category" value={job.category} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
          <option value="">Select Category</option>
          <option value="Internships">Internships</option>
          <option value="Entry-Level">Entry-Level</option>
          <option value="Remote">Remote</option>
          <option value="Government">Government</option>
          <option value="Permanent">Permanent</option>
          <option value="Learnership">Learnership</option>
        </select>
        <input type="url" name="link" placeholder="Application Link" value={job.link} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <textarea name="description" placeholder="Job Description" value={job.description} onChange={handleChange} required rows={4} className="w-full border px-4 py-2 rounded" />
        <textarea name="requirements" placeholder="Job Requirements" value={job.requirements} onChange={handleChange} required rows={3} className="w-full border px-4 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Post Job</button>
      </form>
    </main>
  );
}
