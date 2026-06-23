export function normalizeRedirectPath(
  path: string | null | undefined,
  fallback = "/dashboard"
): string {
  if (!path) return fallback;

  const trimmed = path.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed.split("?")[0]?.split("#")[0] || fallback;
  }

  const withoutSlashes = trimmed.replace(/^\/+/, "");
  return `/${withoutSlashes.split("?")[0]?.split("#")[0] || fallback}`;
}

export function formatAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code;
  const message = (err as { message?: string })?.message;

  if (code === "auth/unauthorized-domain") {
    return "This site domain is not authorized in Firebase. Add linkedin-to-x.vercel.app under Authentication → Settings → Authorized domains.";
  }
  if (code === "auth/operation-not-allowed") {
    return "Google sign-in is not enabled. Enable it in Firebase → Authentication → Sign-in method → Google.";
  }
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
    return "Sign in was cancelled.";
  }
  if (code === "auth/popup-blocked") {
    return "Sign in popup was blocked. Allow popups for this site and try again.";
  }
  if (message?.includes("redirect_uri_mismatch")) {
    return "Google OAuth redirect is not configured. In Google Cloud Console, add https://linkedin-to-x.vercel.app/__/auth/handler to Authorized redirect URIs.";
  }

  return message ?? "Sign in failed. Please try again.";
}

export function shouldUseGoogleRedirect(): boolean {
  if (typeof window === "undefined") return true;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}
