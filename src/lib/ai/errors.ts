export function parseProviderError(provider: string, raw: string): string {
  try {
    const parsed = JSON.parse(raw) as {
      error?: { message?: string; code?: string };
      message?: string;
    };
    const msg = parsed.error?.message ?? parsed.message ?? raw;
    return formatUserFacingError(provider, msg, parsed.error?.code);
  } catch {
    return formatUserFacingError(provider, raw.slice(0, 300));
  }
}

export function formatUserFacingError(
  provider: string,
  message: string,
  code?: string
): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("invalid api key") ||
    lower.includes("incorrect api key") ||
    lower.includes("api key not valid") ||
    lower.includes("unauthorized") ||
    lower.includes("authentication") ||
    lower.includes("permission denied") ||
    code === "invalid_api_key"
  ) {
    return `${provider}: Invalid API key. Check your key and try again.`;
  }

  if (
    lower.includes("quota") ||
    lower.includes("rate limit") ||
    lower.includes("resource exhausted") ||
    lower.includes("limit: 0") ||
    code === "rate_limit_exceeded"
  ) {
    return `${provider}: Rate limit or quota exceeded. Wait a moment and try again, or check your plan.`;
  }

  if (lower.includes("fetch failed") || lower.includes("network") || lower.includes("econnrefused")) {
    return `${provider}: Network error. Check your connection and try again.`;
  }

  if (lower.includes("not found") && lower.includes("model")) {
    return `${provider}: Model not available. Test connection again to refresh the model list.`;
  }

  return `${provider}: ${message}`;
}
