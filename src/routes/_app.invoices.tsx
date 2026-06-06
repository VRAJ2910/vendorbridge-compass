import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search } from "lucide-react";
import { invoices } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/invoices")({ component: Invoices });

function Invoices() {
  const totals = {
    paid: invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0),
    pending: invoices.filter(i => i.status === "Pending").reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0),
  };
  return (
    <div>
      <PageHeader title="Invoices" description="Track invoice status, due dates, and payment history."
        actions={<Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>} />
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5">
        <Card><CardContent className="p-4"><div className="text-[11px] text-muted-foreground">Paid this month</div><div className="text-2xl font-semibold text-success mt-1">${totals.paid.toLocaleString()}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-[11px] text-muted-foreground">Pending</div><div className="text-2xl font-semibold text-warning mt-1">${totals.pending.toLocaleString()}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-[11px] text-muted-foreground">Overdue</div><div className="text-2xl font-semibold text-destructive mt-1">${totals.overdue.toLocaleString()}</div></CardContent></Card>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="p-3 md:p-4 border-b">
            <div className="relative max-w-md"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search invoices…" className="pl-8" /></div>
          </div>
          <Table>
            <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Vendor</TableHead><TableHead>PO</TableHead><TableHead>Due date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
            <TableBody>
              {invoices.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-mono text-xs">{i.id}</TableCell>
                  <TableCell>{i.vendor}</TableCell>
                  <TableCell className="font-mono text-xs">{i.po}</TableCell>
                  <TableCell className="text-sm">{i.due}</TableCell>
                  <TableCell><StatusBadge status={i.status} /></TableCell>
                  <TableCell className="text-right font-medium">${i.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
