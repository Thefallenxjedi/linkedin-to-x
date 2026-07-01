export type AiProvider = "gemini" | "openai" | "openrouter" | "anthropic";

export type DiscoveredModel = {
  id: string;
  label: string;
};

export type OutputFormat = "single_post" | "thread" | "multiple_variations";

export type GenerationResult =
  | { format: "single_post"; tweets: string[] }
  | { format: "thread"; tweets: string[] }
  | { format: "multiple_variations"; variations: { name: string; tweets: string[] }[] };

export type GenerateRequest = {
  provider: AiProvider;
  apiKey: string;
  model: string;
  customPrompt?: string;
  linkedinPost: string;
  outputFormat: OutputFormat;
  threadCount: number;
  voiceId: string;
  instructions: string;
};

export type TestConnectionRequest = {
  provider: AiProvider;
  apiKey: string;
};

export type TestConnectionResponse =
  | { ok: true; models: DiscoveredModel[] }
  | { ok: false; error: string };
