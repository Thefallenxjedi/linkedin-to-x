import type { User } from "firebase/auth";

export const DEV_MOCK_USER = {
  uid: "dev-localhost",
  displayName: "Dev User",
  email: "dev@localhost",
} as User;

/** Skip Firebase auth on localhost during development. */
export function isLocalDevBypass(): boolean {
  if (process.env.NODE_ENV !== "development") return false;

  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === "true") return true;

  if (typeof window === "undefined") return false;

  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}
