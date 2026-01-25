import { getBlogBySlug } from "../../../lib/blog";
import Image from "next/image";

export const revalidate = 60; // ISR: automatically refresh new posts

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Blog Not Found" };
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
  const { slug } = await params;
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

  // Split content into chunks for in-feed ads
  const contentChunks = post.content
    ? post.content.match(/(.|[\r\n]){1,500}(\s|$)/g) || [post.content]
    : [];

  let adCounter = 0;
  const maxAds = 5;

  return (
    <>
      <main className="max-w-3xl mx-auto p-6">
        {/* Blog Title */}
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        {post.createdAt && (
          <p className="text-gray-500 text-sm mb-4">
            {new Intl.DateTimeFormat("en-ZA", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(post.createdAt))}
          </p>
        )}

        {/* Hero Image */}
        {post.image && (
          <div className="relative w-full h-96 mb-6 bg-gray-100 rounded overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority={true}
              quality={90}
            />
          </div>
        )}

        {/* 🎯 TOP IN-CONTENT AD */}
        {adCounter < maxAds && <div id="Firstjobly_Incontent_Lazy" className="my-6"></div>}
        {adCounter < maxAds && adCounter++}

        {/* Blog Content with in-feed ads */}
        <div className="prose prose-lg max-w-none">
          {contentChunks.map((chunk, idx) => (
            <div key={idx}>
              <div dangerouslySetInnerHTML={{ __html: chunk }} />

              {/* 🎯 Insert ad every 2 chunks */}
              {(idx + 1) % 2 === 0 && idx + 1 < contentChunks.length && adCounter < maxAds && (
                <div className="lazy my-6" parent-unit="Firstjobly_Incontent_Lazy"></div>
              )}
              {(idx + 1) % 2 === 0 && adCounter < maxAds && adCounter++}
            </div>
          ))}
        </div>

        {/* Optional extra ad for very long posts */}
        {contentChunks.length > 4 && adCounter < maxAds && (
          <div className="lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>
        )}
        {contentChunks.length > 4 && adCounter < maxAds && adCounter++}

        {/* 🎯 BOTTOM AD */}
        {adCounter < maxAds && <div className="lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>}
        {adCounter < maxAds && adCounter++}

        {/* 🎯 FINAL BTF Banner */}
        <div id="Firstjobly_Bottom_BTF" className="my-10"></div>
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
