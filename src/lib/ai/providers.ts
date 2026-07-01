import { parseProviderError } from "@/lib/ai/errors";
import type { AiProvider } from "./types";

export async function callAiProvider(
  provider: AiProvider,
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  switch (provider) {
    case "openai":
      return callOpenAiCompatible(
        "https://api.openai.com/v1/chat/completions",
        apiKey,
        model,
        systemPrompt,
        userPrompt,
        "OpenAI"
      );
    case "openrouter":
      return callOpenAiCompatible(
        "https://openrouter.ai/api/v1/chat/completions",
        apiKey,
        model,
        systemPrompt,
        userPrompt,
        "OpenRouter",
        {
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://linkedin-to-x.vercel.app",
          "X-Title": "LinkedIn to X",
        }
      );
    case "anthropic":
      return callAnthropic(apiKey, model, systemPrompt, userPrompt);
    case "gemini":
      return callGemini(apiKey, model, systemPrompt, userPrompt);
    default:
      throw new Error("Unsupported AI provider");
  }
}

async function callOpenAiCompatible(
  url: string,
  apiKey: string,
  model: string,
  system: string,
  user: string,
  providerLabel: string,
  extraHeaders?: Record<string, string>
): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    throw new Error(parseProviderError(providerLabel, await res.text()));
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function callAnthropic(
  apiKey: string,
  model: string,
  system: string,
  user: string
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    throw new Error(parseProviderError("Anthropic", await res.text()));
  }

  const data = await res.json();
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  return block?.text ?? "";
}

async function callGemini(
  apiKey: string,
  model: string,
  system: string,
  user: string
): Promise<string> {
  const modelId = model.replace(/^models\//i, "");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ parts: [{ text: user }] }],
      generationConfig: { temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    throw new Error(parseProviderError("Gemini", await res.text()));
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) {
    throw new Error("Gemini: Empty response from model. Try a different model.");
  }

  return text;
}

export function parseGenerationJson(text: string): import("./types").GenerationResult {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  if (parsed.format === "single_post" && Array.isArray(parsed.tweets)) {
    return { format: "single_post", tweets: parsed.tweets.map(String) };
  }

  if (parsed.format === "thread" && Array.isArray(parsed.tweets)) {
    return { format: "thread", tweets: parsed.tweets.map(String) };
  }

  if (parsed.format === "multiple_variations" && Array.isArray(parsed.variations)) {
    return {
      format: "multiple_variations",
      variations: parsed.variations.map(
        (v: { name?: string; tweets?: string[] }, i: number) => ({
          name: v.name ?? `Variation ${i + 1}`,
          tweets: (v.tweets ?? []).map(String),
        })
      ),
    };
  }

  throw new Error("AI returned an unexpected format. Please try again.");
}
