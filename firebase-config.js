// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let firebaseConfig;
try {
  const res = await fetch("/__/firebase/init.json");
  if (res.ok) {
    firebaseConfig = await res.json();
  }
} catch (e) {
  console.warn("Could not fetch /__/firebase/init.json, using fallback", e);
}

if (!firebaseConfig) {
  firebaseConfig = {
    apiKey: "AIzaSyDemoDummyKey",
    authDomain: "device-streaming-582d897f.firebaseapp.com",
    projectId: "device-streaming-582d897f",
    storageBucket: "device-streaming-582d897f.appspot.com",
  };
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
