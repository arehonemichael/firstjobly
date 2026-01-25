"use client";

import { useState, useEffect } from "react";
import { addPost, getPosts, deletePost } from "../../../lib/blog";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../lib/firebaseConfig";
import Image from "next/image";

export default function BlogAdminPage() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Check authentication & fetch posts
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
  }, []);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      // Upload image first
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.url) imageUrl = data.url;
        else {
          setError("Image upload failed");
          return;
        }
      }

      // Save post with local image URL
      await addPost({ ...post, image: imageUrl });

      // Reset form
      setPost({ title: "", slug: "", description: "", content: "" });
      setImageFile(null);

      // Refresh posts list
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add post.");
    }
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    const updatedPosts = await getPosts();
    setPosts(updatedPosts);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
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

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full border px-4 py-2 rounded"
        />

        {/* Preview */}
        {imageFile && (
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            width={200}
            height={150}
            className="mt-2 rounded border"
          />
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
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Published Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded mb-4">
          <h3 className="font-semibold">{post.title}</h3>
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={200}
              height={150}
              className="mt-2 rounded"
            />
          )}
          <button
            onClick={() => handleDelete(post.id)}
            className="text-red-600 text-sm mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
