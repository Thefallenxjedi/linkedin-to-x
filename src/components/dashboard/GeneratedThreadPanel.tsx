import type { GenerationResult } from "@/lib/ai/types";
import { useState } from "react";

type GeneratedThreadPanelProps = {
  result: GenerationResult | null;
  loading: boolean;
};

export default function GeneratedThreadPanel({ result, loading }: GeneratedThreadPanelProps) {
  const [activeVariation, setActiveVariation] = useState(0);

  const title =
    result?.format === "single_post"
      ? "Generated Post"
      : result?.format === "multiple_variations"
        ? "Generated Variations"
        : "Generated Thread";

  return (
    <div className="rounded-2xl border border-black/8 bg-white p-6 md:p-8 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center py-12 text-black/50">
          <Spinner />
          <p className="mt-4 text-sm">Generating your content...</p>
        </div>
      )}

      {!loading && !result && (
        <p className="mt-6 text-sm text-black/40 py-8 text-center">
          Your generated thread will appear here.
        </p>
      )}

      {!loading && result?.format === "single_post" && (
        <TweetList tweets={result.tweets} labelPrefix="Post" />
      )}

      {!loading && result?.format === "thread" && (
        <TweetList tweets={result.tweets} labelPrefix="Tweet" />
      )}

      {!loading && result?.format === "multiple_variations" && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {result.variations.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveVariation(i)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeVariation === i
                    ? "bg-linkedin text-white"
                    : "border border-black/10 text-black/60 hover:border-linkedin/40"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
          <TweetList
            tweets={result.variations[activeVariation]?.tweets ?? []}
            labelPrefix="Tweet"
          />
        </div>
      )}
    </div>
  );
}

function TweetList({ tweets, labelPrefix }: { tweets: string[]; labelPrefix: string }) {
  if (tweets.length === 0) {
    return <p className="mt-6 text-sm text-black/40">No content generated.</p>;
  }

  return (
    <ol className="mt-6 space-y-4">
      {tweets.map((tweet, i) => (
        <li
          key={i}
          className="rounded-xl border border-black/6 bg-black/[0.02] p-4 md:p-5 group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-linkedin">
              {labelPrefix} {tweets.length > 1 ? i + 1 : ""}
            </span>
            <CopyButton text={tweet} />
          </div>
          <p className="text-sm md:text-[15px] leading-relaxed text-black whitespace-pre-line">
            {tweet}
          </p>
        </li>
      ))}
    </ol>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-xs text-black/40 hover:text-linkedin opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-8 w-8 text-linkedin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
