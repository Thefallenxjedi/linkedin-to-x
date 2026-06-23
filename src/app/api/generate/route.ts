import { callAiProvider, parseGenerationJson } from "@/lib/ai/providers";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/ai/systemPrompt";
import type { GenerateRequest } from "@/lib/ai/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequest;

    const { provider, apiKey, model, linkedinPost, outputFormat, threadCount, voiceId, instructions } =
      body;

    if (!apiKey?.trim()) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }

    if (!model?.trim()) {
      return NextResponse.json({ error: "Model is required" }, { status: 400 });
    }

    if (!linkedinPost?.trim()) {
      return NextResponse.json({ error: "LinkedIn post is required" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(voiceId);
    const userPrompt = buildUserPrompt({
      linkedinPost,
      outputFormat,
      threadCount,
      instructions,
    });

    const raw = await callAiProvider(provider, apiKey.trim(), model.trim(), systemPrompt, userPrompt);
    const result = parseGenerationJson(raw);

    return NextResponse.json({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
