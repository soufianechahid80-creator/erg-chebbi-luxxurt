import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href = "/en", className }: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-dune/35 bg-black/50">
        <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="43" cy="18" r="7" fill="#E7D7BB" opacity="0.95" />
          <path d="M10 37C20 31 30 29 40 29C47 29 53 30 57 33" stroke="#C7A66A" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 45C18 39 30 37 42 37C48 37 54 38 58 41" stroke="#E7D7BB" strokeWidth="2.6" strokeLinecap="round" opacity="0.72" />
        </svg>
      </div>
      <div>
        <div className="font-display text-lg tracking-[0.16em] text-ivory sm:text-xl">ERG CHEBBI</div>
        <div className="-mt-0.5 text-[10px] uppercase tracking-[0.34em] text-sand/90">Luxury desert journeys</div>
      </div>
    </div>
  );

  return <Link href={href}>{content}</Link>;
}
