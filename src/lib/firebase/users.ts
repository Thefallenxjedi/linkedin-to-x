import { getClientFirestore } from "@/lib/firebase/client";
import type { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export async function upsertUserProfile(user: User): Promise<void> {
  const db = getClientFirestore();
  const ref = doc(db, "users", user.uid);
  const existing = await getDoc(ref);

  await setDoc(
    ref,
    {
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      lastLoginAt: serverTimestamp(),
      ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  );
}
