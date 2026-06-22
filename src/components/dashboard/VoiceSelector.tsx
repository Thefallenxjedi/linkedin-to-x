import { VOICE_OPTIONS } from "@/lib/ai/voices";

type VoiceSelectorProps = {
  value: string;
  onChange: (voiceId: string) => void;
};

export default function VoiceSelector({ value, onChange }: VoiceSelectorProps) {
  return (
    <div>
      <label htmlFor="voice-select" className="block text-sm font-medium text-black/70 mb-3">
        Voice & style
      </label>
      <select
        id="voice-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-linkedin/20 focus:border-linkedin/40"
      >
        {VOICE_OPTIONS.map((voice) => (
          <option key={voice.id} value={voice.id}>
            {voice.label} — {voice.description}
          </option>
        ))}
      </select>
    </div>
  );
}
