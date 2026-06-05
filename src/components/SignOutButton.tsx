"use client";

import { useAuth } from "@/components/AuthProvider";
import { getClientAuth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const { isDevBypass } = useAuth();

  async function handleSignOut() {
    if (isDevBypass) {
      router.push("/dashboard");
      return;
    }

    await signOut(getClientAuth());
    router.push("/login");
    router.refresh();
  }

  if (isDevBypass) {
    return (
      <span className="text-xs text-black/40 font-mono">dev mode</span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-sm text-black/60 hover:text-black transition-colors"
    >
      Sign out
    </button>
  );
}
