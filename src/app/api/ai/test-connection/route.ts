import { discoverModels } from "@/lib/ai/discoverModels";
import { formatUserFacingError } from "@/lib/ai/errors";
import type { AiProvider, TestConnectionRequest } from "@/lib/ai/types";
import { NextResponse } from "next/server";

const VALID_PROVIDERS: AiProvider[] = ["gemini", "openai", "openrouter", "anthropic"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TestConnectionRequest;
    const { provider, apiKey } = body;

    if (!provider || !VALID_PROVIDERS.includes(provider)) {
      return NextResponse.json({ ok: false, error: "Invalid provider selected." }, { status: 400 });
    }

    if (!apiKey?.trim()) {
      return NextResponse.json({ ok: false, error: "API key is required." }, { status: 400 });
    }

    const models = await discoverModels(provider, apiKey.trim());
    return NextResponse.json({ ok: true, models });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : formatUserFacingError("AI", "Connection test failed. Please try again.");
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
