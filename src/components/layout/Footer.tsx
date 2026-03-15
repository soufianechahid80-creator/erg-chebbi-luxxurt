import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { localizeHref } from "@/lib/locales";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dictionary = getDictionary(locale);

  const links = [
    { href: localizeHref(locale, "/experiences"), label: dictionary.nav.experiences },
    { href: localizeHref(locale, "/gallery"), label: dictionary.nav.gallery },
    { href: localizeHref(locale, "/faq"), label: dictionary.nav.faq },
    { href: localizeHref(locale, "/contact"), label: dictionary.nav.contact }
  ];

  return (
    <footer className="border-t border-white/10 bg-[#09080b]">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo href={localizeHref(locale, "/")} />
          <p className="mt-5 max-w-md text-sm leading-7 text-[#d0c4ae]">
            Erg Chebbi Luxury is built to feel warm, trustworthy, and premium — a Merzouga brand made for international travelers who want beauty, clarity, and a booking flow they can trust.
          </p>
          <div className="mt-6">
            <ButtonLink href={localizeHref(locale, "/booking")}>{dictionary.common.reserveDates}</ButtonLink>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.24em] text-sand">{dictionary.nav.experiences}</h3>
          <div className="mt-4 grid gap-3 text-sm text-[#d0c4ae]">
            <a href={localizeHref(locale, "/camp")} className="hover:text-ivory">
              {dictionary.nav.camp}
            </a>
            <a href={localizeHref(locale, "/camel-trekking")} className="hover:text-ivory">
              {dictionary.nav.camel}
            </a>
            <a href={localizeHref(locale, "/quad-atv")} className="hover:text-ivory">
              {dictionary.nav.quad}
            </a>
            <a href={localizeHref(locale, "/tours-4x4")} className="hover:text-ivory">
              {dictionary.nav.tours}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.24em] text-sand">{dictionary.nav.contact}</h3>
          <div className="mt-4 grid gap-3 text-sm text-[#d0c4ae]">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ivory">
              {siteConfig.email}
            </a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-ivory">
              {siteConfig.whatsapp}
            </a>
            <span>{siteConfig.location}</span>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="hover:text-ivory">
              Instagram
            </a>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="hover:text-ivory">
              Facebook
            </a>
            <a href={siteConfig.tiktok} target="_blank" rel="noreferrer" className="hover:text-ivory">
              TikTok
            </a>
          </div>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-6 text-xs text-[#9d907a]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Erg Chebbi Luxury. All rights reserved.</span>
          <div className="flex gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-ivory">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
