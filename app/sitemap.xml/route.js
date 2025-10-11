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
  const blogUrls = posts.map((post) => `${baseUrl}/blog/${post.slug}`); // Use slug from Firestore

  const allUrls = [...staticUrls, ...jobUrls, ...blogUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (url) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod> <!-- Use post.createdAt for accuracy -->
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}