"use client";

import AuthGuard from "@/components/AuthGuard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  PROVIDER_LABELS,
  PROVIDER_MODEL_PLACEHOLDER,
  useAiSettings,
} from "@/lib/settings/useAiSettings";
import { maskApiKey, saveAiSettings } from "@/lib/settings/storage";
import type { AiProvider } from "@/lib/ai/types";
import { useState, useEffect } from "react";

function SettingsContent() {
  const { settings, hasKey, refresh, userId } = useAiSettings();

  const [provider, setProvider] = useState<AiProvider>(settings?.provider ?? "openai");
  const [model, setModel] = useState(settings?.model ?? "");
  const [apiKey, setApiKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (settings?.provider) setProvider(settings.provider);
    if (settings?.model) setModel(settings.model);
  }, [settings]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const keyToSave = apiKey.trim() || settings?.apiKey;
    const modelToSave = model.trim();
    if (!keyToSave) {
      setError("Please enter your API key.");
      return;
    }
    if (!modelToSave) {
      setError("Please enter a model name.");
      return;
    }

    setSaving(true);
    try {
      saveAiSettings(userId, { provider, apiKey: keyToSave, model: modelToSave });
      setApiKey("");
      refresh();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <DashboardHeader active="settings" />

      <div className="mx-auto max-w-xl px-6 py-10 md:py-16">
        <div className="mb-10">
          <p className="text-sm text-black/50 mb-2">Settings</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AI Configuration</h1>
          <p className="mt-3 text-black/55 leading-relaxed">
            Add your own API key to power conversions. Your key is stored locally in your browser
            and sent only to your chosen AI provider when generating content.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-black/8 bg-white p-6 md:p-8 shadow-sm space-y-8"
        >
          <div className="rounded-xl bg-linkedin/5 border border-linkedin/15 px-4 py-3 flex gap-3">
            <svg
              className="w-5 h-5 text-linkedin shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-sm text-black/70 leading-relaxed">
              <span className="font-medium text-black">Your API key is safe with us.</span>{" "}
              It never leaves your device except when calling your AI provider directly. We do not
              store it on our servers.
            </p>
          </div>

          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-black/70 mb-3">
              AI provider
            </label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value as AiProvider)}
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40"
            >
              {(Object.keys(PROVIDER_LABELS) as AiProvider[]).map((p) => (
                <option key={p} value={p}>
                  {PROVIDER_LABELS[p]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-black/70 mb-3">
              Model
            </label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder={PROVIDER_MODEL_PLACEHOLDER[provider]}
              autoComplete="off"
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40 font-mono"
            />
            <p className="mt-2 text-xs text-black/40">
              Use any model ID supported by your provider.
            </p>
          </div>

          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-black/70 mb-3">
              API key
            </label>
            {hasKey && !apiKey && (
              <p className="text-xs text-black/50 mb-2">
                Current key: {maskApiKey(settings!.apiKey)}
              </p>
            )}
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your API key"
              autoComplete="off"
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40 font-mono"
            />
            <p className="mt-2 text-xs text-black/40">
              {hasKey
                ? "Leave blank to keep your existing key, or enter a new one to replace it."
                : "Enter your API key from the provider dashboard to enable generation."}
            </p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {saved && (
            <p className="text-sm text-green-600">Settings saved. You can now generate content.</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center rounded-lg bg-linkedin px-6 py-3.5 text-base font-medium text-white hover:bg-linkedin/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save API Key"}
          </button>

          {hasKey && (
            <p className="text-center text-xs text-green-600 font-medium">
              ✓ {PROVIDER_LABELS[settings!.provider]} · {settings!.model} — generation enabled
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

export default function SettingsWorkspace() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  );
}
