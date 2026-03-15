import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

interface BookingRow {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  experience_title: string;
  estimated_total: number;
  status: string;
  created_at: string;
}

interface BookingTableProps {
  rows: BookingRow[];
}

export function BookingTable({ rows }: BookingTableProps) {
  if (!rows.length) {
    return <Card>No bookings yet.</Card>;
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[0.04] text-[#cdbd9f]">
            <tr>
              <th className="px-5 py-4">Guest</th>
              <th className="px-5 py-4">Experience</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-5 py-4">
                  <div className="font-medium text-ivory">{row.full_name}</div>
                  <div className="text-[#cdbfa9]">{row.email}</div>
                </td>
                <td className="px-5 py-4 text-[#d7cbb6]">{row.experience_title}</td>
                <td className="px-5 py-4 text-[#d7cbb6]">{formatCurrency(Number(row.estimated_total || 0))}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-sand">
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#cdbfa9]">{new Date(row.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
