import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, intro, actions }: PageHeroProps) {
  return (
    <section className="border-b border-white/10 bg-mesh-desert">
      <Container className="py-16 sm:py-20">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#d5c9b4] sm:text-lg">{intro}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
      </Container>
    </section>
  );
}
