import { getBlogBySlug } from "../../../lib/blog";
import Image from "next/image";
import AdSlot from "../../../components/AdSlot";

export const revalidate = 3600;

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
  const isStyledPost = optimizedContent && (
    optimizedContent.includes("article-wrap") ||
    optimizedContent.includes("re-article") ||
    optimizedContent.includes("fj-article")
  );
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
      <div className="w-full max-w-3xl p-6">
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
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 800px"
              className="object-cover"
              priority={true}
              quality={75}
              unoptimized
            />
          </div>
        )}

        <div className="my-6">
          <AdSlot />
        </div>

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
                    {shouldShowAd && (
                      <div className="my-6">
                        <AdSlot type="inArticle" />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div dangerouslySetInnerHTML={{ __html: optimizedContent || "" }} />
            )}
          </article>
        )}

        {!isStyledPost && finalChunks.length > 6 && (
          <div className="my-8">
            <AdSlot type="native" />
          </div>
        )}

        {/* Google Follow button - lets readers follow FirstJobly directly in Discover */}
        <div className="my-8 flex justify-center">
          <a
            href="https://www.google.com/preferences/source?q=https://firstjobly.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-500 hover:shadow-sm transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Follow FirstJobly on Google
          </a>
        </div>

        <div className="my-10">
          <AdSlot type="multiplex" />
        </div>
      </div>

      <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, image: absoluteImageUrl ? [absoluteImageUrl] : [], author: { "@type": "Organization", name: "FirstJobly" }, publisher: { "@type": "Organization", name: "FirstJobly", logo: { "@type": "ImageObject", url: "https://firstjobly.co.za/logo.png" } }, datePublished: post.createdAt, description: post.description || "", mainEntityOfPage: { "@type": "WebPage", "@id": `https://firstjobly.co.za/blog/${slug}` } }) }} />
    </>
  );
}
