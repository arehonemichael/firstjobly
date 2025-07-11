import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const jobsCollection = collection(db, "jobs");

export async function addJob(job) {
  await addDoc(jobsCollection, {
    ...job,
    createdAt: serverTimestamp(),
  });
}

export async function getJobs() {
  const q = query(jobsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getJobById(id) {
  const docRef = doc(db, "jobs", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}
