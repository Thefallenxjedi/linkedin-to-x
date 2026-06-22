"use client";

import { DEV_MOCK_USER, isLocalDevBypass } from "@/lib/devAuth";
import { getClientAuth, isFirebaseConfigured } from "@/lib/firebase/client";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isDevBypass: boolean;
  firebaseReady: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isDevBypass: false,
  firebaseReady: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDevBypass, setIsDevBypass] = useState(false);
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

    try {
      return onAuthStateChanged(getClientAuth(), (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }
  }, [firebaseReady]);

  return (
    <AuthContext.Provider value={{ user, loading, isDevBypass, firebaseReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
