// app/sitemap.js
// Server-safe sitemap generation

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

  let jobPosts = [];
  let blogPosts = [];

  // ========== SAFE FIREBASE IMPORTS (only on server) ==========
  try {
    // Import Firebase only during build (server-side)
    const { initializeApp, getApps } = await import("firebase/app");
    const { getFirestore, collection, getDocs, query, orderBy } = await import("firebase/firestore");

    // Initialize Firebase for server-side
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

    // ========== FETCH JOBS ==========
    try {
      const jobsCollection = collection(db, "jobs");
      const jobsSnapshot = await getDocs(query(jobsCollection, orderBy("createdAt", "desc")));
      
      jobPosts = jobsSnapshot.docs.map((doc) => {
        const data = doc.data();
        let date;
        if (data.createdAt && typeof data.createdAt.toDate === "function") {
          date = data.createdAt.toDate();
        } else {
          date = data.createdAt ? new Date(data.createdAt) : new Date();
        }

        return {
          url: `${baseUrl}/jobs/${data.slug}`,
          lastModified: date,
          changeFrequency: "weekly",
          priority: 0.8,
        };
      });

      console.log(`✅ Added ${jobPosts.length} job posts to sitemap`);
    } catch (error) {
      console.error("❌ Error fetching jobs:", error);
    }

    // ========== FETCH BLOG POSTS ==========
    try {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(query(postsCollection, orderBy("createdAt", "desc")));
      
      blogPosts = postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        let date;
        if (data.createdAt && typeof data.createdAt.toDate === "function") {
          date = data.createdAt.toDate();
        } else {
          date = data.createdAt ? new Date(data.createdAt) : new Date();
        }

        return {
          url: `${baseUrl}/blog/${data.slug}`,
          lastModified: date,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });

      console.log(`✅ Added ${blogPosts.length} blog posts to sitemap`);
    } catch (error) {
      console.error("❌ Error fetching blog posts:", error);
    }

  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
  }

  // ========== COMBINE ALL ==========
  const allPages = [...staticPages, ...jobPosts, ...blogPosts];
  console.log(`✅ Total sitemap entries: ${allPages.length}`);
  
  return allPages;
}