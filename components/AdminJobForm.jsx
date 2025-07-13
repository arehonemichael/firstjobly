"use client";
import { useState } from "react";
import { addJob } from "../lib/jobs";
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

  const categories = [
    "Internships",
    "Entry-Level",
    "Bursary",
    "Government",
    "Permanent",
    "Learnership",
  ];

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
      router.refresh(); // reload list
    } catch (err) {
      console.error(err);
      setError("Failed to add job.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-10">
      {error && <p className="text-red-600">{error}</p>}
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
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
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
        rows={4}
        className="w-full border px-4 py-2 rounded"
      />
      <textarea
        name="requirements"
        placeholder="Job Requirements"
        value={job.requirements}
        onChange={handleChange}
        required
        rows={3}
        className="w-full border px-4 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Post Job
      </button>
    </form>
  );
}
