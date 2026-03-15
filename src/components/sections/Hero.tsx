"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { getMediaAsset } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/shared/MediaFrame";
import { localizeHref } from "@/lib/locales";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink">
      <div className="absolute inset-0 bg-radial-lux" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:42px_42px]" />
      <Container className="relative grid gap-10 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-28">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge>{dictionary.hero.eyebrow}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl"
          >
            {dictionary.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-6 max-w-2xl text-base leading-8 text-[#d2c6b0] sm:text-lg"
          >
            {dictionary.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <ButtonLink href={localizeHref(locale, "/booking")}>{dictionary.hero.primaryCta}</ButtonLink>
            <ButtonLink variant="secondary" href={localizeHref(locale, "/experiences")}>
              {dictionary.hero.secondaryCta}
            </ButtonLink>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {dictionary.hero.serviceHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-sand"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[40px] bg-dune/10 blur-3xl" />
          <MediaFrame media={getMediaAsset("heroVideo")} className="aspect-[4/5] lg:aspect-[4/4.2]" priorityVideo />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-t from-black/55 via-transparent to-black/25" />
          <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[24px] border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-sand">{dictionary.common.luxuryService}</p>
              <p className="mt-2 text-sm leading-6 text-[#efe3cf]">{dictionary.common.availabilityNotice}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-[#e8dcc7]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-sand">Merzouga</div>
                <div className="mt-1">Erg Chebbi</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-sand">Booking</div>
                <div className="mt-1">On-site flow</div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
