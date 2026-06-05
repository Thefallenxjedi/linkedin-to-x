export function mockGenerateThread(count: number): string[] {
  const templates = [
    "This is a generated X thread.",
    "The real AI output will appear here.",
    "Waiting for Gemini integration.",
    "Your LinkedIn insight, rewritten for X.",
    "Hook → tension → takeaway. That's the thread format.",
    "Founders don't post essays. They post ideas.",
    "One thought per tweet. Momentum per scroll.",
    "Platform-native beats copy-paste every time.",
    "Short. Sharp. Shareable.",
    "The algorithm rewards clarity, not corporate speak.",
  ];

  return Array.from({ length: count }, (_, i) => templates[i % templates.length]);
}
