const steps = [
  {
    number: "01",
    title: "Paste Your Content",
    description: "Paste a LinkedIn post or LinkedIn URL.",
  },
  {
    number: "02",
    title: "Choose Your Style",
    description: "Tweet, Thread, Founder Mode, Educational Mode.",
  },
  {
    number: "03",
    title: "Generate",
    description: "Get X-native content instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-4 text-lg text-black/50 max-w-xl mx-auto">
            Three steps from LinkedIn post to X-ready thread.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-black/6 bg-white p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <span className="text-sm font-mono text-black/25">{step.number}</span>
              <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-black/55 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
