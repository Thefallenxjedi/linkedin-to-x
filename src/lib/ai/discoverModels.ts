import { parseProviderError } from "@/lib/ai/errors";
import type { AiProvider, DiscoveredModel } from "@/lib/ai/types";

export async function discoverModels(
  provider: AiProvider,
  apiKey: string
): Promise<DiscoveredModel[]> {
  switch (provider) {
    case "gemini":
      return discoverGeminiModels(apiKey);
    case "openai":
      return discoverOpenAiModels(apiKey);
    case "openrouter":
      return discoverOpenRouterModels(apiKey);
    case "anthropic":
      return discoverAnthropicModels(apiKey);
    default:
      throw new Error("Unsupported provider");
  }
}

async function discoverGeminiModels(apiKey: string): Promise<DiscoveredModel[]> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`
  );

  if (!res.ok) {
    throw new Error(parseProviderError("Gemini", await res.text()));
  }

  const data = (await res.json()) as {
    models?: Array<{
      name?: string;
      displayName?: string;
      supportedGenerationMethods?: string[];
    }>;
  };

  const models = (data.models ?? [])
    .filter((m) => {
      const methods = m.supportedGenerationMethods ?? [];
      return methods.includes("generateContent");
    })
    .map((m) => {
      const id = (m.name ?? "").replace(/^models\//, "");
      return { id, label: m.displayName?.trim() || id };
    })
    .filter((m) => m.id.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  if (models.length === 0) {
    throw new Error("Gemini: No compatible text generation models found for this API key.");
  }

  return models;
}

async function discoverOpenAiModels(apiKey: string): Promise<DiscoveredModel[]> {
  const res = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(parseProviderError("OpenAI", await res.text()));
  }

  const data = (await res.json()) as { data?: Array<{ id?: string }> };

  const models = (data.data ?? [])
    .map((m) => m.id ?? "")
    .filter(isOpenAiChatModel)
    .map((id) => ({ id, label: id }))
    .sort((a, b) => a.label.localeCompare(b.label));

  if (models.length === 0) {
    throw new Error("OpenAI: No compatible chat models found for this API key.");
  }

  return models;
}

function isOpenAiChatModel(id: string): boolean {
  if (!id) return false;
  const lower = id.toLowerCase();
  if (
    lower.includes("embedding") ||
    lower.includes("whisper") ||
    lower.includes("tts") ||
    lower.includes("dall-e") ||
    lower.includes("davinci") ||
    lower.includes("babbage") ||
    lower.includes("moderation") ||
    lower.includes("transcribe") ||
    lower.includes("realtime") ||
    lower.includes("audio")
  ) {
    return false;
  }
  return /^(gpt-|o\d|chatgpt)/i.test(id);
}

async function discoverOpenRouterModels(apiKey: string): Promise<DiscoveredModel[]> {
  const res = await fetch("https://openrouter.ai/api/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(parseProviderError("OpenRouter", await res.text()));
  }

  const data = (await res.json()) as {
    data?: Array<{
      id?: string;
      name?: string;
      architecture?: { output_modalities?: string[]; instruct_type?: string | null };
    }>;
  };

  const models = (data.data ?? [])
    .filter((m) => {
      const outputs = m.architecture?.output_modalities ?? [];
      return outputs.length === 0 || outputs.includes("text");
    })
    .map((m) => ({
      id: m.id ?? "",
      label: m.name?.trim() || m.id || "",
    }))
    .filter((m) => m.id.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  if (models.length === 0) {
    throw new Error("OpenRouter: No compatible text models found for this API key.");
  }

  return models;
}

async function discoverAnthropicModels(apiKey: string): Promise<DiscoveredModel[]> {
  const res = await fetch("https://api.anthropic.com/v1/models", {
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
  });

  if (!res.ok) {
    throw new Error(parseProviderError("Anthropic", await res.text()));
  }

  const data = (await res.json()) as {
    data?: Array<{ id?: string; display_name?: string; type?: string }>;
  };

  const models = (data.data ?? [])
    .filter((m) => !m.type || m.type === "model")
    .map((m) => ({
      id: m.id ?? "",
      label: m.display_name?.trim() || m.id || "",
    }))
    .filter((m) => m.id.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  if (models.length === 0) {
    throw new Error("Anthropic: No compatible models found for this API key.");
  }

  return models;
}
