"use client";
import { useState } from "react";
import { db } from "../../lib/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !description) return;

    await addDoc(collection(db, "jobs"), {
      title,
      company,
      logo,
      location,
      link,
      requirements,
      description,
      category,
      createdAt: Timestamp.now(),
    });

    // Clear form
    setTitle("");
    setCompany("");
    setLogo("");
    setLocation("");
    setLink("");
    setRequirements("");
    setDescription("");
    setCategory("");
    alert("Job posted successfully!");
  };

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Company Name"
          className="w-full border p-2 rounded"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company Logo URL"
          className="w-full border p-2 rounded"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Apply Link"
          className="w-full border p-2 rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <textarea
          placeholder="Requirements / Qualifications"
          className="w-full border p-2 rounded"
          rows={3}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        ></textarea>

        <textarea
          placeholder="Job Description"
          className="w-full border p-2 rounded"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Internships">Internships</option>
          <option value="Entry-Level">Entry-Level</option>
          <option value="Government">Government</option>
          <option value="Learnership">Learnership</option>
          <option value="Remote">Remote</option>
          <option value="Permanent">Permanent</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </main>
  );
}
