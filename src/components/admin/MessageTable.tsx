import { Card } from "@/components/ui/Card";

interface MessageRow {
  id: string;
  full_name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

interface MessageTableProps {
  rows: MessageRow[];
}

export function MessageTable({ rows }: MessageTableProps) {
  if (!rows.length) {
    return <Card>No contact messages yet.</Card>;
  }

  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <Card key={row.id}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-display text-2xl text-ivory">{row.full_name}</h3>
              <p className="mt-1 text-sm text-[#cdbfa9]">{row.email}</p>
              {row.subject ? <p className="mt-4 text-sm uppercase tracking-[0.22em] text-sand">{row.subject}</p> : null}
              <p className="mt-3 text-sm leading-7 text-[#d5cab6]">{row.message}</p>
            </div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#a99a82]">
              {new Date(row.created_at).toLocaleDateString()}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
