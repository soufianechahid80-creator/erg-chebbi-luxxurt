import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-ivory placeholder:text-white/35 focus:border-dune/60 focus:outline-none",
        props.className
      )}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-ivory focus:border-dune/60 focus:outline-none",
        props.className
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ivory placeholder:text-white/35 focus:border-dune/60 focus:outline-none",
        props.className
      )}
    />
  );
}
