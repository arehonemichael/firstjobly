// app/blog/page.jsx (or pages/blog/index.jsx)
import { getPosts } from "../../lib/blog";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export const revalidate = 60; // ISR: regenerate page every 60 seconds

export default async function BlogPage() {
  const posts = await getPosts();

  if (!posts.length) {
    return <p className="text-center py-12">No blog posts yet.</p>;
  }

  return (
    <>
      <Head>
        <title>Your Blog Name – Latest Posts</title>
        <meta
          name="description"
          content="Read the latest blog posts on Your Blog Name covering topics like X, Y, and Z."
        />
        <link rel="canonical" href="https://yourdomain.com/blog" />
      </Head>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

        {posts.map((post) => (
          <article key={post.id} className="border-b pb-6 mb-6">
            {/* Blog Title */}
            <h2 className="text-2xl font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline text-blue-700"
              >
                {post.title}
              </Link>
            </h2>

            {/* Date */}
            {post.createdAt && (
              <p className="text-gray-500 text-sm mb-2">
                {new Intl.DateTimeFormat("en-ZA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(post.createdAt))}
              </p>
            )}

            {/* Image */}
            {post.image && (
              <div className="relative w-full h-64 mb-4 rounded overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority={false} // lazy-load
                />
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-gray-700">{post.description}</p>

            {/* Structured data per post */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  headline: post.title,
                  image: post.image ? [post.image] : [],
                  author: { "@type": "Person", name: "Your Name" },
                  publisher: {
                    "@type": "Organization",
                    name: "Your Blog Name",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://yourdomain.com/logo.png",
                    },
                  },
                  datePublished: post.createdAt,
                  description: post.description || "",
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://yourdomain.com/blog/${post.slug}`,
                  },
                }),
              }}
            />
          </article>
        ))}
      </main>
    </>
  );
}
