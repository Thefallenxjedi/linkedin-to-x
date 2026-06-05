import { LinkedInLogo, XLogo } from "./icons";

const linkedinTraits = ["Professional", "Long-form", "Career focused", "Structured"];
const xTraits = ["Conversational", "Opinionated", "Fast paced", "Hook driven"];

export default function Problem() {
  return (
    <section className="py-24 md:py-32 bg-black/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Why Cross-Posting Doesn&apos;t Work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-black/8 bg-white p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <LinkedInLogo className="w-8 h-8" />
              <h3 className="text-2xl font-bold">LinkedIn</h3>
            </div>
            <ul className="space-y-4">
              {linkedinTraits.map((trait) => (
                <li key={trait} className="flex items-center gap-3 text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-black/8 bg-white p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <XLogo className="w-7 h-7 text-black" />
              <h3 className="text-2xl font-bold">X</h3>
            </div>
            <ul className="space-y-4">
              {xTraits.map((trait) => (
                <li key={trait} className="flex items-center gap-3 text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
