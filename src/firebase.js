import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuiRgcJIxobXLwVl3WMfKYyf6HJqp4zdk",
  authDomain: "leafautos.firebaseapp.com",
  databaseURL: "https://leafautos-default-rtdb.firebaseio.com",
  projectId: "leafautos",
  storageBucket: "leafautos.appspot.com",
  messagingSenderId: "153004085578",
  appId: "1:153004085578:web:cf3e6ff7efdda7905f71b3",
  measurementId: "G-KPSQQLTRT8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of cities from your database
export async function getVehicles() {
  const vehiclesCol = collection(db, "vehicles");
  const q = query(vehiclesCol, where("isPublic", "==", true));
  const vehicleSnapshot = await getDocs(q);
  const vehicleList = vehicleSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vehicleList;
}
