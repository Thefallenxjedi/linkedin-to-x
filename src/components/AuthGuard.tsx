"use client";

import { useAuth } from "@/components/AuthProvider";
import { isLocalDevBypass } from "@/lib/devAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isDevBypass, firebaseReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLocalDevBypass() || isDevBypass) return;
    if (!firebaseReady) return;
    if (!loading && !user) {
      const next = pathname && pathname !== "/login" ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
    }
  }, [user, loading, isDevBypass, firebaseReady, router, pathname]);

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
