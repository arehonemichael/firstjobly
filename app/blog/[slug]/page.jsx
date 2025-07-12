import { getPostBySlug } from "../../../lib/blog";
import PageHeader from "../../../components/PageHeader";
import Link from "next/link";

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <p className="text-center py-12">Post not found.</p>;
  }

  const date = post.createdAt?.toDate?.(); // Firestore Timestamp
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date)
    : "Unknown date";

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <PageHeader title={post.title} subtitle={post.description || ""} />
{post.image && (
  <img
    src={post.image}
    alt={post.title}
    className="rounded-lg mb-6 w-full object-cover max-h-96"
  />
)}

      {/* Date */}
      <p className="text-sm text-gray-500 mb-6">{formattedDate}</p>

      {/* Article Content */}
      <article
        className="prose lg:prose-lg max-w-none prose-headings:text-blue-700 prose-a:text-blue-600 prose-a:underline prose-img:rounded"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Back link */}
      <div className="mt-10">
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
