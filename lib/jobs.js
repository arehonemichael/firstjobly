// lib/jobs.js

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const jobsCollection = collection(db, "jobs");

// === CACHING FOR SPEED ===
let cachedJobs = null;
let cacheTimestamp = null;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Helper: generate slug
function generateSlug(title = "", company = "") {
  const base = `${title.trim()} at ${company.trim()}`;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    || "job";
}

// Add job
export async function addJob(job) {
  const slug = generateSlug(job.title, job.company);
  await addDoc(jobsCollection, {
    ...job,
    slug,
    createdAt: serverTimestamp(),
  });
}

// Get all jobs — NOW WITH CACHING!
export async function getJobs() {
  if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION_MS) {
    return cachedJobs; // Instant return from cache
  }

  const q = query(jobsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  cachedJobs = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug,
      title: data.title,
      company: data.company,
      location: data.location,
      category: data.category,
      logo: data.logo,
      requirements: data.requirements,
      description: data.description,
      link: data.link,
      createdAt: data.createdAt?.toDate?.() || null,
    };
  });

  cacheTimestamp = Date.now();
  return cachedJobs;
}

// Get job by ID
export async function getJobById(id) {
  const jobRef = doc(db, "jobs", id);
  const jobSnap = await getDoc(jobRef);
  if (jobSnap.exists()) {
    const data = jobSnap.data();
    return {
      id: jobSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || null,
    };
  }
  return null;
}

// Get job by slug
export async function getJobBySlug(slug) {
  const q = query(jobsCollection, where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() || null,
  };
}

// Delete & Update (unchanged)
export async function deleteJob(id) {
  const jobRef = doc(db, "jobs", id);
  await deleteDoc(jobRef);
}

export async function updateJob(id, updatedData) {
  const jobRef = doc(db, "jobs", id);
  let updatePayload = { ...updatedData };

  if (updatedData.title || updatedData.company) {
    const currentSnap = await getDoc(jobRef);
    const currentData = currentSnap.data();
    const newTitle = updatedData.title || currentData.title;
    const newCompany = updatedData.company || currentData.company;
    updatePayload.slug = generateSlug(newTitle, newCompany);
  }

  await updateDoc(jobRef, updatePayload);
}