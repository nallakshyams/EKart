import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoL5B-1WGypDWuZd7b9xi4SkpHooA_oDA",
  authDomain: "ecomsample-c7865.firebaseapp.com",
  projectId: "ecomsample-c7865",
  storageBucket: "ecomsample-c7865.appspot.com",
  messagingSenderId: "1094994421009",
  appId: "1:1094994421009:web:1802ef4c4ec4dda00598b0",
  measurementId: "G-N7MN7GWKPE",
};
const appl = initializeApp(firebaseConfig);
const auth = getAuth(appl);

// Initialize Firebase
export default auth;
