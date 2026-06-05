import { LinkedInLogo, XLogo } from "./icons";
import ContentComparison from "./ContentComparison";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="inline-flex items-center gap-4 rounded-full border border-black/8 bg-black/[0.02] px-5 py-2 text-sm text-black/60 mb-8">
          <LinkedInLogo className="w-5 h-5" />
          <span className="text-black/30">to</span>
          <XLogo className="w-4 h-4 text-black" />
          <span>Content transformation for creators</span>
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Turn LinkedIn Content Into{" "}
          <span className="text-black">High-Performing X Posts</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-black/55 max-w-2xl mx-auto leading-relaxed">
          Stop copy-pasting the same content everywhere. Convert LinkedIn posts
          into X-native tweets and threads that match the platform.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/login"
            className="inline-flex items-center rounded-lg bg-black px-8 py-3.5 text-base font-medium text-white hover:bg-black/85 transition-colors"
          >
            Get Started Free
          </a>
          <a
            href="#example"
            className="inline-flex items-center rounded-lg border border-black/15 px-8 py-3.5 text-base font-medium text-black hover:bg-black/[0.03] transition-colors"
          >
            See Example
          </a>
        </div>

        <div className="mt-16 md:mt-20">
          <ContentComparison />
        </div>
      </div>
    </section>
  );
}
