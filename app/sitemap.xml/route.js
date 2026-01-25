// app/sitemap.xml/route.js
// Dynamic sitemap using route handler (avoids build-time errors)

import { NextResponse } from 'next/server';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const baseUrl = "https://firstjobly.co.za";

  // Static pages
  const staticPages = [
    { url: baseUrl, lastmod: new Date().toISOString(), priority: 1.0 },
    { url: `${baseUrl}/jobs`, lastmod: new Date().toISOString(), priority: 0.9 },
    { url: `${baseUrl}/blog`, lastmod: new Date().toISOString(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastmod: new Date().toISOString(), priority: 0.5 },
    { url: `${baseUrl}/contact`, lastmod: new Date().toISOString(), priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastmod: new Date().toISOString(), priority: 0.4 },
    { url: `${baseUrl}/terms-of-use`, lastmod: new Date().toISOString(), priority: 0.4 },
    { url: `${baseUrl}/cookie-policy`, lastmod: new Date().toISOString(), priority: 0.4 },
  ];

  let jobPages = [];
  let blogPages = [];

  try {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDF9ZnoPNrxpkjJ1LyoGpJtATtFlySXfEs",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "firstjobly-web.firebaseapp.com",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "firstjobly-web",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "firstjobly-web.firebasestorage.app",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "317321164448",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:317321164448:web:919b00a784fad102c8fbc5"
    };

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    // Fetch jobs
    const jobsCollection = collection(db, "jobs");
    const jobsSnapshot = await getDocs(query(jobsCollection, orderBy("createdAt", "desc")));
    
    jobPages = jobsSnapshot.docs.map((doc) => {
      const data = doc.data();
      let date;
      if (data.createdAt && typeof data.createdAt.toDate === "function") {
        date = data.createdAt.toDate();
      } else {
        date = data.createdAt ? new Date(data.createdAt) : new Date();
      }

      return {
        url: `${baseUrl}/jobs/${data.slug}`,
        lastmod: date.toISOString(),
        priority: 0.8,
      };
    });

    // Fetch blog posts
    const postsCollection = collection(db, "posts");
    const postsSnapshot = await getDocs(query(postsCollection, orderBy("createdAt", "desc")));
    
    blogPages = postsSnapshot.docs.map((doc) => {
      const data = doc.data();
      let date;
      if (data.createdAt && typeof data.createdAt.toDate === "function") {
        date = data.createdAt.toDate();
      } else {
        date = data.createdAt ? new Date(data.createdAt) : new Date();
      }

      return {
        url: `${baseUrl}/blog/${data.slug}`,
        lastmod: date.toISOString(),
        priority: 0.7,
      };
    });

  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  // Combine all pages
  const allPages = [...staticPages, ...jobPages, ...blogPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}