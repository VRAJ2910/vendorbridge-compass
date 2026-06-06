import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, FileText, Send, CheckSquare, ShoppingCart, Receipt } from "lucide-react";
import { activities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/activity")({ component: ActivityPage });

const iconMap = {
  rfq: { icon: FileText, color: "text-info bg-info/10" },
  quote: { icon: Send, color: "text-primary bg-primary/10" },
  approval: { icon: CheckSquare, color: "text-success bg-success/10" },
  po: { icon: ShoppingCart, color: "text-warning bg-warning/10" },
  invoice: { icon: Receipt, color: "text-destructive bg-destructive/10" },
};

function ActivityPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");
  const filtered = activities.filter((a) =>
    (tab === "all" || a.type === tab) &&
    (a.actor.toLowerCase().includes(q.toLowerCase()) || a.target.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div>
      <PageHeader title="Activity & Audit Log" description="Every action across procurement is recorded and searchable." />
      <Card>
        <CardContent className="p-0">
          <div className="p-3 md:p-4 border-b flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search activity log…" className="pl-8" />
            </div>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="rfq">RFQs</TabsTrigger>
                <TabsTrigger value="quote">Quotations</TabsTrigger>
                <TabsTrigger value="approval">Approvals</TabsTrigger>
                <TabsTrigger value="po">POs</TabsTrigger>
                <TabsTrigger value="invoice">Invoices</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ol className="divide-y">
            {filtered.map((a) => {
              const meta = iconMap[a.type];
              return (
                <li key={a.id} className="p-4 flex items-start gap-3 hover:bg-muted/30">
                  <div className={cn("h-9 w-9 rounded-lg grid place-items-center shrink-0", meta.color)}>
                    <meta.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-medium">{a.actor}</span> <span className="text-muted-foreground">{a.action}</span> <span className="font-medium">{a.target}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                      <Avatar className="h-4 w-4"><AvatarFallback className="text-[8px] bg-muted">{a.actor.split(" ").map(w=>w[0]).slice(0,2).join("")}</AvatarFallback></Avatar>
                      {a.time} · audit-id {String(a.id).padStart(6, "0")}
                    </div>
                  </div>
                </li>
              );
            })}
            {filtered.length === 0 && <li className="p-12 text-center text-sm text-muted-foreground">No activity matches your filters.</li>}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
