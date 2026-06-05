import { LinkedInLogo, XLogo } from "./icons";

const links = [
  { label: "Product", href: "#features" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <LinkedInLogo className="w-6 h-6" />
              <XLogo className="w-5 h-5 text-black" />
            </div>
            <span className="text-base font-semibold">LinkedIn to X</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-black/50 hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-black/35">
            © {new Date().getFullYear()} LinkedIn to X
          </p>
        </div>
      </div>
    </footer>
  );
}
