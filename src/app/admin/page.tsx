import { CalendarRange, LineChart, Mail, Wallet } from "lucide-react";
import { requireAdminSession } from "@/lib/auth";
import { fetchDashboardMetrics } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/AdminShell";
import { MetricCard } from "@/components/admin/MetricCard";
import { BookingTable } from "@/components/admin/BookingTable";
import { MessageTable } from "@/components/admin/MessageTable";
import { Card } from "@/components/ui/Card";

export default async function AdminOverviewPage() {
  requireAdminSession();
  const metrics = await fetchDashboardMetrics();

  return (
    <AdminShell
      title="Overview"
      description="A serious owner dashboard for bookings, messages, visitor activity, and estimated revenue."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Bookings" value={String(metrics.bookingCount)} icon={<CalendarRange className="h-5 w-5" />} />
        <MetricCard label="Messages" value={String(metrics.messageCount)} icon={<Mail className="h-5 w-5" />} />
        <MetricCard label="Sessions" value={String(metrics.sessionCount)} icon={<LineChart className="h-5 w-5" />} />
        <MetricCard label="Recent revenue" value={`€${Math.round(metrics.revenue)}`} icon={<Wallet className="h-5 w-5" />} />
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
        <div>
          <h2 className="mb-4 font-display text-3xl text-ivory">Recent bookings</h2>
          <BookingTable rows={metrics.recentBookings as never[]} />
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="mb-4 font-display text-3xl text-ivory">Recent messages</h2>
            <MessageTable rows={metrics.recentMessages as never[]} />
          </div>
          <div>
            <h2 className="mb-4 font-display text-3xl text-ivory">Recent activity</h2>
            <div className="grid gap-4">
              {(metrics.recentActivity || []).length ? (
                metrics.recentActivity.map((item: any) => (
                  <Card key={item.id}>
                    <p className="text-sm leading-7 text-[#d6cbb6]">{item.message}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.22em] text-sand">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </Card>
                ))
              ) : (
                <Card>No recent activity yet.</Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
