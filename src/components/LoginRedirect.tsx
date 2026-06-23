"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginRedirect({ next = "/dashboard" }: { next?: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const stored =
        typeof window !== "undefined" ? sessionStorage.getItem("auth_redirect_next") : null;
      if (stored) {
        sessionStorage.removeItem("auth_redirect_next");
      }
      router.replace(stored || next);
    }
  }, [user, loading, next, router]);

  return null;
}
