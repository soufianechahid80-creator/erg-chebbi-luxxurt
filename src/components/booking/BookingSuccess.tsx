import { CheckCircle2 } from "lucide-react";

export function BookingSuccess() {
  return (
    <div className="rounded-[28px] border border-emerald-400/20 bg-emerald-500/10 p-6">
      <div className="flex items-start gap-4">
        <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-300" />
        <div>
          <h3 className="font-display text-2xl text-ivory">Booking request sent successfully</h3>
          <p className="mt-3 text-sm leading-7 text-[#d1dacd]">
            The request was recorded. The guest confirmation and owner notification email flow will run when your email credentials are connected.
          </p>
        </div>
      </div>
    </div>
  );
}
