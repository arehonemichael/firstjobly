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
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Reference to the "jobs" collection
const jobsCollection = collection(db, "jobs");

// Add a new job
export async function addJob(job) {
  await addDoc(jobsCollection, {
    ...job,
    createdAt: serverTimestamp(),
  });
}

// Get all jobs
export async function getJobs() {
  const q = query(jobsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get a single job by ID
export async function getJobById(id) {
  const jobRef = doc(db, "jobs", id);
  const jobSnap = await getDoc(jobRef);
  if (jobSnap.exists()) {
    return { id: jobSnap.id, ...jobSnap.data() };
  }
  return null;
}

// Delete a job
export async function deleteJob(id) {
  const jobRef = doc(db, "jobs", id);
  await deleteDoc(jobRef);
}
