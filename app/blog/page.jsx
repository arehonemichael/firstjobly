import { getPosts } from "../../lib/blog";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getPosts();

  if (!posts.length) {
    return <p className="text-center py-12">No blog posts yet.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      {posts.map((post) => (
        <div key={post.id} className="border-b pb-6 mb-6">
          <h2 className="text-2xl font-semibold">
            <Link href={`/blog/${post.slug}`} className="hover:underline text-blue-700">
              {post.title}
            </Link>
          </h2>
          {post.createdAt && (
            <p className="text-gray-500 text-sm mb-2">
              {new Intl.DateTimeFormat("en-ZA", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(post.createdAt))}
            </p>
          )}
          <p className="text-sm text-gray-700">{post.description}</p>
        </div>
      ))}
    </main>
  );
}
