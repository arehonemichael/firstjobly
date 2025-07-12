// lib/posts.js
import { db } from "./firebaseConfig";
import { collection, getDocs, query, orderBy, getDoc, doc } from "firebase/firestore";

export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPostBySlug(slug) {
  const snapshot = await getDocs(collection(db, "posts"));
  const match = snapshot.docs.find((doc) => doc.data().slug === slug);
  if (match) return { id: match.id, ...match.data() };
  return null;
}
