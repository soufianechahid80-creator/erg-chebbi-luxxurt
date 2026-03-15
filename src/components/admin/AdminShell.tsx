import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface AdminShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AdminShell({ title, description, children }: AdminShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <div className="p-5 sm:p-8">
        <div className="mb-8 flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="text-xs uppercase tracking-[0.22em] text-sand">Owner dashboard</div>
          <h1 className="font-display text-4xl text-ivory">{title}</h1>
          {description ? <p className="max-w-3xl text-sm leading-7 text-[#d0c4ae]">{description}</p> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
