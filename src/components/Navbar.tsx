import { LinkedInLogo, XLogo } from "./icons";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <LinkedInLogo className="w-7 h-7" />
            <XLogo className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg font-semibold tracking-tight">LinkedIn to X</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-black/60">
          <a href="#how-it-works" className="hover:text-black transition-colors">
            How it works
          </a>
          <a href="#example" className="hover:text-black transition-colors">
            Example
          </a>
          <a href="#features" className="hover:text-black transition-colors">
            Features
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden sm:inline text-sm text-black/60 hover:text-black transition-colors"
          >
            Log in
          </a>
          <a
            href="/login"
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/85 transition-colors"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}
