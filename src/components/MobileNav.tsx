import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, FileText, Receipt, Activity } from "lucide-react";

const items = [
  { url: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { url: "/vendors", icon: Users, label: "Vendors" },
  { url: "/rfqs", icon: FileText, label: "RFQs" },
  { url: "/invoices", icon: Receipt, label: "Invoices" },
  { url: "/activity", icon: Activity, label: "Activity" },
];

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur grid grid-cols-5">
      {items.map((it) => {
        const active = pathname.startsWith(it.url);
        const Icon = it.icon;
        return (
          <Link key={it.url} to={it.url} className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
            <Icon className="h-5 w-5" />
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
