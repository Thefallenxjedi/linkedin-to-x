const features = [
  {
    title: "Thread Generation",
    description: "Automatically split long-form content into engaging, numbered threads.",
  },
  {
    title: "Tone Adaptation",
    description: "Shift from professional LinkedIn tone to conversational X voice.",
  },
  {
    title: "Custom Instructions",
    description: "Tell the AI exactly how you want your content transformed.",
  },
  {
    title: "Multiple Thread Lengths",
    description: "Generate short tweets, medium threads, or deep-dive formats.",
  },
  {
    title: "Copy In One Click",
    description: "Copy your entire thread formatted and ready to paste on X.",
  },
  {
    title: "Fast Generation",
    description: "Get platform-native content in seconds, not hours of rewriting.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built For Creators, Founders &amp; Professionals
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-black/6 bg-white p-7 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-black/55 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
