import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { fetchBookings } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams?: { status?: string; q?: string };
}) {
  requireAdminSession();
  const bookings = await fetchBookings({
    status: searchParams?.status,
    query: searchParams?.q
  });

  return (
    <AdminShell
      title="Bookings"
      description="Search, filter, monitor revenue, and update booking statuses from one serious operational screen."
    >
      <Card>
        <form className="grid gap-4 lg:grid-cols-[1fr_220px_auto_auto]">
          <input
            type="text"
            name="q"
            defaultValue={searchParams?.q}
            placeholder="Search guest, email, experience..."
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-ivory"
          />
          <select
            name="status"
            defaultValue={searchParams?.status || "all"}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-ivory"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button type="submit" className="rounded-full bg-dune px-5 text-sm font-medium text-ink">
            Filter
          </button>
          <Link
            href="/api/admin/export/bookings"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-5 text-sm text-[#d0c4ae]"
          >
            Export CSV
          </Link>
        </form>
      </Card>

      <div className="mt-6 grid gap-4">
        {bookings.length ? (
          bookings.map((booking: any) => (
            <Card key={booking.id}>
              <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl text-ivory">{booking.full_name}</h2>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-sand">
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-[#d0c4ae]">
                    <div>{booking.email}</div>
                    {booking.phone ? <div>{booking.phone}</div> : null}
                    <div>{booking.experience_title}</div>
                    <div>
                      {booking.start_date || "Date on request"}
                      {booking.end_date ? ` → ${booking.end_date}` : ""}
                    </div>
                    <div>
                      Guests: {booking.adults} adults / {booking.children} children
                    </div>
                    <div>{formatCurrency(Number(booking.estimated_total || 0))}</div>
                  </div>
                </div>

                <form
                  action={`/api/admin/bookings/${booking.id}/status`}
                  method="post"
                  className="grid gap-3 xl:min-w-[220px]"
                >
                  <select
                    name="status"
                    defaultValue={booking.status}
                    className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-ivory"
                  >
                    <option value="new">New</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <input
                    name="note"
                    placeholder="Optional note"
                    className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-ivory"
                  />
                  <button type="submit" className="rounded-full bg-dune px-5 py-3 text-sm font-medium text-ink">
                    Update status
                  </button>
                </form>
              </div>
            </Card>
          ))
        ) : (
          <Card>No bookings found.</Card>
        )}
      </div>
    </AdminShell>
  );
}
