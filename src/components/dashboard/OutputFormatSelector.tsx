import type { OutputFormat } from "@/lib/ai/types";

const OPTIONS: { value: OutputFormat; label: string; description: string }[] = [
  { value: "single_post", label: "Single post", description: "One optimized X post" },
  { value: "thread", label: "Thread", description: "Numbered multi-tweet thread" },
  {
    value: "multiple_variations",
    label: "Multiple variations",
    description: "5 unique versions to choose from",
  },
];

type OutputFormatSelectorProps = {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
};

export default function OutputFormatSelector({ value, onChange }: OutputFormatSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-black/70 mb-3">Output format</label>
      <div className="space-y-2">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
              value === opt.value
                ? "border-linkedin bg-linkedin/5"
                : "border-black/10 hover:border-linkedin/30"
            }`}
          >
            <input
              type="radio"
              name="output-format"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="mt-1 accent-linkedin"
            />
            <div>
              <span className="text-sm font-medium text-black">{opt.label}</span>
              <p className="text-xs text-black/50 mt-0.5">{opt.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
