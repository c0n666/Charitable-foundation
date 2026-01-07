import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyHGBZcPbajJRgFr0NZpCFydxkzDYt8OQ",
  authDomain: "charity-fund-ae1bd.firebaseapp.com",
  projectId: "charity-fund-ae1bd",
  storageBucket: "charity-fund-ae1bd.firebasestorage.app",
  messagingSenderId: "480392148752",
  appId: "1:480392148752:web:1ec21f87fb5184d6d95795",
  measurementId: "G-G5TLSTV8EL"
}

// Initialize Firebase Admin SDK
let app
if (getApps().length === 0) {
  // Try to use Service Account key file if available
  const serviceAccountPath = join(__dirname, 'serviceAccountKey.json')
  
  if (fs.existsSync(serviceAccountPath)) {
    // Use Service Account (recommended for production and real Firestore)
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
    app = initializeApp({
      credential: cert(serviceAccount),
      projectId: firebaseConfig.projectId,
    })
    console.log('Firebase initialized with Service Account')
  } else {
    // Fallback: Use project ID (works with Firebase Emulator or Application Default Credentials)
    app = initializeApp({
      projectId: firebaseConfig.projectId,
    })
    console.log('Firebase initialized with Project ID (using Application Default Credentials or Emulator)')
    console.log('⚠️  For production, create Service Account and save as backend/config/serviceAccountKey.json')
  }
} else {
  app = getApps()[0]
}

// Get Firestore instance
const db = getFirestore(app)

export { db, app, firebaseConfig }
export default db

