export type AiProvider = "openai" | "anthropic" | "gemini";

export type OutputFormat = "single_post" | "thread" | "multiple_variations";

export type GenerationResult =
  | { format: "single_post"; tweets: string[] }
  | { format: "thread"; tweets: string[] }
  | { format: "multiple_variations"; variations: { name: string; tweets: string[] }[] };

export type GenerateRequest = {
  provider: AiProvider;
  apiKey: string;
  linkedinPost: string;
  outputFormat: OutputFormat;
  threadCount: number;
  voiceId: string;
  instructions: string;
};
