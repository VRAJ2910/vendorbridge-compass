import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, FunnelChart, Funnel, LabelList } from "recharts";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { spendTrend, spendByCategory, vendorPerf, vendors, rfqs } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/reports")({ component: Reports });

const funnelData = [
  { name: "RFQs Issued", value: 87, fill: "var(--chart-1)" },
  { name: "Quotes Received", value: 64, fill: "var(--chart-2)" },
  { name: "Shortlisted", value: 42, fill: "var(--chart-3)" },
  { name: "Awarded", value: 28, fill: "var(--chart-4)" },
];

function Reports() {
  return (
    <div>
      <PageHeader title="Reports & Analytics" description="Executive-level visibility into procurement performance."
        actions={<>
          <Button variant="outline" size="sm" onClick={() => toast.success("PDF exported")}><FileText className="h-4 w-4 mr-1.5" />PDF</Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Excel exported")}><FileSpreadsheet className="h-4 w-4 mr-1.5" />Excel</Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("CSV exported")}><Download className="h-4 w-4 mr-1.5" />CSV</Button>
        </>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: "Total Procurement Spend", value: "$4.7M", sub: "YTD 2026" },
          { label: "Active Vendors", value: "186", sub: "+12 this quarter" },
          { label: "RFQ Success Rate", value: "73%", sub: "+4.2% vs Q1" },
          { label: "Open Invoices", value: "$316K", sub: "12 invoices" },
        ].map((s) => (
          <Card key={s.label}><CardContent className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="text-3xl font-semibold mt-2 tracking-tight">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Procurement Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendTrend} margin={{ left: -10, right: 5 }}>
                  <defs><linearGradient id="r1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} /><stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="spend" stroke="var(--chart-2)" strokeWidth={2.5} fill="url(#r1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Spend by Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={spendByCategory} dataKey="value" nameKey="name" outerRadius={90} label={(e) => e.name}>
                    {spendByCategory.map((_, i) => <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Vendor Performance Index</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorPerf} margin={{ left: -20, right: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="score" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Procurement Funnel</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Funnel data={funnelData} dataKey="value" isAnimationActive>
                    <LabelList dataKey="name" position="right" fill="var(--foreground)" fontSize={12} />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Top Vendors</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Vendor</TableHead><TableHead>Category</TableHead><TableHead className="text-right">Spend YTD</TableHead></TableRow></TableHeader>
              <TableBody>
                {vendors.slice(0, 5).map((v, i) => (
                  <TableRow key={v.id}><TableCell className="font-medium">{v.name}</TableCell><TableCell className="text-sm">{v.category}</TableCell>
                    <TableCell className="text-right font-medium">${(420 - i * 60).toLocaleString()}K</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Recent Procurement Activity</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>RFQ</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Value</TableHead></TableRow></TableHeader>
              <TableBody>
                {rfqs.slice(0, 5).map((r) => (
                  <TableRow key={r.id}><TableCell><div className="text-sm font-medium truncate max-w-[200px]">{r.title}</div><div className="text-[11px] text-muted-foreground font-mono">{r.id}</div></TableCell>
                    <TableCell><span className="text-sm">{r.status}</span></TableCell><TableCell className="text-right font-medium">${r.value.toLocaleString()}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
