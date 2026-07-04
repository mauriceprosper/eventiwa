// Firebase initialization — used by admin, portals, and any authenticated pages
// Credentials are public (this is expected for Firebase web apps)

// Import Firebase modules
// Note: In production, consider using Firebase SDK via NPM, but for vanilla JS we use the CDN

const firebaseConfig = {
  apiKey: "AIzaSyAWKR_TsQupbmX1TPGgzuQRe9q0p7dcmuQ",
  authDomain: "eventiwa.firebaseapp.com",
  projectId: "eventiwa",
  storageBucket: "eventiwa.firebasestorage.app",
  messagingSenderId: "191301819852",
  appId: "1:191301819852:web:f51ccdf237182a8b449169",
  measurementId: "G-QKBBRZWGY6"
};

// Initialize Firebase (called after Firebase SDK loads)
function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.warn("Firebase SDK not loaded yet");
    return false;
  }
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  window.auth = firebase.auth();
  window.storage = firebase.storage();
  return true;
}

// Helper functions for common Firestore operations
async function getCollection(collectionName) {
  try {
    const snap = await window.db.collection(collectionName).get();
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error(`Error fetching ${collectionName}:`, err);
    return [];
  }
}

async function addDocument(collectionName, data) {
  try {
    const docRef = await window.db.collection(collectionName).add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (err) {
    console.error(`Error adding to ${collectionName}:`, err);
    return null;
  }
}

async function updateDocument(collectionName, docId, data) {
  try {
    await window.db.collection(collectionName).doc(docId).update({
      ...data,
      updatedAt: new Date()
    });
    return true;
  } catch (err) {
    console.error(`Error updating ${collectionName}:`, err);
    return false;
  }
}

async function deleteDocument(collectionName, docId) {
  try {
    await window.db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (err) {
    console.error(`Error deleting from ${collectionName}:`, err);
    return false;
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeFirebase);
