import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC26gkxY8efgfjtSl8RVQcKegs8aXa_V3o",
  authDomain: "react-native-app-ab3eb.firebaseapp.com",
  databaseURL: "<https://react-native-app-ab3eb.firebaseio.com>",
  projectId: "react-native-app-ab3eb",
  storageBucket: "gs://react-native-app-ab3eb.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
