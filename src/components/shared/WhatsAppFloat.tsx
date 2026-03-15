import { MessageCircleMore } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-dune text-ink shadow-glow transition hover:-translate-y-1"
    >
      <MessageCircleMore className="h-6 w-6" />
    </a>
  );
}
