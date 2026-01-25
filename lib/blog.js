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

// ========== CACHING SYSTEM ==========
// Simple in-memory cache to reduce Firestore reads
let postsCache = null;
let postsCacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute cache

// Cache for individual posts
const postCache = new Map();

// ========== GET ALL POSTS (WITH CACHING) ==========
export async function getPosts() {
  const now = Date.now();
  
  // Return cached data if still fresh (less than 1 minute old)
  if (postsCache && (now - postsCacheTime) < CACHE_DURATION) {
    console.log("✅ Returning cached posts");
    return postsCache;
  }

  console.log("🔄 Fetching posts from Firestore...");
  
  const snapshot = await getDocs(
    query(postsCollection, orderBy("createdAt", "desc"))
  );
  
  const posts = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || null,
    };
  });

  // Update cache
  postsCache = posts;
  postsCacheTime = now;

  console.log(`✅ Cached ${posts.length} posts`);
  
  return posts;
}

// ========== GET SINGLE POST BY SLUG (WITH CACHING) ==========
export async function getBlogBySlug(slug) {
  // Check cache first
  if (postCache.has(slug)) {
    const cached = postCache.get(slug);
    if (Date.now() - cached.time < CACHE_DURATION) {
      console.log(`✅ Returning cached post: ${slug}`);
      return cached.post;
    }
  }

  console.log(`🔄 Fetching post from Firestore: ${slug}`);

  const snapshot = await getDocs(postsCollection);
  const match = snapshot.docs.find((doc) => doc.data().slug === slug);

  if (match) {
    const data = match.data();
    const post = {
      id: match.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || null,
    };

    // Cache the post
    postCache.set(slug, { post, time: Date.now() });
    console.log(`✅ Cached post: ${slug}`);

    return post;
  }

  return null;
}

// ========== ADD NEW POST (CLEARS CACHE) ==========
export async function addPost(post) {
  console.log("➕ Adding new post...");
  
  await addDoc(postsCollection, {
    ...post,
    createdAt: serverTimestamp(),
  });
  
  // Clear cache so new post appears immediately
  postsCache = null;
  postCache.clear();
  
  console.log("✅ Post added and cache cleared");
}

// ========== DELETE POST (CLEARS CACHE) ==========
export async function deletePost(id) {
  console.log(`🗑️ Deleting post: ${id}`);
  
  const postRef = doc(db, "posts", id);
  await deleteDoc(postRef);
  
  // Clear cache so deleted post disappears immediately
  postsCache = null;
  postCache.clear();
  
  console.log("✅ Post deleted and cache cleared");
}