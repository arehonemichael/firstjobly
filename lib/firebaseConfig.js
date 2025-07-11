// Placeholder - final tested working version of FirstJobly
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF9ZnoPNrxpkjJ1LyoGpJtATtFlySXfEs",
  authDomain: "firstjobly-web.firebaseapp.com",
  projectId: "firstjobly-web",
  storageBucket: "firstjobly-web.firebasestorage.app",
  messagingSenderId: "317321164448",
  appId: "1:317321164448:web:919b00a784fad102c8fbc5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
