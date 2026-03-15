"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarCheck2, Mail, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: ShieldCheck },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck2 },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen border-r border-white/10 bg-[#0b0a0f] p-6">
      <Logo href="/admin" />
      <div className="mt-10 grid gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                active ? "bg-dune text-ink" : "text-[#d0c4ae] hover:bg-white/[0.04] hover:text-ivory"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <form action="/api/admin/logout" method="post" className="mt-10">
        <button
          type="submit"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#d0c4ae] transition hover:text-ivory"
        >
          Log out
        </button>
      </form>
    </aside>
  );
}
