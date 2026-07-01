"use client";

import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/components/AuthProvider";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GeneratedThreadPanel from "@/components/dashboard/GeneratedThreadPanel";
import OutputFormatSelector from "@/components/dashboard/OutputFormatSelector";
import ThreadLengthSelector from "@/components/dashboard/ThreadLengthSelector";
import VoiceSelector from "@/components/dashboard/VoiceSelector";
import type { GenerationResult, OutputFormat } from "@/lib/ai/types";
import { useAiSettings } from "@/lib/settings/useAiSettings";
import Link from "next/link";
import { useState } from "react";

function WorkspaceContent() {
  const { user } = useAuth();
  const { settings, isConfigured, ready } = useAiSettings();
  const displayName = user?.displayName ?? user?.email ?? "there";

  const [linkedinPost, setLinkedinPost] = useState("");
  const [threadCount, setThreadCount] = useState(5);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("thread");
  const [voiceId, setVoiceId] = useState("founder");
  const [instructions, setInstructions] = useState("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!linkedinPost.trim() || loading || !settings?.apiKey || !settings?.model) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: settings.provider,
          apiKey: settings.apiKey,
          model: settings.model,
          customPrompt: settings.customPrompt,
          linkedinPost,
          outputFormat,
          threadCount,
          voiceId,
          instructions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Generation failed");
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canGenerate = linkedinPost.trim().length > 0 && !loading && isConfigured;

  return (
    <main className="min-h-screen bg-white">
      <DashboardHeader active="dashboard" />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <div className="mb-10 md:mb-14">
          <p className="text-sm text-black/50 mb-2">Converter</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welcome, {displayName}
          </h1>
          <p className="mt-3 text-lg text-black/55 leading-relaxed max-w-2xl">
            Paste a LinkedIn post and generate X-native content powered by your AI provider.
          </p>
        </div>

        {ready && !isConfigured && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-amber-900">
              Add your API key and select a model in Settings to start generating content.
            </p>
            <Link
              href="/settings"
              className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/85 transition-colors shrink-0"
            >
              Go to Settings
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
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

            <OutputFormatSelector value={outputFormat} onChange={setOutputFormat} />

            {outputFormat === "thread" && (
              <ThreadLengthSelector value={threadCount} onChange={setThreadCount} />
            )}

            <VoiceSelector value={voiceId} onChange={setVoiceId} />

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

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-linkedin px-6 py-3.5 text-base font-medium text-white hover:bg-linkedin/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <ButtonSpinner />}
              {loading ? "Generating..." : "Generate X Thread"}
            </button>

            {!isConfigured && (
              <p className="text-xs text-center text-black/40">
                Configure your provider and model in{" "}
                <Link href="/settings" className="text-linkedin hover:underline">
                  Settings
                </Link>{" "}
                to enable generation.
              </p>
            )}
          </div>

          <GeneratedThreadPanel result={result} loading={loading} />
        </div>
      </div>
    </main>
  );
}

function ButtonSpinner() {
  return (
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
  );
}

export default function DashboardWorkspace() {
  return (
    <AuthGuard>
      <WorkspaceContent />
    </AuthGuard>
  );
}
