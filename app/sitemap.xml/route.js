import { getJobs } from "../../lib/jobs";
import { getPosts } from "../../lib/blog";

export async function GET() {
  const baseUrl = "https://firstjobly.co.za";
  const jobs = await getJobs();
  const posts = await getPosts(); // Fetch blog posts from Firestore

  const staticUrls = [
    `${baseUrl}/`,
    `${baseUrl}/jobs`,
    `${baseUrl}/blog`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/privacy-policy`,
    `${baseUrl}/terms-of-use`,
    `${baseUrl}/cookie-policy`,
  ];

  const jobUrls = jobs.map((job) => `${baseUrl}/jobs/${job.id}`);
  const blogUrls = Array.from(new Set(posts.map((post) => post.slug))).map((slug) =>
    `${baseUrl}/blog/${slug}`
  );

  const allUrls = [...staticUrls, ...jobUrls, ...blogUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map((url) => {
        let lastmod = new Date().toISOString(); // Default for static pages
        if (url.startsWith(`${baseUrl}/jobs/`)) {
          const job = jobs.find((j) => `${baseUrl}/jobs/${j.id}` === url);
          if (job?.createdAt) lastmod = job.createdAt.toDate().toISOString();
        } else if (url.startsWith(`${baseUrl}/blog/`)) {
          const post = posts.find((p) => `${baseUrl}/blog/${p.slug}` === url);
          if (post?.createdAt) lastmod = post.createdAt.toDate().toISOString();
        }
        return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      })
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}