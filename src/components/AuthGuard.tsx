"use client";

import { useAuth } from "@/components/AuthProvider";
import { isLocalDevBypass } from "@/lib/devAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isDevBypass, firebaseReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLocalDevBypass() || isDevBypass) return;
    if (!firebaseReady) return;
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, isDevBypass, firebaseReady, router]);

  if (isLocalDevBypass() || isDevBypass) {
    return <>{children}</>;
  }

  if (!firebaseReady) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black/50">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black/50">
        Redirecting to login...
      </div>
    );
  }

  return <>{children}</>;
}
