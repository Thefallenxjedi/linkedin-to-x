"use client";

import { useAuth } from "@/components/AuthProvider";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { LinkedInLogo, XLogo } from "@/components/icons";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import Link from "next/link";

export default function LoginForm({
  error: urlError,
  redirectTo,
}: {
  error?: string;
  redirectTo: string;
}) {
  const { loading, authError } = useAuth();
  const firebaseReady = isFirebaseConfigured();
  const error = urlError || authError;

  if (firebaseReady && loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-black/50">
        Completing sign in...
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <LinkedInLogo className="w-7 h-7" />
          <XLogo className="w-5 h-5 text-black" />
          <span className="text-lg font-semibold tracking-tight">LinkedIn to X</span>
        </Link>

        <div className="rounded-2xl border border-black/8 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-center">Welcome</h1>
          <p className="mt-2 text-sm text-black/50 text-center leading-relaxed">
            Sign in or create an account with Google to start transforming your LinkedIn posts.
          </p>

          {!firebaseReady && (
            <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center">
              Google sign-in is being configured. Contact support if this persists.
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600 text-center leading-relaxed">
              {error === "auth" ? "Sign in failed. Please try again." : error}
            </p>
          )}

          <div className="mt-8 space-y-3">
            <GoogleSignInButton label="Continue with Google" next={redirectTo} />
          </div>

          <p className="mt-6 text-xs text-black/40 text-center leading-relaxed">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-black/50">
          <Link href="/" className="hover:text-black transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
