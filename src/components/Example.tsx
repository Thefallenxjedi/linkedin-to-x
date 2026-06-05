import ContentComparison from "./ContentComparison";

export default function Example() {
  return (
    <section id="example" className="py-24 md:py-32 bg-black/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">See The Difference</h2>
          <p className="mt-4 text-lg text-black/50">
            Same insight. Completely different delivery.
          </p>
        </div>

        <ContentComparison />
      </div>
    </section>
  );
}
