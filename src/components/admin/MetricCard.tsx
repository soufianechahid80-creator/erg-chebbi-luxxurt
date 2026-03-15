import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}

export function MetricCard({ label, value, hint, icon }: MetricCardProps) {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-sand">{label}</p>
          <h3 className="mt-3 font-display text-3xl text-ivory">{value}</h3>
          {hint ? <p className="mt-3 text-sm text-[#cfc4ae]">{hint}</p> : null}
        </div>
        {icon ? <div className="text-dune">{icon}</div> : null}
      </div>
    </Card>
  );
}
