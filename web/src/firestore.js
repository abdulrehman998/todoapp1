import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD3DzEJOLG6qrhjS3OWx37_RwcdQ4pR2MA",
  authDomain: "react-firestore-f3d87.firebaseapp.com",
  projectId: "react-firestore-f3d87",
  storageBucket: "react-firestore-f3d87.appspot.com",
  messagingSenderId: "656630436858",
  appId: "1:656630436858:web:ecf78eb13195414f4f4a43"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export const db = getFirestore();