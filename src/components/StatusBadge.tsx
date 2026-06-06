import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/30",
  Pending: "bg-warning/15 text-warning border-warning/30",
  Suspended: "bg-destructive/15 text-destructive border-destructive/30",
  Open: "bg-info/15 text-info border-info/30",
  Closed: "bg-muted text-muted-foreground border-border",
  Awarded: "bg-success/15 text-success border-success/30",
  Paid: "bg-success/15 text-success border-success/30",
  Overdue: "bg-destructive/15 text-destructive border-destructive/30",
  "In Transit": "bg-info/15 text-info border-info/30",
  Delivered: "bg-success/15 text-success border-success/30",
  Acknowledged: "bg-accent text-accent-foreground border-border",
  High: "bg-destructive/15 text-destructive border-destructive/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = map[status] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border", cls)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}
