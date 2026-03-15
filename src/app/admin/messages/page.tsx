import { requireAdminSession } from "@/lib/auth";
import { fetchMessages } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/AdminShell";
import { MessageTable } from "@/components/admin/MessageTable";

export default async function AdminMessagesPage() {
  requireAdminSession();
  const messages = await fetchMessages();

  return (
    <AdminShell
      title="Messages"
      description="Contact requests, custom itinerary leads, and pre-booking questions submitted from the public website."
    >
      <MessageTable rows={messages as never[]} />
    </AdminShell>
  );
}
