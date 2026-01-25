// app/blog/[slug]/page.jsx
import { getBlogBySlug } from "../../../lib/blog";
import Image from "next/image";

export const revalidate = 60; // ISR: automatically refresh new posts

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params; // AWAIT params
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
    };
  }

  const absoluteImageUrl = post.image && post.image.startsWith("/images/")
    ? `https://firstjobly.co.za${post.image}`
    : post.image;

  return {
    title: post.title,
    description: post.description || "",
    openGraph: {
      title: post.title,
      description: post.description || "",
      type: "article",
      url: `https://firstjobly.co.za/blog/${slug}`,
      images: absoluteImageUrl ? [absoluteImageUrl] : [],
    },
    alternates: {
      canonical: `https://firstjobly.co.za/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params; // AWAIT params
  const post = await getBlogBySlug(slug);

  if (!post) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p>This post may have been removed or doesn't exist.</p>
      </main>
    );
  }

  const absoluteImageUrl = post.image && post.image.startsWith("/images/")
    ? `https://firstjobly.co.za${post.image}`
    : post.image;

  return (
    <>
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

        {/* Render all images - both local and Firebase Storage */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={600}
            priority={true}
            className="rounded mb-4"
            unoptimized
          />
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: absoluteImageUrl ? [absoluteImageUrl] : [],
            author: { "@type": "Person", name: "FirstJobly" },
            publisher: {
              "@type": "Organization",
              name: "FirstJobly",
              logo: {
                "@type": "ImageObject",
                url: "https://firstjobly.co.za/logo.png",
              },
            },
            datePublished: post.createdAt,
            description: post.description || "",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://firstjobly.co.za/blog/${slug}`,
            },
          }),
        }}
      />
    </>
  );
}