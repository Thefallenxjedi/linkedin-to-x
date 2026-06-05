import { LinkedInLogo, XLogo } from "./icons";

const AVATAR = "/elon-musk-cutout.png";
const VERIFIED = "/x-verified.png";

const LINKEDIN_POST = `Today, while watching a Starship launch replay for the 47th time, I had a realization that completely changed how I think about business, leadership, innovation, fitness, relationships, and life itself.

Most people see a rocket. Top performers see a mindset.

Starship doesn't ask for permission. It doesn't wait until conditions are perfect. It launches.

And that's exactly how I approached my startup this quarter.

The biggest lesson? Your life is either accelerating toward orbit or being held down by gravity.

Gravity is:
• Negative people
• Excuses
• Comfort zones
• Low-agency thinking

Orbit is:
• Ownership
• Leadership
• Execution
• Relentless learning

If Starship can carry 150 tons to space...
You can send that email.

Who else is building their own Starship in 2026?`;

const X_THREAD = [
  {
    text: "Watching Starship today reminded me of something:\n\nMost people see a rocket.\nHigh performers see a system.",
    stats: { reply: "342", repost: "1.2K", like: "8.7K", views: "210K" },
  },
  {
    text: "Starship doesn't wait for perfect conditions.\n\nIt launches.\nIt fails.\nIt learns.\nIt launches again.\n\nMost careers work the same way.",
    stats: { reply: "198", repost: "890", like: "5.4K", views: "142K" },
  },
  {
    text: "The biggest constraint isn't talent.\n\nIt's gravity.\n\nAnd gravity looks like:\n- Excuses\n- Comfort\n- Endless planning\n- Waiting for permission",
    stats: { reply: "276", repost: "1.1K", like: "7.2K", views: "185K" },
  },
  {
    text: "The goal isn't perfection.\n\nThe goal is orbit.",
    stats: { reply: "891", repost: "4.5K", like: "24K", views: "510K" },
  },
];

function ElonAvatar({ size = 48 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={AVATAR}
      alt=""
      width={size}
      height={size}
      className="rounded-full object-cover shrink-0 bg-white relative z-10"
      style={{ width: size, height: size, objectPosition: "center 15%" }}
    />
  );
}

function VerifiedBadge() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={VERIFIED} alt="" width={16} height={16} className="w-4 h-4 shrink-0" />
  );
}

function LinkedInReactions() {
  const colors = ["#378FE9", "#DF704D", "#6DAE4F"];
  return (
    <div className="flex items-center" aria-hidden="true">
      {colors.map((c, i) => (
        <span
          key={c}
          className="w-[18px] h-[18px] rounded-full border-2 border-white"
          style={{ backgroundColor: c, marginLeft: i === 0 ? 0 : -6 }}
        />
      ))}
    </div>
  );
}

function XStats({ stats }: { stats: { reply: string; repost: string; like: string; views: string } }) {
  return (
    <div className="flex items-center gap-4 mt-2 text-[#536471]">
      <span className="flex items-center gap-1 text-[13px]">
        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z" /></svg>
        {stats.reply}
      </span>
      <span className="flex items-center gap-1 text-[13px]">
        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" /></svg>
        {stats.repost}
      </span>
      <span className="flex items-center gap-1 text-[13px]">
        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.518-3.05 1.653-.14 3.433.81 4.61 2.71.174.26.334.52.48.78.145-.26.305-.52.48-.78 1.177-1.9 2.957-2.85 4.61-2.71 1.87.14 3.631 1.26 4.518 3.05.896 1.81.846 4.17-.514 6.67z" /></svg>
        {stats.like}
      </span>
      <span className="flex items-center gap-1 text-[13px]">
        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 16v-5.5h2V16H8zm4.5 0v-8h2v8h-2zm4.5 0V8h2v8h-2z" /></svg>
        {stats.views}
      </span>
    </div>
  );
}

function LinkedInCard() {
  return (
    <div className="w-full max-w-[400px] shrink-0">
      <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
        <LinkedInLogo className="w-5 h-5" />
        <span className="text-sm font-semibold text-black">LinkedIn Preview</span>
      </div>
      <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm overflow-hidden text-left">
        <div className="p-4">
          <div className="flex gap-3">
            <ElonAvatar size={48} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-black flex items-center gap-1">
                    Elon Musk
                    <LinkedInLogo className="w-3.5 h-3.5" />
                  </p>
                  <p className="text-[12px] text-[#666] leading-snug">CEO at SpaceX · Tesla · xAI</p>
                  <p className="text-[12px] text-[#666] mt-0.5 flex items-center gap-1">
                    2h ·
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1" /><path d="M1 8h14M8 1a6 6 0 010 14" fill="none" stroke="currentColor" strokeWidth="0.8" /></svg>
                  </p>
                </div>
                <span className="text-[#666] text-lg leading-none">···</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-[1.45] text-black whitespace-pre-line">{LINKEDIN_POST}</p>
          <p className="mt-3 text-[13px]">
            <span className="text-[#0A66C2]">#Leadership</span>{" "}
            <span className="text-[#0A66C2]">#Innovation</span>{" "}
            <span className="text-[#0A66C2]">#Mindset</span>{" "}
            <span className="text-[#0A66C2]">#Starship</span>{" "}
            <span className="text-[#0A66C2]">#Growth</span>
          </p>
        </div>
        <div className="px-4 pb-2 flex items-center justify-between text-[12px] text-[#666]">
          <div className="flex items-center gap-1.5 min-w-0">
            <LinkedInReactions />
            <span className="truncate">John Doe and 12,345 others</span>
          </div>
          <span className="shrink-0">2,103 comments · 891 reposts</span>
        </div>
        <div className="mx-4 border-t border-[#e0e0e0]" />
        <div className="flex justify-around py-1 text-[13px] font-semibold text-[#666]">
          {["Like", "Comment", "Repost", "Send"].map((a) => (
            <span key={a} className="py-3 px-2">{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function XThreadCard() {
  return (
    <div className="w-full max-w-[400px] shrink-0">
      <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
        <XLogo className="w-4 h-4 text-black" />
        <span className="text-sm font-semibold text-black">X Preview</span>
      </div>
      <div className="bg-white rounded-xl border border-[#eff3f4] shadow-sm overflow-hidden text-left">
        <div className="p-4 space-y-0">
          {X_THREAD.map((tweet, i) => (
            <div key={i} className={`relative flex gap-3 ${i < X_THREAD.length - 1 ? "pb-4" : ""}`}>
              {i < X_THREAD.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-[#cfd9de]" />
              )}
              <ElonAvatar size={40} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[14px] flex-wrap">
                  <span className="font-bold text-black">Elon Musk</span>
                  <VerifiedBadge />
                  <span className="text-[#536471]">@elonmusk</span>
                  {i === 0 && <span className="text-[#536471]">· 2h</span>}
                </div>
                <p className="mt-1 text-[14px] leading-[1.4] text-black whitespace-pre-line">{tweet.text}</p>
                <XStats stats={tweet.stats} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center shrink-0 px-2 md:px-4">
      <svg className="hidden lg:block" width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden="true">
        <line x1="2" y1="12" x2="36" y2="12" stroke="#0A66C2" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M32 7 L42 12 L32 17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <svg className="lg:hidden" width="24" height="40" viewBox="0 0 24 40" fill="none" aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="30" stroke="#0A66C2" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M7 26 L12 36 L17 26" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export default function ContentComparison() {
  return (
    <div className="w-full">
      <div className="text-center mb-10 md:mb-12">
        <p className="text-xl md:text-2xl font-semibold tracking-tight text-black">
          The same idea works.
        </p>
        <p className="text-xl md:text-2xl font-bold tracking-tight text-black mt-1">
          The same format doesn&apos;t.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-3 mx-auto w-full max-w-[900px] lg:max-w-none">
        <LinkedInCard />
        <FlowArrow />
        <XThreadCard />
      </div>
    </div>
  );
}
