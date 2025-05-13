import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const EVENTS_COLLECTION = 'events';

// Emit an event to Firestore
export const emitEvent = async (eventType: string, payload: any) => {
  try {
    await addDoc(collection(db, EVENTS_COLLECTION), {
      type: eventType,
      payload,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error emitting event:', error);
  }
};

// Listen for events from Firestore
export const listenToEvents = (callback: (event: any) => void) => {
  const unsubscribe = onSnapshot(collection(db, EVENTS_COLLECTION), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        callback(change.doc.data());
      }
    });
  });

  return unsubscribe;
};