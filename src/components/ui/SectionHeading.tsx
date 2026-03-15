import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {body ? <p className="mt-5 text-base leading-7 text-[#d0c4ae] sm:text-lg">{body}</p> : null}
    </div>
  );
}
