import { requireAdminSession } from "@/lib/auth";
import { fetchAnalytics } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/AdminShell";
import { MetricCard } from "@/components/admin/MetricCard";
import { Card } from "@/components/ui/Card";

export default async function AdminAnalyticsPage() {
  requireAdminSession();
  const analytics = await fetchAnalytics();

  return (
    <AdminShell
      title="Analytics"
      description="Visitor sessions, page entries, and booking conversion signals captured in Supabase."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Total sessions" value={String(analytics.totalSessions)} />
        <MetricCard label="Page views" value={String(analytics.pageViews)} />
        <MetricCard label="Booking conversions" value={String(analytics.conversions)} />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-display text-3xl text-ivory">Top pages</h2>
        <div className="grid gap-4">
          {analytics.topPages.length ? (
            analytics.topPages.map((page) => (
              <Card key={page.path}>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-[#d0c4ae]">{page.path}</div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-sand">
                    {page.count} views
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>No analytics events recorded yet.</Card>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
