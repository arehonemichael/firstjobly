// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';
import { getJobsListing } from '../../../lib/jobs';
import { getPosts } from '../../../lib/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const baseUrl = "https://firstjobly.co.za";

  // Static pages with accurate changefreq per page type
  const staticPages = [
    { url: baseUrl,                          lastmod: new Date().toISOString(), priority: 1.0, changefreq: "daily"   },
    { url: `${baseUrl}/jobs`,                lastmod: new Date().toISOString(), priority: 0.9, changefreq: "daily"   },
    { url: `${baseUrl}/blog`,                lastmod: new Date().toISOString(), priority: 0.9, changefreq: "daily"   },
    { url: `${baseUrl}/about`,               lastmod: new Date().toISOString(), priority: 0.5, changefreq: "monthly" },
    { url: `${baseUrl}/contact`,             lastmod: new Date().toISOString(), priority: 0.5, changefreq: "monthly" },
    { url: `${baseUrl}/privacy-policy`,      lastmod: new Date().toISOString(), priority: 0.4, changefreq: "monthly" },
    { url: `${baseUrl}/terms-of-use`,        lastmod: new Date().toISOString(), priority: 0.4, changefreq: "monthly" },
    { url: `${baseUrl}/cookie-policy`,       lastmod: new Date().toISOString(), priority: 0.4, changefreq: "monthly" },
  ];

  let jobPages = [];
  let blogPages = [];

  try {
    // Use existing lib functions — no Firebase reinitialisation, no hardcoded keys
    const jobs = await getJobsListing();
    jobPages = jobs.map((job) => ({
      url: `${baseUrl}/jobs/${job.slug}`,
      lastmod: job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily", // Jobs change/expire frequently
    }));
  } catch {
    // Silent fail — sitemap still returns static pages
  }

  try {
    const posts = await getPosts();
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
      priority: 0.9, // Fixed: blog higher than jobs — drives Discover traffic
      changefreq: "daily",
    }));
  } catch {
    // Silent fail — sitemap still returns static + job pages
  }

  const allPages = [...staticPages, ...jobPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}