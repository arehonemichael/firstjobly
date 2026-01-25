"use client";

import { useState, useEffect } from "react";
import { addPost, getPosts, deletePost } from "../../../lib/blog";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from "../../../lib/firebaseConfig";
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
  const [uploading, setUploading] = useState(false);

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
  }, [router]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      let imageUrl = "";

      // Upload image directly from client
      if (imageFile) {
        // Clean filename
        const ext = imageFile.name.split(".").pop();
        const baseName = imageFile.name
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

        const filename = `${baseName}-${Date.now()}.${ext}`;

        // Upload to Firebase Storage
        const storageRef = ref(storage, `blog-images/${filename}`);
        
        await uploadBytes(storageRef, imageFile, {
          contentType: imageFile.type,
        });

        // Get public URL
        imageUrl = await getDownloadURL(storageRef);
        console.log("Upload successful:", imageUrl);
      }

      // Save post with Firebase Storage URL
      await addPost({ ...post, image: imageUrl });

      // Reset form
      setPost({ title: "", slug: "", description: "", content: "" });
      setImageFile(null);

      // Refresh posts list
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
    } catch (err) {
      console.error(err);
      setError("Failed to add post: " + err.message);
    } finally {
      setUploading(false);
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
          disabled={uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {uploading ? "Publishing..." : "Publish"}
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