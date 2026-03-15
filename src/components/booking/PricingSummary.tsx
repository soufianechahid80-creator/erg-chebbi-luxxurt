import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

interface PricingSummaryProps {
  locale: Locale;
  nights: number;
  subtotal: number;
  addOnsTotal: number;
  total: number;
  summaryLabel: string;
}

export function PricingSummary({
  locale,
  nights,
  subtotal,
  addOnsTotal,
  total,
  summaryLabel
}: PricingSummaryProps) {
  const dictionary = getDictionary(locale);

  return (
    <Card className="sticky top-24">
      <p className="text-xs uppercase tracking-[0.22em] text-sand">{dictionary.common.estimatedTotal}</p>
      <h3 className="mt-3 font-display text-3xl text-ivory">{formatCurrency(total, "EUR", locale)}</h3>
      <div className="mt-6 space-y-3 text-sm text-[#d0c4ae]">
        <div className="flex items-center justify-between">
          <span>{summaryLabel}</span>
          <span>{formatCurrency(subtotal, "EUR", locale)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Add-ons</span>
          <span>{formatCurrency(addOnsTotal, "EUR", locale)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base text-ivory">
          <span>{dictionary.common.estimatedTotal}</span>
          <span>{formatCurrency(total, "EUR", locale)}</span>
        </div>
      </div>

      {nights > 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[#d4c8b4]">
          {nights} {dictionary.common.nights}
        </div>
      ) : null}
    </Card>
  );
}
