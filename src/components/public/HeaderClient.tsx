"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Shield } from "lucide-react";

type MenuItem = {
  id: string;
  title: string;
  href: string | null;
  children: MenuItem[];
};

type Props = {
  siteName: string;
  tagline: string;
  menuItems: MenuItem[];
};

function DropdownLink({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children.length > 0;

  if (hasChildren) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-surface cursor-default rounded-lg mx-1">
          <span>{item.title}</span>
          <ChevronRight className="w-4 h-4 text-gold shrink-0" />
        </div>
        {open && (
          <div className="absolute left-full top-0 min-w-[300px] bg-white border border-dark-border rounded-xl shadow-[var(--shadow-lg)] py-2 z-50 ml-1">
            {item.children.map((child) => (
              <DropdownLink key={child.id} item={child} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      onClick={onNavigate}
      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-surface hover:text-gold transition-colors rounded-lg mx-1"
    >
      {item.title}
    </Link>
  );
}

function MobileMenuSection({
  item,
  depth = 0,
  onNavigate,
}: {
  item: MenuItem;
  depth?: number;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (item.children.length > 0) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-3.5 text-sm border-b border-dark-border/60 hover:bg-surface"
          style={{ paddingLeft: `${16 + depth * 16}px`, paddingRight: "16px" }}
        >
          <span className={depth === 0 ? "font-semibold text-foreground" : "text-gold font-medium"}>
            {item.title}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open &&
          item.children.map((child) => (
            <MobileMenuSection
              key={child.id}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      onClick={onNavigate}
      className="block py-3 text-sm font-medium text-gold hover:bg-surface border-b border-dark-border/40"
      style={{ paddingLeft: `${32 + depth * 16}px` }}
    >
      {item.title}
    </Link>
  );
}

export default function HeaderClient({ siteName, tagline, menuItems }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-dark-border/80 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-[4.5rem]">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg lg:text-xl font-extrabold text-gradient-gold tracking-wide block leading-none">
                {siteName}
              </span>
              <span className="text-[10px] text-muted tracking-[0.2em] uppercase font-medium">
                {tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) =>
              item.children.length > 0 ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-[13px] text-foreground/80 hover:text-gold font-semibold uppercase tracking-wide transition-colors rounded-lg hover:bg-surface">
                    {item.title}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === item.id && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="min-w-[280px] bg-white border border-dark-border rounded-xl shadow-[var(--shadow-lg)] py-2 overflow-hidden">
                        <div className="h-1 gradient-gold" />
                        {item.children.map((child) => (
                          <DropdownLink key={child.id} item={child} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.href ?? "/"}
                  className={`px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-all duration-300 rounded-lg hover:bg-surface hover:text-gold hover:scale-105 ${
                    item.title === "Home"
                      ? "capitalize text-foreground/80"
                      : "text-foreground/80"
                  }`}
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-surface text-gold ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-dark-border max-h-[80vh] overflow-y-auto shadow-lg">
          {menuItems.map((item) =>
            item.href && item.children.length === 0 ? (
              <Link
                key={item.id}
                href={item.href}
                className="block px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-surface border-b border-dark-border/40 capitalize"
                onClick={closeMobile}
              >
                {item.title}
              </Link>
            ) : (
              <MobileMenuSection key={item.id} item={item} onNavigate={closeMobile} />
            )
          )}
        </div>
      )}
    </header>
  );
}
