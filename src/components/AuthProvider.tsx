"use client";

import { DEV_MOCK_USER, isLocalDevBypass } from "@/lib/devAuth";
import { getClientAuth } from "@/lib/firebase/client";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isDevBypass: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isDevBypass: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDevBypass, setIsDevBypass] = useState(false);

  useEffect(() => {
    if (isLocalDevBypass()) {
      setIsDevBypass(true);
      setUser(DEV_MOCK_USER);
      setLoading(false);
      return;
    }

    return onAuthStateChanged(getClientAuth(), (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isDevBypass }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
