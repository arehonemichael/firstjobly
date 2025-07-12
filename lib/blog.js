import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const postsCollection = collection(db, "posts");

export async function addPost(post) {
  await addDoc(postsCollection, {
    ...post,
    createdAt: serverTimestamp(),
  });
}

export async function getPosts() {
  const q = query(postsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPostBySlug(slug) {
  const snapshot = await getDocs(postsCollection);
  const match = snapshot.docs.find((doc) => doc.data().slug === slug);
  return match ? { id: match.id, ...match.data() } : null;
}

export async function deletePost(id) {
  await deleteDoc(doc(db, "posts", id));
}
