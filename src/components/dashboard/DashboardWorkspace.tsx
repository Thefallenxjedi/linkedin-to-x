"use client";

import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/components/AuthProvider";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GeneratedThreadPanel from "@/components/dashboard/GeneratedThreadPanel";
import ThreadLengthSelector from "@/components/dashboard/ThreadLengthSelector";
import { mockGenerateThread } from "@/lib/mockGenerateThread";
import { useState } from "react";

function WorkspaceContent() {
  const { user } = useAuth();
  const displayName = user?.displayName ?? user?.email ?? "there";

  const [linkedinPost, setLinkedinPost] = useState("");
  const [threadCount, setThreadCount] = useState(5);
  const [instructions, setInstructions] = useState("");
  const [result, setResult] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!linkedinPost.trim() || loading) return;

    setLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setResult(mockGenerateThread(threadCount));
    setLoading(false);
  }

  const canGenerate = linkedinPost.trim().length > 0 && !loading;

  return (
    <main className="min-h-screen bg-white">
      <DashboardHeader />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <div className="mb-10 md:mb-14">
          <p className="text-sm text-black/50 mb-2">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welcome, {displayName}
          </h1>
          <p className="mt-3 text-lg text-black/55 leading-relaxed max-w-2xl">
            Paste a LinkedIn post and generate an X-native thread in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Input panel */}
          <div className="rounded-2xl border border-black/8 bg-white p-6 md:p-8 shadow-sm space-y-8">
            <div>
              <label htmlFor="linkedin-post" className="block text-sm font-medium text-black/70 mb-3">
                LinkedIn post
              </label>
              <textarea
                id="linkedin-post"
                rows={10}
                value={linkedinPost}
                onChange={(e) => setLinkedinPost(e.target.value)}
                placeholder="Paste your LinkedIn post here..."
                className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-relaxed text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40 resize-y min-h-[200px]"
              />
            </div>

            <ThreadLengthSelector value={threadCount} onChange={setThreadCount} />

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-black/70 mb-3">
                Additional instructions
              </label>
              <textarea
                id="instructions"
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder={`Examples:\n\nMake it founder style\nMake it more controversial\nMake it concise\nAdd storytelling`}
                className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-relaxed text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40 resize-y"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-linkedin px-6 py-3.5 text-base font-medium text-white hover:bg-linkedin/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {loading ? "Generating..." : "Generate X Thread"}
            </button>
          </div>

          {/* Result panel */}
          <GeneratedThreadPanel result={result} loading={loading} />
        </div>
      </div>
    </main>
  );
}

export default function DashboardWorkspace() {
  return (
    <AuthGuard>
      <WorkspaceContent />
    </AuthGuard>
  );
}
