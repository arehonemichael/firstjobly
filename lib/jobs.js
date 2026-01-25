// lib/jobs.ts
import { cache } from "react";
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

// Helper: generate slug
function generateSlug(title = "", company = "") {
  const base = `${title.trim()} at ${company.trim()}`;
  return (
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-") || "job"
  );
}

/* ============================
   WRITE OPERATIONS (no cache)
   ============================ */

export async function addJob(job) {
  const slug = generateSlug(job.title, job.company);
  await addDoc(jobsCollection, {
    ...job,
    slug,
    createdAt: serverTimestamp(),
  });
}

export async function deleteJob(id) {
  await deleteDoc(doc(db, "jobs", id));
}

export async function updateJob(id, updatedData) {
  const jobRef = doc(db, "jobs", id);
  let updatePayload = { ...updatedData };

  if (updatedData.title || updatedData.company) {
    const currentSnap = await getDoc(jobRef);
    const currentData = currentSnap.data();
    updatePayload.slug = generateSlug(
      updatedData.title || currentData.title,
      updatedData.company || currentData.company
    );
  }

  await updateDoc(jobRef, updatePayload);
}

/* ============================
   READ OPERATIONS (CACHED)
   ============================ */

/**
 * All jobs list
 * Cached per-request + ISR-safe
 */
export const getJobs = cache(async () => {
  const q = query(jobsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || null,
    };
  });
});

/**
 * Job by ID
 */
export const getJobById = cache(async (id) => {
  const jobSnap = await getDoc(doc(db, "jobs", id));
  if (!jobSnap.exists()) return null;

  const data = jobSnap.data();
  return {
    id: jobSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() || null,
  };
});

/**
 * Job by slug (🔥 BIG ONE 🔥)
 */
export const getJobBySlug = cache(async (slug) => {
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
});
