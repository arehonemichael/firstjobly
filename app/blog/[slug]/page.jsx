// app/blog/[slug]/page.jsx
import { getBlogBySlug } from "../../../lib/blog";
import Head from "next/head";

export const revalidate = 60; // ISR for static regeneration

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
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || ""} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || ""} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="og:type" content="article" />
        <link
          rel="canonical"
          href={`https://yourdomain.com/blog/${post.slug}`}
        />
      </Head>

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
            src={post.image} // Firebase URL
            alt={post.title}
            className="w-full h-auto rounded mb-4"
          />
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Optional JSON-LD structured data for SEO */}
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
      </main>
    </>
  );
}
