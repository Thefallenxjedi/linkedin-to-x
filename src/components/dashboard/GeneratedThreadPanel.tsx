type GeneratedThreadPanelProps = {
  result: string[] | null;
  loading: boolean;
};

export default function GeneratedThreadPanel({ result, loading }: GeneratedThreadPanelProps) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight">Generated Thread</h2>

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center py-12 text-black/50">
          <Spinner />
          <p className="mt-4 text-sm">Generating your thread...</p>
        </div>
      )}

      {!loading && !result && (
        <p className="mt-6 text-sm text-black/40 py-8 text-center">
          Your generated thread will appear here.
        </p>
      )}

      {!loading && result && (
        <ol className="mt-6 space-y-4">
          {result.map((tweet, i) => (
            <li
              key={i}
              className="rounded-xl border border-black/6 bg-black/[0.02] p-4 md:p-5"
            >
              <span className="text-xs font-mono text-linkedin mb-2 block">
                Tweet {i + 1}
              </span>
              <p className="text-sm md:text-[15px] leading-relaxed text-black whitespace-pre-line">
                {tweet}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
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
