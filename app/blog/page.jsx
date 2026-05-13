// app/blog/page.jsx
import { getPosts } from "../../lib/blog";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "FirstJobly Blog – Latest Posts",
  description:
    "Read the latest career tips, job updates, and opportunities on FirstJobly.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  if (!posts.length) {
    return <p className="text-center py-12">No blog posts yet.</p>;
  }

  // Removed wrapping <main> — layout.js already provides one
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <article key={post.id} className="border-b pb-6">
            <Link
              href={`/blog/${post.slug}`}
              className="block p-4 rounded hover:bg-gray-50 transition"
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

              {/* Fixed: Next.js Image instead of raw <img> for LCP optimisation */}
              {post.image && (
                <div className="relative w-full h-64 mb-4 rounded overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}

              <p className="text-sm text-gray-700">{post.description}</p>
            </Link>

            {/* Fixed: consistent ad frequency, av-lazy not lazy */}
            {(index + 1) % 4 === 0 && (
              <div
                className="av-lazy my-4"
                parent-unit="Firstjobly_Incontent_Lazy"
              />
            )}
          </article>
        ))}
      </div>

      {/* Fixed: av-lazy not lazy */}
      <div id="Firstjobly_Bottom_BTF" className="av-lazy my-10"></div>
    </div>
  );
}