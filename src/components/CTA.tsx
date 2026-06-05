export default function CTA() {
  return (
    <section id="cta" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-black px-8 py-16 md:px-16 md:py-24 text-center">
          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Your Next X Thread Is Already Written
            </h2>
            <p className="mt-5 text-lg md:text-xl text-white/60 max-w-xl mx-auto">
              It&apos;s hiding inside your LinkedIn post.
            </p>
            <a
              href="/login"
              className="mt-10 inline-flex items-center rounded-lg bg-white px-10 py-4 text-base font-semibold text-black hover:bg-white/90 transition-colors"
            >
              Start Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
