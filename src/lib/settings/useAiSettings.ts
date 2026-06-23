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

  const hasKey = Boolean(settings?.apiKey?.trim() && settings?.model?.trim());

  return { settings, hasKey, ready, refresh, userId };
}

export const PROVIDER_LABELS: Record<AiProvider, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  gemini: "Gemini",
};

export const PROVIDER_MODEL_PLACEHOLDER: Record<AiProvider, string> = {
  openai: "e.g. gpt-4o-mini",
  anthropic: "e.g. claude-3-5-haiku-latest",
  gemini: "e.g. gemini-1.5-flash",
};
