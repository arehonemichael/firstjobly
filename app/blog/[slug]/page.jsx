export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getBlogBySlug } from "../../../lib/blog";

export default async function BlogPostPage({ params }) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p>This post may have been removed or doesn't exist.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.createdAt && (
        <p className="text-gray-500 text-sm mb-4">
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
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
