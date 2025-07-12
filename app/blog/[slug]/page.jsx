import { getPostBySlug } from "../../../lib/blog";
import PageHeader from "../../../components/PageHeader";

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <p className="text-center py-12">Post not found.</p>;
  }

  const date = post.createdAt?.toDate?.(); // Convert Firestore Timestamp
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date)
    : "Unknown date";

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <PageHeader title={post.title} subtitle={post.description || ""} />
      <p className="text-sm text-gray-500 mb-6">{formattedDate}</p>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
