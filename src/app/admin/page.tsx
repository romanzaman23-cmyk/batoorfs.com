import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import {
  Settings,
  BarChart3,
  Users,
  MessageSquare,
  Mail,
  Shield,
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [statsCount, panelistsCount, servicesCount, messagesCount, unreadCount] =
    await Promise.all([
      prisma.stat.count(),
      prisma.panelist.count(),
      prisma.service.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

  const cards = [
    { label: "Statistics", count: statsCount, href: "/admin/stats", icon: BarChart3 },
    { label: "Services", count: servicesCount, href: "/admin/services", icon: Shield },
    { label: "Panelists", count: panelistsCount, href: "/admin/panelists", icon: Users },
    { label: "Messages", count: messagesCount, href: "/admin/messages", icon: Mail },
    { label: "Unread Messages", count: unreadCount, href: "/admin/messages", icon: MessageSquare },
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted mb-8">Welcome back, {session.email}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white border border-dark-border rounded-xl p-6 hover:border-gold/50 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-gold" />
                <span className="text-3xl font-bold">{card.count}</span>
              </div>
              <p className="text-muted">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white border border-dark-border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gold" />
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/admin/settings" className="px-4 py-3 bg-dark-card rounded-lg text-sm hover:border-gold border border-dark-border transition-colors text-foreground">
            Edit Site Content
          </Link>
          <Link href="/admin/stats" className="px-4 py-3 bg-dark-card rounded-lg text-sm hover:border-gold border border-dark-border transition-colors text-foreground">
            Update Statistics
          </Link>
          <Link href="/admin/panelists" className="px-4 py-3 bg-dark-card rounded-lg text-sm hover:border-gold border border-dark-border transition-colors text-foreground">
            Manage Panelists
          </Link>
          <Link href="/" target="_blank" className="px-4 py-3 bg-dark-card rounded-lg text-sm hover:border-gold border border-dark-border transition-colors text-foreground">
            View Live Site
          </Link>
        </div>
      </div>
    </div>
  );
}
