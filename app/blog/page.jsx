// app/blog/page.jsx
import { getPosts } from "../../lib/blog";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "FirstJobly Blog – Latest Posts",
  description: "Read the latest career tips, job updates, and opportunities on FirstJobly.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  if (!posts.length) {
    return <p className="text-center py-12">No blog posts yet.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <article 
            key={post.id} 
            className="border-b pb-6"
          >
            {/* Make entire card clickable */}
            <Link 
              href={`/blog/${post.slug}`}
              className="block p-4 rounded hover:bg-gray-50 transition cursor-pointer"
              style={{ pointerEvents: 'auto' }} // Force clickable
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-700 hover:underline">
                {post.title}
              </h2>

              {post.createdAt && (
                <p className="text-gray-500 text-sm mb-2">
                  {new Intl.DateTimeFormat("en-ZA", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(post.createdAt))}
                </p>
              )}

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto rounded mb-4"
                  style={{ pointerEvents: 'none' }} // Prevent image from blocking clicks
                />
              )}

              <p className="text-sm text-gray-700">
                {post.description}
              </p>
            </Link>

            {/* Ad placements */}
            {index === 1 && (
              <div id="Firstjobly_Incontent_Lazy" />
            )}

            {(index + 1) % 4 === 0 && (
              <div
                className="lazy"
                parent-unit="Firstjobly_Incontent_Lazy"
              />
            )}
          </article>
        ))}
      </div>
    </main>
  );
}