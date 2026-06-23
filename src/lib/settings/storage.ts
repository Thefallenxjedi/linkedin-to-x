import type { AiProvider } from "@/lib/ai/types";

export type AiSettings = {
  provider: AiProvider;
  apiKey: string;
  model: string;
};

const STORAGE_PREFIX = "linkedin-to-x-ai-settings";

function storageKey(userId: string): string {
  return `${STORAGE_PREFIX}-${userId}`;
}

export function loadAiSettings(userId: string): AiSettings | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AiSettings;
    if (!parsed.apiKey?.trim() || !parsed.model?.trim()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveAiSettings(userId: string, settings: AiSettings): void {
  localStorage.setItem(storageKey(userId), JSON.stringify(settings));
}

export function clearAiSettings(userId: string): void {
  localStorage.removeItem(storageKey(userId));
}

export function hasApiKey(userId: string): boolean {
  const settings = loadAiSettings(userId);
  return Boolean(settings?.apiKey?.trim() && settings?.model?.trim());
}

export function maskApiKey(key: string): string {
  if (key.length <= 8) return "••••••••";
  return `${key.slice(0, 4)}${"•".repeat(Math.min(20, key.length - 8))}${key.slice(-4)}`;
}
