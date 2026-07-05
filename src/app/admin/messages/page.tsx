import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminMessagesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Contact Messages</h1>
      {messages.length === 0 ? (
        <p className="text-muted">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border border-dark-border rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{msg.name}</h3>
                  <p className="text-muted text-sm">{msg.email}</p>
                </div>
                <span className="text-muted text-xs">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              {msg.phone && (
                <p className="text-sm text-muted mb-1">Phone: {msg.phone}</p>
              )}
              {msg.subject && (
                <p className="text-sm text-gold mb-2">Subject: {msg.subject}</p>
              )}
              <p className="text-foreground/80">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
