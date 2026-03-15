import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-dune/70";

const variants = {
  primary:
    "bg-dune text-ink hover:-translate-y-0.5 hover:bg-sand shadow-glow",
  secondary:
    "border border-white/15 bg-white/5 text-ivory hover:bg-white/10",
  ghost: "text-sand hover:text-ivory"
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(baseStyles, variants[variant], className)}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
