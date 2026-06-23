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

  return message ?? "Sign in failed. Please try again.";
}

export function shouldUseGoogleRedirect(): boolean {
  if (typeof window === "undefined") return true;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}
