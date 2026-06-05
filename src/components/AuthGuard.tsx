"use client";

import { isLocalDevBypass } from "@/lib/devAuth";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isDevBypass } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLocalDevBypass() || isDevBypass) return;
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, isDevBypass, router]);

  if (isLocalDevBypass() || isDevBypass) {
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
    return null;
  }

  return <>{children}</>;
}
