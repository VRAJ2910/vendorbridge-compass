import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, FileBarChart2, Plus, TrendingDown, TrendingUp, Users, FileText, CheckSquare, Receipt } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { rfqs, invoices, activities, spendTrend, rfqStatus, vendorPerf } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

const stats = [
  { label: "Active RFQs", value: "24", delta: "+12%", up: true, icon: FileText, hint: "vs last month" },
  { label: "Pending Approvals", value: "8", delta: "-3", up: false, icon: CheckSquare, hint: "awaiting action" },
  { label: "Monthly Spend", value: "$548K", delta: "+8.4%", up: true, icon: TrendingUp, hint: "$600K budget" },
  { label: "Open Invoices", value: "12", delta: "+2", up: true, icon: Receipt, hint: "$316K total" },
];

function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Procurement Dashboard"
        description="Welcome back, Priya. Here's what's happening across your supply chain."
        actions={
          <>
            <Button variant="outline" size="sm"><FileBarChart2 className="h-4 w-4 mr-1.5" />Generate report</Button>
            <Button asChild size="sm"><Link to="/rfqs/new"><Plus className="h-4 w-4 mr-1.5" />Create RFQ</Link></Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden">
            <CardContent className="p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-lg bg-primary/10 grid place-items-center text-primary"><s.icon className="h-4 w-4" /></div>
                <span className={`text-[11px] inline-flex items-center gap-0.5 font-medium ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{s.delta}
                </span>
              </div>
              <div className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label} · {s.hint}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Procurement Spend Trend</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Last 6 months · USD thousands</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View report <ArrowUpRight className="h-3 w-3 ml-1" /></Button>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendTrend} margin={{ left: -10, right: 5, top: 5, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="budget" stroke="var(--muted-foreground)" strokeDasharray="4 4" fill="transparent" />
                  <Area type="monotone" dataKey="spend" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">RFQ Status Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={rfqStatus} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                    {rfqStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-primary" />Vendor Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorPerf} margin={{ left: -20, right: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="score" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent RFQs</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs"><Link to="/rfqs">View all <ArrowUpRight className="h-3 w-3 ml-1" /></Link></Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>RFQ ID</TableHead><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Value</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {rfqs.slice(0, 5).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="max-w-[280px] truncate">{r.title}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell className="text-right font-medium">${r.value.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Invoices</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs"><Link to="/invoices">View all <ArrowUpRight className="h-3 w-3 ml-1" /></Link></Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Invoice</TableHead><TableHead>Vendor</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {invoices.slice(0, 5).map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="font-mono text-xs">{i.id}</TableCell>
                    <TableCell className="truncate max-w-[200px]">{i.vendor}</TableCell>
                    <TableCell><StatusBadge status={i.status} /></TableCell>
                    <TableCell className="text-right font-medium">${i.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Activities</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs"><Link to="/activity">View all <ArrowUpRight className="h-3 w-3 ml-1" /></Link></Button>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-border ml-2 space-y-4">
              {activities.slice(0, 5).map((a) => (
                <li key={a.id} className="pl-4 relative">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
                  <div className="text-sm"><span className="font-medium">{a.actor}</span> <span className="text-muted-foreground">{a.action}</span> <span className="font-medium">{a.target}</span></div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.time}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
