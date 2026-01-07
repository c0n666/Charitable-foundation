// Utility functions for Firestore data conversion
import { Timestamp } from 'firebase-admin/firestore'

/**
 * Convert Firestore document to plain object with ISO date strings
 */
export function convertFirestoreDoc(doc) {
  if (!doc || !doc.exists) return null
  
  const data = { id: doc.id, ...doc.data() }
  
  // Convert Firestore Timestamps to ISO strings
  Object.keys(data).forEach(key => {
    const value = data[key]
    if (value instanceof Timestamp) {
      // Firestore Timestamp
      data[key] = value.toDate().toISOString()
    } else if (value && typeof value === 'object' && value.toDate) {
      // Alternative Timestamp format
      data[key] = value.toDate().toISOString()
    } else if (value && typeof value === 'object' && value.toNumber) {
      // Firestore Number
      data[key] = value.toNumber()
    }
  })
  
  return data
}

/**
 * Convert array of Firestore documents
 */
export function convertFirestoreDocs(docs) {
  return docs.map(doc => {
    const data = { id: doc.id, ...doc.data() }
    
    // Convert Firestore Timestamps to ISO strings
    Object.keys(data).forEach(key => {
      const value = data[key]
      if (value instanceof Timestamp) {
        data[key] = value.toDate().toISOString()
      } else if (value && typeof value === 'object' && value.toDate) {
        data[key] = value.toDate().toISOString()
      } else if (value && typeof value === 'object' && value.toNumber) {
        data[key] = value.toNumber()
      }
    })
    
    return data
  })
}

