"use client";

import { useAuth } from "@/components/AuthProvider";
import type { AiProvider } from "@/lib/ai/types";
import { loadAiSettings, type AiSettings } from "@/lib/settings/storage";
import { useCallback, useEffect, useState } from "react";

export function useAiSettings() {
  const { user } = useAuth();
  const userId = user?.uid ?? "anonymous";

  const [settings, setSettings] = useState<AiSettings | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setSettings(loadAiSettings(userId));
    setReady(true);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isConfigured = Boolean(
    settings?.apiKey?.trim() && settings?.model?.trim() && settings?.provider
  );

  return { settings, isConfigured, ready, refresh, userId };
}

export const PROVIDER_LABELS: Record<AiProvider, string> = {
  gemini: "Gemini",
  openai: "OpenAI",
  openrouter: "OpenRouter",
  anthropic: "Anthropic",
};

export const PROVIDERS: AiProvider[] = ["gemini", "openai", "openrouter", "anthropic"];
