import type { AiProvider } from "./types";

export async function callAiProvider(
  provider: AiProvider,
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  switch (provider) {
    case "openai":
      return callOpenAI(apiKey, systemPrompt, userPrompt);
    case "anthropic":
      return callAnthropic(apiKey, systemPrompt, userPrompt);
    case "gemini":
      return callGemini(apiKey, systemPrompt, userPrompt);
    default:
      throw new Error("Unsupported AI provider");
  }
}

async function callOpenAI(apiKey: string, system: string, user: string): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(parseProviderError("OpenAI", err));
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function callAnthropic(apiKey: string, system: string, user: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-latest",
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(parseProviderError("Anthropic", err));
  }

  const data = await res.json();
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  return block?.text ?? "";
}

async function callGemini(apiKey: string, system: string, user: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

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
    const err = await res.text();
    throw new Error(parseProviderError("Gemini", err));
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

function parseProviderError(provider: string, raw: string): string {
  try {
    const parsed = JSON.parse(raw);
    const msg =
      parsed.error?.message ?? parsed.error?.message ?? parsed.message ?? raw;
    return `${provider}: ${msg}`;
  } catch {
    return `${provider}: ${raw.slice(0, 200)}`;
  }
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
