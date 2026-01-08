// app/blog/page.jsx
import React from "react";
import { getPosts } from "../../lib/blog";
import Link from "next/link";
import Head from "next/head";

export const revalidate = 60; // optional ISR

export default async function BlogPage() {
  const posts = await getPosts();

  if (!posts.length) {
    return <p className="text-center py-12">No blog posts yet.</p>;
  }

  return (
    <>
      <Head>
        <title>FirstJobly Blog – Latest Posts</title>
        <meta
          name="description"
          content="Read the latest career tips, job updates, and opportunities on FirstJobly."
        />
        <link rel="canonical" href="https://firstjobly.co.za/blog" />
      </Head>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            {/* Blog post */}
            <article className="border-b pb-6 mb-6">
              <h2 className="text-2xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline text-blue-700"
                >
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

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto rounded mb-4"
                />
              )}

              <p className="text-sm text-gray-700">
                {post.description}
              </p>
            </article>

            {/* After 2nd post → In-content parent unit */}
            {index === 1 && (
              <div id="Firstjobly_Incontent_Lazy"></div>
            )}

            {/* After every 4th post → Repeater unit */}
            {(index + 1) % 4 === 0 && (
              <div
                className="lazy"
                parent-unit="Firstjobly_Incontent_Lazy"
              ></div>
            )}
          </React.Fragment>
        ))}
      </main>
    </>
  );
}
