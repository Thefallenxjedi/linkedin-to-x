"use client";

import AuthGuard from "@/components/AuthGuard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import type { DiscoveredModel } from "@/lib/ai/types";
import { maskApiKey, saveAiSettings } from "@/lib/settings/storage";
import { PROVIDER_LABELS, PROVIDERS, useAiSettings } from "@/lib/settings/useAiSettings";
import type { AiProvider } from "@/lib/ai/types";
import { useEffect, useState } from "react";

type ConnectionState = "idle" | "testing" | "connected" | "error";

function SettingsContent() {
  const { settings, isConfigured, refresh, userId } = useAiSettings();

  const [provider, setProvider] = useState<AiProvider>(settings?.provider ?? "gemini");
  const [apiKey, setApiKey] = useState("");
  const [models, setModels] = useState<DiscoveredModel[]>([]);
  const [selectedModel, setSelectedModel] = useState(settings?.model ?? "");
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    isConfigured ? "connected" : "idle"
  );
  const [connectionMessage, setConnectionMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!settings) return;
    setProvider(settings.provider);
    setSelectedModel(settings.model);
    if (settings.model) {
      setModels([
        {
          id: settings.model,
          label: settings.modelLabel ?? settings.model,
        },
      ]);
      setConnectionState("connected");
    }
  }, [settings]);

  function resetConnection() {
    setModels([]);
    setSelectedModel("");
    setConnectionState("idle");
    setConnectionMessage(null);
    setError(null);
  }

  function handleProviderChange(next: AiProvider) {
    setProvider(next);
    resetConnection();
  }

  function handleApiKeyChange(value: string) {
    setApiKey(value);
    resetConnection();
  }

  async function handleTestConnection() {
    setError(null);
    setConnectionMessage(null);
    setSaved(false);

    const keyToTest = apiKey.trim() || settings?.apiKey;
    if (!keyToTest) {
      setError("Enter your API key before testing the connection.");
      setConnectionState("error");
      return;
    }

    setConnectionState("testing");

    try {
      const res = await fetch("/api/ai/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, apiKey: keyToTest }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Connection test failed.");
      }

      const discovered = data.models as DiscoveredModel[];
      setModels(discovered);
      setConnectionState("connected");
      setConnectionMessage(
        `Found ${discovered.length} compatible model${discovered.length === 1 ? "" : "s"}.`
      );

      const savedStillValid = discovered.some((m) => m.id === settings?.model);
      if (savedStillValid && settings?.model) {
        setSelectedModel(settings.model);
      } else if (discovered.length === 1) {
        setSelectedModel(discovered[0].id);
      } else {
        setSelectedModel("");
      }
    } catch (err) {
      setConnectionState("error");
      setModels([]);
      setSelectedModel("");
      setError(err instanceof Error ? err.message : "Connection test failed. Please try again.");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const keyToSave = apiKey.trim() || settings?.apiKey;
    if (!keyToSave) {
      setError("Please enter your API key.");
      return;
    }

    if (connectionState !== "connected" || models.length === 0) {
      setError("Test your connection and select a model before saving.");
      return;
    }

    if (!selectedModel) {
      setError("Please select a model from the list.");
      return;
    }

    const modelLabel = models.find((m) => m.id === selectedModel)?.label ?? selectedModel;

    setSaving(true);
    try {
      saveAiSettings(userId, {
        provider,
        apiKey: keyToSave,
        model: selectedModel,
        modelLabel,
      });
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

  const modelSelectDisabled = connectionState !== "connected" || models.length === 0;
  const canSave =
    connectionState === "connected" && models.length > 0 && Boolean(selectedModel) && !saving;

  return (
    <main className="min-h-screen bg-white">
      <DashboardHeader active="settings" />

      <div className="mx-auto max-w-xl px-6 py-10 md:py-16">
        <div className="mb-10">
          <p className="text-sm text-black/50 mb-2">Settings</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AI Configuration</h1>
          <p className="mt-3 text-black/55 leading-relaxed">
            Choose your AI provider, test your API key, and pick a model. Models are loaded
            automatically — you never need to type model IDs manually.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-black/8 bg-white p-6 md:p-8 shadow-sm space-y-6"
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
              <span className="font-medium text-black">Your API key stays in your browser.</span>{" "}
              It is only sent to your chosen provider when testing or generating content.
            </p>
          </div>

          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-black/70 mb-3">
              AI provider
            </label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => handleProviderChange(e.target.value as AiProvider)}
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40"
            >
              {PROVIDERS.map((p) => (
                <option key={p} value={p}>
                  {PROVIDER_LABELS[p]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-black/70 mb-3">
              API key
            </label>
            {isConfigured && !apiKey && (
              <p className="text-xs text-black/50 mb-2">
                Current key: {maskApiKey(settings!.apiKey)}
              </p>
            )}
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="Paste your API key"
              autoComplete="off"
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40 font-mono"
            />
            <p className="mt-2 text-xs text-black/40">
              {isConfigured
                ? "Leave blank to keep your existing key, or enter a new one to replace it."
                : "Enter your API key, then click Test Connection."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={connectionState === "testing"}
            className="w-full inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-6 py-3 text-sm font-medium text-black hover:bg-black/[0.03] transition-colors disabled:opacity-50"
          >
            {connectionState === "testing" ? "Testing connection..." : "Test Connection"}
          </button>

          {connectionMessage && connectionState === "connected" && (
            <p className="text-sm text-green-600">{connectionMessage}</p>
          )}

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-black/70 mb-3">
              Model
            </label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={modelSelectDisabled}
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {modelSelectDisabled ? "Test connection to load models" : "Select a model"}
              </option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-black/40">
              Models are fetched live from your provider. Re-test after changing your API key.
            </p>
          </div>

          {error && <p className="text-sm text-red-600 leading-relaxed">{error}</p>}
          {saved && (
            <p className="text-sm text-green-600">Settings saved. You can now generate content.</p>
          )}

          <button
            type="submit"
            disabled={!canSave}
            className="w-full inline-flex items-center justify-center rounded-lg bg-linkedin px-6 py-3.5 text-base font-medium text-white hover:bg-linkedin/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>

          {isConfigured && (
            <p className="text-center text-xs text-green-600 font-medium">
              ✓ {PROVIDER_LABELS[settings!.provider]} · {settings!.modelLabel ?? settings!.model}
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
