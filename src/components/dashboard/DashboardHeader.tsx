import SignOutButton from "@/components/SignOutButton";
import { LinkedInLogo, XLogo } from "@/components/icons";
import Link from "next/link";

type DashboardHeaderProps = {
  active?: "dashboard" | "settings";
};

export default function DashboardHeader({ active = "dashboard" }: DashboardHeaderProps) {
  const linkClass = (page: "dashboard" | "settings") =>
    `text-sm transition-colors ${
      active === page ? "text-black font-medium" : "text-black/60 hover:text-black"
    }`;

  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <LinkedInLogo className="w-7 h-7" />
          <XLogo className="w-5 h-5 text-black" />
          <span className="text-lg font-semibold tracking-tight">LinkedIn to X</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className={linkClass("dashboard")}>
            Converter
          </Link>
          <Link href="/settings" className={linkClass("settings")}>
            Settings
          </Link>
          <SignOutButton />
        </div>
      </nav>
    </header>
  );
}
