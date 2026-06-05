"use client";

import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/components/AuthProvider";
import SignOutButton from "@/components/SignOutButton";
import { LinkedInLogo, XLogo } from "@/components/icons";
import Link from "next/link";

function WorkspaceContent() {
  const { user } = useAuth();

  const displayName = user?.displayName ?? user?.email ?? "there";

  return (
    <main className="min-h-screen">
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/app" className="flex items-center gap-3">
            <LinkedInLogo className="w-7 h-7" />
            <XLogo className="w-5 h-5 text-black" />
            <span className="text-lg font-semibold tracking-tight">LinkedIn to X</span>
          </Link>
          <SignOutButton />
        </nav>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-sm text-black/50 mb-2">Workspace</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Welcome, {displayName}
        </h1>
        <p className="mt-4 text-lg text-black/55 leading-relaxed">
          Paste a LinkedIn post below and we&apos;ll turn it into an X-native thread.
        </p>

        <div className="mt-10 rounded-2xl border border-black/8 bg-white p-6 md:p-8 shadow-sm">
          <label htmlFor="linkedin-input" className="block text-sm font-medium text-black/70 mb-3">
            LinkedIn post
          </label>
          <textarea
            id="linkedin-input"
            rows={8}
            placeholder="Paste your LinkedIn post here..."
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-relaxed text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 resize-y"
          />
          <button
            type="button"
            disabled
            className="mt-4 inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white opacity-50 cursor-not-allowed"
          >
            Generate X thread — coming soon
          </button>
        </div>
      </div>
    </main>
  );
}

export default function AppWorkspace() {
  return (
    <AuthGuard>
      <WorkspaceContent />
    </AuthGuard>
  );
}
