"use client";

import { normalizeRedirectPath } from "@/lib/firebase/authErrors";
import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";

export default function LoginRedirect({ next = "/dashboard" }: { next?: string }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      const stored =
        typeof window !== "undefined" ? sessionStorage.getItem("auth_redirect_next") : null;
      if (stored) {
        sessionStorage.removeItem("auth_redirect_next");
      }
      const target = normalizeRedirectPath(stored ?? next);
      window.location.replace(target);
    }
  }, [user, loading, next]);

  return null;
}
