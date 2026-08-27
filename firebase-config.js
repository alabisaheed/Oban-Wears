// Firebase Realtime Database Cloud Sync Configuration for Oban Wears
const FIREBASE_DATABASE_URL = "https://oban-wears-default-rtdb.firebaseio.com";

if (typeof window !== "undefined") {
  window.FIREBASE_DATABASE_URL = FIREBASE_DATABASE_URL;
}
