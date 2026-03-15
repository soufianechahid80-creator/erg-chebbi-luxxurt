import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-panel backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
