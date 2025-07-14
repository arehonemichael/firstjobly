"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../../lib/firebaseConfig";
import { getJobById, updateJob } from "../../../../lib/jobs";

export default function EditJobPage({ params }) {
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const job = await getJobById(params.id);
      if (!job) return router.push("/admin");
      setForm(job);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [params.id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob(params.id, form);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to update job.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <input name="company" value={form.company || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <input name="logo" value={form.logo || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <input name="category" value={form.category || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <input name="link" value={form.link || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <textarea name="description" value={form.description || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <textarea name="requirements" value={form.requirements || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Update Job</button>
      </form>
    </main>
  );
}
