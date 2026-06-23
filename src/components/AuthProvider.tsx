"use client";

import { DEV_MOCK_USER, isLocalDevBypass } from "@/lib/devAuth";
import { formatAuthError, normalizeRedirectPath } from "@/lib/firebase/authErrors";
import { getClientAuth, isFirebaseConfigured } from "@/lib/firebase/client";
import { upsertUserProfile } from "@/lib/firebase/users";
import { getRedirectResult, onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isDevBypass: boolean;
  firebaseReady: boolean;
  authError: string | null;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isDevBypass: false,
  firebaseReady: false,
  authError: null,
});

function redirectAfterLogin() {
  const stored = sessionStorage.getItem("auth_redirect_next");
  sessionStorage.removeItem("auth_redirect_next");
  const target = normalizeRedirectPath(stored, "/dashboard");
  window.location.replace(target);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDevBypass, setIsDevBypass] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const firebaseReady = isFirebaseConfigured();

  useEffect(() => {
    if (isLocalDevBypass()) {
      setIsDevBypass(true);
      setUser(DEV_MOCK_USER);
      setLoading(false);
      return;
    }

    if (!firebaseReady) {
      setLoading(false);
      return;
    }

    const auth = getClientAuth();
    let unsubscribe: (() => void) | undefined;
    let redirectHandled = false;

    async function initAuth() {
      try {
        await getRedirectResult(auth);
      } catch (err) {
        setAuthError(formatAuthError(err));
      }

      unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser);
        setLoading(false);

        if (nextUser) {
          upsertUserProfile(nextUser).catch((err) => {
            console.error("Failed to save user profile:", err);
          });

          if (
            !redirectHandled &&
            typeof window !== "undefined" &&
            window.location.pathname === "/login"
          ) {
            redirectHandled = true;
            redirectAfterLogin();
          }
        }
      });
    }

    initAuth();

    return () => {
      unsubscribe?.();
    };
  }, [firebaseReady]);

  return (
    <AuthContext.Provider value={{ user, loading, isDevBypass, firebaseReady, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
