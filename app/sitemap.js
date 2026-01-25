// app/sitemap.js
// Unified sitemap with static pages, jobs, and blogs

import { getJobs } from "../lib/jobs";
import { getPosts } from "../lib/blog";

export default async function sitemap() {
  const baseUrl = "https://firstjobly.co.za";

  // ========== STATIC PAGES ==========
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // ========== JOB POSTS (DYNAMIC FROM FIRESTORE) ==========
  let jobPosts = [];
  try {
    const jobs = await getJobs();
    
    jobPosts = jobs.map((job) => {
      // Normalize createdAt to JS Date
      let date;
      if (job.createdAt && typeof job.createdAt.toDate === "function") {
        date = job.createdAt.toDate(); // Firestore Timestamp
      } else {
        date = job.createdAt ? new Date(job.createdAt) : new Date();
      }

      return {
        url: `${baseUrl}/jobs/${job.slug}`,
        lastModified: date,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });
    
    console.log(`✅ Added ${jobPosts.length} job posts to sitemap`);
  } catch (error) {
    console.error("❌ Error fetching jobs for sitemap:", error);
  }

  // ========== BLOG POSTS (DYNAMIC FROM FIRESTORE) ==========
  let blogPosts = [];
  try {
    const posts = await getPosts();
    
    blogPosts = posts.map((post) => {
      // Normalize createdAt to JS Date
      let date;
      if (post.createdAt && typeof post.createdAt.toDate === "function") {
        date = post.createdAt.toDate(); // Firestore Timestamp
      } else {
        date = post.createdAt ? new Date(post.createdAt) : new Date();
      }

      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: date,
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
    
    console.log(`✅ Added ${blogPosts.length} blog posts to sitemap`);
  } catch (error) {
    console.error("❌ Error fetching blog posts for sitemap:", error);
  }

  // ========== COMBINE ALL ==========
  const allPages = [...staticPages, ...jobPosts, ...blogPosts];
  console.log(`✅ Total sitemap entries: ${allPages.length}`);
  
  return allPages;
}