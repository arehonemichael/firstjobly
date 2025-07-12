// lib/auth.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export function checkUser(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
