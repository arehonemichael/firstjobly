"use client";

import { useState, useEffect } from "react";
import { addPost, getPosts, deletePost } from "../../../lib/blog";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../lib/firebaseConfig";
import Image from "next/image";

// Firebase Storage imports removed - no longer needed with URL-based images

export default function BlogAdminPage() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "", // Image is now a URL string, not a file
  });
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });

    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // No upload needed - just save the post with the image URL directly
      await addPost(post);

      setPost({ title: "", slug: "", description: "", content: "", image: "" });

      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
    } catch (err) {
      setError("Failed to add post: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    await deletePost(id);
    const updatedPosts = await getPosts();
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Blog Post</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={post.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="URL Slug (e.g., first-job-tips)"
          value={post.slug}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Short Description"
          value={post.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        {/* Replaced file upload with URL input */}
        <div>
          <input
            type="url"
            name="image"
            placeholder="Image URL (e.g., https://images.unsplash.com/...)"
            value={post.image}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <p className="text-xs text-gray-400 mt-1">
            Paste any public image URL. Use Unsplash, Pexels, or your own hosted image. Must be at least 1200px wide for Google Discover.
          </p>
        </div>

        {/* Live preview from URL */}
        {post.image && (
          <div className="relative w-full h-48 rounded border overflow-hidden bg-gray-100">
            <Image
              src={post.image}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized // External URLs may not be in next.config domains
            />
          </div>
        )}

        <textarea
          name="content"
          placeholder="HTML Content"
          value={post.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {saving ? "Publishing..." : "Publish"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Published Posts</h2>
      {posts.map((p) => (
        <div key={p.id} className="border p-4 rounded mb-4">
          <h3 className="font-semibold">{p.title}</h3>
          {p.image && (
            <div className="relative w-48 h-32 mt-2 rounded overflow-hidden bg-gray-100">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <button
            onClick={() => handleDelete(p.id, p.title)}
            className="text-red-600 text-sm mt-2 block"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}