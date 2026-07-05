"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  Menu,
  Shield,
  Users,
  MessageSquare,
  Building2,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/stats", label: "Statistics", icon: BarChart3 },
  { href: "/admin/menu", label: "Navigation Menu", icon: Menu },
  { href: "/admin/services", label: "Services", icon: Shield },
  { href: "/admin/panelists", label: "Panelists", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/institutions", label: "Institutions", icon: Building2 },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="w-64 bg-gold text-white border-r border-blue-700 min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-blue-400/40">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        <p className="text-xs text-blue-100 mt-1">Manage your website</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-white/20 text-white font-medium"
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-400/40 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-200 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
