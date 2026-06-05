const OPTIONS = [3, 5, 7, 10] as const;

type ThreadLengthSelectorProps = {
  value: number;
  onChange: (count: number) => void;
};

export default function ThreadLengthSelector({ value, onChange }: ThreadLengthSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-black/70 mb-3">Thread length</label>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => onChange(count)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              value === count
                ? "bg-linkedin text-white"
                : "border border-black/10 bg-white text-black/70 hover:border-linkedin/40 hover:text-black"
            }`}
          >
            {count} Tweets
          </button>
        ))}
      </div>
    </div>
  );
}
