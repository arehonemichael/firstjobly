import { getJobs } from "../../lib/jobs"; // adjust if path differs

export async function GET() {
  const baseUrl = "https://firstjobly.co.za";
  const jobs = await getJobs();

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

  const jobUrls = jobs.map((job) => {
    return `${baseUrl}/jobs/${job.id}`;
  });

  const allUrls = [...staticUrls, ...jobUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
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
