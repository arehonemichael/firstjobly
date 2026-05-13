import { getBlogBySlug } from "../../../lib/blog";
import Image from "next/image";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Blog Not Found" };
  const absoluteImageUrl = post.image && post.image.startsWith("/images/") ? `https://firstjobly.co.za${post.image}` : post.image;
  return {
    title: post.title,
    description: post.description || "",
    robots: "max-image-preview:large",
    openGraph: {
      title: post.title,
      description: post.description || "",
      type: "article",
      url: `https://firstjobly.co.za/blog/${slug}`,
      images: absoluteImageUrl ? [{ url: absoluteImageUrl, width: 1200, height: 630 }] : [],
    },
    alternates: { canonical: `https://firstjobly.co.za/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p>This post may have been removed or does not exist.</p>
      </div>
    );
  }

  const absoluteImageUrl = post.image && post.image.startsWith("/images/") ? `https://firstjobly.co.za${post.image}` : post.image;

  const optimizeContentImages = (content) => {
    if (!content) return "";
    return content.replace(/<img\s+([^>]*?)>/gi, (match) => {
      if (match.includes("loading=")) return match;
      return match.replace(/<img\s+/i, '<img loading="lazy" decoding="async" ');
    });
  };

  const optimizedContent = optimizeContentImages(post.content);
  const isStyledPost = optimizedContent && optimizedContent.includes("article-wrap");
  const AD_EVERY_N_CHUNKS = 6;
  const MAX_ADS = 4;

  const contentChunks = !isStyledPost && optimizedContent
    ? optimizedContent
        .split(/(<\/p>|<\/h[1-6]>|<\/div>|<\/li>|<\/blockquote>)/gi)
        .reduce((acc, item, index, array) => {
          if (index % 2 === 0 && array[index + 1]) acc.push(item + array[index + 1]);
          return acc;
        }, [])
        .filter((chunk) => chunk.trim())
    : [];

  const finalChunks = contentChunks.length > 0
    ? contentChunks
    : (!isStyledPost && optimizedContent)
    ? optimizedContent.split(/\n\n+/).filter((chunk) => chunk.trim())
    : [];

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        {!isStyledPost && (
          <>
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            {post.createdAt && (
              <p className="text-gray-500 text-sm mb-4">
                {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(post.createdAt))}
              </p>
            )}
          </>
        )}

        {post.image && (
          <div className="relative w-full h-96 mb-6 bg-gray-200 rounded overflow-hidden">
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 800px" className="object-cover" priority={true} quality={85} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI2UyZThmMCIvPjwvc3ZnPg==" />
          </div>
        )}

        <div id="Firstjobly_Incontent_Lazy" className="av-lazy my-6"></div>

        {isStyledPost ? (
          <div dangerouslySetInnerHTML={{ __html: optimizedContent }} />
        ) : (
          <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-img:mx-auto prose-img:max-w-full prose-img:h-auto">
            {finalChunks.length > 0 ? (
              finalChunks.map((chunk, idx) => {
                const chunkNumber = idx + 1;
                const shouldShowAd = chunkNumber % AD_EVERY_N_CHUNKS === 0 && chunkNumber < finalChunks.length && Math.floor(chunkNumber / AD_EVERY_N_CHUNKS) <= MAX_ADS;
                return (
                  <div key={idx}>
                    <div dangerouslySetInnerHTML={{ __html: chunk }} className="mb-4" />
                    {shouldShowAd && <div className="av-lazy my-6" parent-unit="Firstjobly_Incontent_Lazy"></div>}
                  </div>
                );
              })
            ) : (
              <div dangerouslySetInnerHTML={{ __html: optimizedContent || "" }} />
            )}
          </article>
        )}

        {!isStyledPost && finalChunks.length > 6 && <div className="av-lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>}
        <div className="av-lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>
        <div id="Firstjobly_Bottom_BTF" className="av-lazy my-10"></div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, image: absoluteImageUrl ? [absoluteImageUrl] : [], author: { "@type": "Organization", name: "FirstJobly" }, publisher: { "@type": "Organization", name: "FirstJobly", logo: { "@type": "ImageObject", url: "https://firstjobly.co.za/logo.png" } }, datePublished: post.createdAt, description: post.description || "", mainEntityOfPage: { "@type": "WebPage", "@id": `https://firstjobly.co.za/blog/${slug}` } }) }} />
    </>
  );
}
