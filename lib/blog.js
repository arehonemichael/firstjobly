import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const postsCollection = collection(db, "posts");

// Get all blog posts
export async function getPosts() {
  const snapshot = await getDocs(query(postsCollection, orderBy("createdAt", "desc")));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || null,
    };
  });
}

// Get single post by slug
export async function getBlogBySlug(slug) {
  const snapshot = await getDocs(postsCollection);
  const match = snapshot.docs.find((doc) => doc.data().slug === slug);

  if (match) {
    const data = match.data();
    return {
      id: match.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || null,
    };
  }

  return null;
}

// Add new post
export async function addPost(post) {
  await addDoc(postsCollection, {
    ...post,
    createdAt: serverTimestamp(),
  });
}

// Delete post
export async function deletePost(id) {
  const postRef = doc(db, "posts", id);
  await deleteDoc(postRef);
}
