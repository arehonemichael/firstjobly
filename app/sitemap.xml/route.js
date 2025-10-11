import { getJobs } from "../../lib/jobs";

export async function GET() {
  const jobs = await getJobs();

  // Normalize createdAt to JS Date
  const normalizedJobs = jobs.map((job) => {
    let date;
    if (job.createdAt && typeof job.createdAt.toDate === "function") {
      date = job.createdAt.toDate(); // Firestore Timestamp
    } else {
      date = job.createdAt ? new Date(job.createdAt) : new Date();
    }

    return {
      ...job,
      createdAt: date,
    };
  });

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${normalizedJobs
      .map(
        (job) => `
      <url>
        <loc>https://yourdomain.com/jobs/${job.slug}</loc>
        <lastmod>${job.createdAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
