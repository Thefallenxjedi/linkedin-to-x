export type VoiceOption = {
  id: string;
  label: string;
  description: string;
  stylePrompt: string;
};

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: "founder",
    label: "Founder",
    description: "Direct, builder mindset, first-person lessons",
    stylePrompt:
      "Write like a founder sharing hard-won lessons. First-person, direct, confident but not arrogant. Focus on decisions, tradeoffs, and what actually worked. Avoid corporate polish.",
  },
  {
    id: "controversial",
    label: "Controversial",
    description: "Bold takes that challenge conventional wisdom",
    stylePrompt:
      "Take a bold, contrarian angle. Challenge popular beliefs respectfully but clearly. Use sharp contrasts and strong opinions backed by the original insight. Avoid being offensive — be provocative, not toxic.",
  },
  {
    id: "concise",
    label: "Concise",
    description: "Minimal words, maximum impact",
    stylePrompt:
      "Strip everything to the essentials. Short sentences. No filler. Every word must earn its place. Prefer punchy one-liners and tight structure.",
  },
  {
    id: "storytelling",
    label: "Storytelling",
    description: "Narrative arc with tension and payoff",
    stylePrompt:
      "Turn the insight into a mini story. Open with a scene or moment. Build tension or curiosity. Land on a clear takeaway. Use vivid but simple language.",
  },
  {
    id: "educational",
    label: "Educational",
    description: "Teach frameworks and actionable steps",
    stylePrompt:
      "Teach clearly. Break ideas into steps, frameworks, or numbered lessons. Make the reader feel smarter after reading. Practical and structured.",
  },
  {
    id: "professional",
    label: "Professional",
    description: "Polished, credible, business-appropriate",
    stylePrompt:
      "Professional and credible tone. Clear structure, measured confidence, business-appropriate language without being stiff or corporate.",
  },
  {
    id: "motivational",
    label: "Motivational",
    description: "Energizing without generic fluff",
    stylePrompt:
      "Energizing and forward-looking. Inspire action without generic motivational clichés. Tie encouragement to specific insights from the post.",
  },
];

export function getVoiceById(id: string): VoiceOption {
  return VOICE_OPTIONS.find((v) => v.id === id) ?? VOICE_OPTIONS[0];
}
