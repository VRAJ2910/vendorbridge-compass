import { Link } from "@tanstack/react-router";

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Link to="/dashboard" className="flex items-center gap-2.5 select-none">
      <div className="relative grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-info shadow-sm">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h10l3 5-3 5H4z" />
          <path d="M14 7h6l-3 5 3 5h-6" opacity=".6" />
        </svg>
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <div className="font-semibold text-[15px] tracking-tight">VendorBridge</div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Procurement ERP</div>
        </div>
      )}
    </Link>
  );
}
