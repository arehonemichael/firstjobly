// app/blog/[slug]/page.jsx
import { getBlogBySlug } from "../../../lib/blog";
import Head from "next/head";
import Image from "next/image";

export const revalidate = 60; // ISR: automatically refresh new posts

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

  // Absolute URL for SEO / OG (only for local images)
  const absoluteImageUrl =
    post.image && post.image.startsWith("/images/")
      ? `https://yourdomain.com${post.image}`
      : null;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || ""} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || ""} />
        {absoluteImageUrl && (
          <meta property="og:image" content={absoluteImageUrl} />
        )}
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

        {/* Render only local uploaded images */}
        {post.image && post.image.startsWith("/images/") && (
          <Image
            src={post.image} // e.g., "/images/job1-1675309123.jpg"
            alt={post.title}
            width={800} // adjust to layout
            height={600} // adjust to layout
            priority={true}
            className="rounded mb-4"
          />
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              image: absoluteImageUrl ? [absoluteImageUrl] : [],
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
