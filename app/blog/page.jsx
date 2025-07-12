import Link from "next/link";
import { getPosts } from "../../lib/blog"; 

export default async function BlogPage() {
  const posts = await getPosts();

  if (!posts.length) {
    return <p className="text-center py-12">No blog posts yet.</p>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Career Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => {
          const date = post.createdAt?.toDate?.(); // Convert Firestore timestamp
          const formattedDate = date
            ? new Intl.DateTimeFormat("en-ZA", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(date)
            : "No date";

          return (
            <article key={post.slug} className="border p-4 rounded shadow">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
              <p className="text-sm text-gray-600">{post.description}</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
