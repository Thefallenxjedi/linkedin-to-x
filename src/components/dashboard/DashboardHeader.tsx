import SignOutButton from "@/components/SignOutButton";
import { LinkedInLogo, XLogo } from "@/components/icons";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <LinkedInLogo className="w-7 h-7" />
          <XLogo className="w-5 h-5 text-black" />
          <span className="text-lg font-semibold tracking-tight">LinkedIn to X</span>
        </Link>
        <SignOutButton />
      </nav>
    </header>
  );
}
