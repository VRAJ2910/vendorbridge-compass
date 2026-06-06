import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Calendar, Users, Layers } from "lucide-react";
import { rfqs } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/rfqs")({ component: RFQs });

function RFQs() {
  const [q, setQ] = useState("");
  const filtered = rfqs.filter((r) => r.title.toLowerCase().includes(q.toLowerCase()) || r.id.toLowerCase().includes(q.toLowerCase()));
  const stats = [
    { label: "Open RFQs", value: rfqs.filter(r => r.status === "Open").length, icon: Layers },
    { label: "Closing this week", value: 3, icon: Calendar },
    { label: "Avg vendors per RFQ", value: 5, icon: Users },
  ];
  return (
    <div>
      <PageHeader
        title="Request for Quotations"
        description="Track, manage, and award RFQs across your supply chain."
        actions={<Button asChild size="sm"><Link to="/rfqs/new"><Plus className="h-4 w-4 mr-1.5" />Create RFQ</Link></Button>}
      />
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5">
        {stats.map((s) => (
          <Card key={s.label}><CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary"><s.icon className="h-4 w-4" /></div>
            <div><div className="text-xl font-semibold">{s.value}</div><div className="text-[11px] text-muted-foreground">{s.label}</div></div>
          </CardContent></Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="p-3 md:p-4 border-b flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search RFQs…" className="pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RFQ</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-center">Quotes</TableHead>
                <TableHead className="text-right">Est. Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="cursor-pointer hover:bg-muted/40">
                  <TableCell>
                    <div className="font-medium text-sm">{r.title}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">{r.id}</div>
                  </TableCell>
                  <TableCell className="text-sm">{r.category}</TableCell>
                  <TableCell><StatusBadge status={r.priority} /></TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                  <TableCell className="text-sm">{r.deadline}</TableCell>
                  <TableCell className="text-center text-sm">{r.quotes}/{r.vendors}</TableCell>
                  <TableCell className="text-right font-medium">${r.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
