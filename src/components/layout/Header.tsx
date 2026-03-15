import Link from "next/link";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { localizeHref } from "@/lib/locales";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Instagram, Facebook, BadgeCheck } from "lucide-react";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const dictionary = getDictionary(locale);

  const items = [
    { href: localizeHref(locale, "/"), label: dictionary.nav.home },
    { href: localizeHref(locale, "/experiences"), label: dictionary.nav.experiences },
    { href: localizeHref(locale, "/camp"), label: dictionary.nav.camp },
    { href: localizeHref(locale, "/camel-trekking"), label: dictionary.nav.camel },
    { href: localizeHref(locale, "/quad-atv"), label: dictionary.nav.quad },
    { href: localizeHref(locale, "/tours-4x4"), label: dictionary.nav.tours },
    { href: localizeHref(locale, "/gallery"), label: dictionary.nav.gallery },
    { href: localizeHref(locale, "/about"), label: dictionary.nav.about },
    { href: localizeHref(locale, "/faq"), label: dictionary.nav.faq },
    { href: localizeHref(locale, "/contact"), label: dictionary.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="border-b border-white/5">
        <Container className="flex min-h-11 items-center justify-between gap-4 text-xs text-[#cdbb9d]">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-3.5 w-3.5 text-dune" />
            <span>{dictionary.hero.trustLine}</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="hover:text-ivory">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="hover:text-ivory">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={siteConfig.tiktok} target="_blank" rel="noreferrer" className="hover:text-ivory">
              TikTok
            </a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-ivory">
              WhatsApp
            </a>
          </div>
        </Container>
      </div>

      <Container className="relative flex min-h-20 items-center justify-between gap-6">
        <Logo href={localizeHref(locale, "/")} />
        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[#d5c7b0] transition hover:text-ivory">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <div className="hidden lg:block">
            <ButtonLink href={localizeHref(locale, "/booking")}>{dictionary.common.bookNow}</ButtonLink>
          </div>
          <MobileMenu items={items} locale={locale} />
        </div>
      </Container>
    </header>
  );
}
