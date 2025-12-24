// scripts/backfill-slugs.js
import { db } from "../lib/firebaseConfig.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,                 // ← THIS WAS MISSING!
} from "firebase/firestore";

const jobsCollection = collection(db, "jobs");

function generateSlug(title = "", company = "") {
  const base = `${title.trim()} at ${company.trim()}`;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    || "job";
}

async function backfillSlugs() {
  console.log("Fetching all jobs...");
  const snapshot = await getDocs(jobsCollection);
  const jobs = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));

  console.log(`Found ${jobs.length} jobs. Generating unique slugs...`);

  // Map to track which slugs are already used
  const usedSlugs = new Set();

  for (const job of jobs) {
    const { title = "Job", company = "Unknown Company" } = job.data;

    let baseSlug = generateSlug(title, company);

    // Make it unique if needed
    let slug = baseSlug;
    let counter = 1;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Fallback: if still somehow empty, use part of ID
    if (!slug || slug === "job") {
      slug = `job-${job.id.slice(-8)}`;
    }

    usedSlugs.add(slug);

    // Update Firestore document if it doesn't already have a slug
    const jobRef = doc(db, "jobs", job.id);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.data()?.slug) {
      await updateDoc(jobRef, { slug });
      console.log(`✅ Added slug: ${slug}`);
    } else {
      console.log(`⏭️  Already has slug: ${jobSnap.data().slug}`);
    }
  }

  console.log("\n🎉 Backfill complete! All jobs now have unique SEO-friendly slugs.");
  console.log(`Total unique slugs created: ${usedSlugs.size}`);
}

backfillSlugs().catch(err => {
  console.error("❌ Error during backfill:", err);
});