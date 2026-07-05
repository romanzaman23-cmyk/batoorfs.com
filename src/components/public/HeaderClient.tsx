"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

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
  nested = false,
}: {
  item: MenuItem;
  onNavigate?: () => void;
  nested?: boolean;
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
        <div className="flex items-center justify-between px-4 py-2.5 text-sm text-gold hover:bg-dark-card cursor-default">
          <span>{item.title}</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-2" />
        </div>
        {open && (
          <div className="absolute left-full top-0 min-w-[320px] bg-white border border-dark-border shadow-xl py-2 z-50">
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
      className={`block px-4 py-2.5 text-sm text-gold hover:bg-dark-card transition-colors ${
        nested ? "" : ""
      }`}
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
  const padding = 6 + depth * 4;

  if (item.children.length > 0) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-${padding} py-3 text-sm border-b border-dark-border`}
          style={{ paddingLeft: `${padding * 4}px` }}
        >
          <span className={depth === 0 ? "font-semibold text-foreground" : "text-gold"}>
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
      className="block py-2.5 text-sm text-gold hover:bg-dark-card border-b border-dark-border/50"
      style={{ paddingLeft: `${(padding + 4) * 4}px` }}
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-dark-border shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-20">
          <Link href="/" className="flex flex-col shrink-0">
            <span className="text-xl lg:text-2xl font-bold text-gradient-gold tracking-wider">
              {siteName}
            </span>
            <span className="text-[10px] lg:text-xs text-muted tracking-[0.3em] uppercase">
              {tagline}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center flex-wrap">
            {menuItems.map((item) =>
              item.children.length > 0 ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-gold hover:text-gold-light transition-colors uppercase tracking-wide font-medium">
                    {item.title}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDropdown === item.id && (
                    <div className="absolute top-full left-0 min-w-[280px] bg-white border border-dark-border shadow-xl pt-0 pb-2 z-50">
                      <div className="border-t-2 border-gold" />
                      {item.children.map((child) => (
                        <DropdownLink key={child.id} item={child} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.href ?? "/"}
                  className={`px-3 py-2 text-sm text-gold hover:text-gold-light transition-colors tracking-wide font-medium ${
                    item.title === "Home" ? "capitalize" : "uppercase"
                  }`}
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>

          <button
            className="md:hidden text-gold ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-dark-border max-h-[80vh] overflow-y-auto">
          {menuItems.map((item) =>
            item.href && item.children.length === 0 ? (
              <Link
                key={item.id}
                href={item.href}
                className="block px-6 py-3 text-sm text-gold hover:bg-dark-card border-b border-dark-border capitalize"
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
