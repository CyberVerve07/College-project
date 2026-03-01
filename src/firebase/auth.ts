import { GoogleAuthProvider, TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeFirebase } from "./index";

export async function signInWithGoogle() {
  const { auth } = initializeFirebase();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

export async function signInWithTwitter() {
  const { auth } = initializeFirebase();
  const provider = new TwitterAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Twitter:", error);
    throw error;
  }
}

export async function logOut() {
  const { auth } = initializeFirebase();
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}
