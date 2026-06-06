import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Check, MessageSquare, ShieldCheck, X, Clock, FileText } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/approvals")({ component: Approvals });

const stages = [
  { name: "Submitted", icon: FileText, done: true, by: "Priya Sharma", at: "Jun 4, 10:24 AM" },
  { name: "Under Review", icon: Clock, done: true, by: "Neha Kapoor", at: "Jun 4, 02:15 PM" },
  { name: "Manager Approval", icon: ShieldCheck, done: true, active: false, by: "Arjun Mehra", at: "Jun 5, 09:42 AM" },
  { name: "Finance Approval", icon: Check, done: false, active: true },
  { name: "Approved", icon: Check, done: false },
];

const timeline = [
  { date: "Jun 5, 09:42 AM", user: "Arjun Mehra", action: "Approved", remarks: "Pricing within budget. Move to finance.", tone: "success" as const },
  { date: "Jun 4, 02:15 PM", user: "Neha Kapoor", action: "Reviewed", remarks: "Vendor compliance verified. ISO certificates valid.", tone: "info" as const },
  { date: "Jun 4, 10:24 AM", user: "Priya Sharma", action: "Submitted", remarks: "Recommended Steelworks India based on comparison.", tone: "info" as const },
];

const pending = [
  { id: "PO-50211", title: "Steelworks India — CNC Spare Parts", amount: 184500, requester: "Priya Sharma", waiting: "2d" },
  { id: "PO-50208", title: "Pacific Logistics — APAC Contract", amount: 215000, requester: "Vikram Iyer", waiting: "4h" },
  { id: "RFQ-2026-0419", title: "Pallet Racking System — Plant 2", amount: 62000, requester: "Karthik R.", waiting: "1d" },
];

function Approvals() {
  return (
    <div>
      <PageHeader title="Approvals" description="Review and act on pending procurement approvals." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">PO-50211 · Steelworks India</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">$184,500 · Awaiting Finance Approval</p>
              </div>
              <StatusBadge status="Pending" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between overflow-x-auto pb-2 mb-5">
              {stages.map((s, i) => (
                <div key={s.name} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center text-center w-[110px]">
                    <div className={cn("h-10 w-10 rounded-full grid place-items-center border-2",
                      s.done ? "bg-success border-success text-success-foreground" :
                      s.active ? "bg-primary border-primary text-primary-foreground animate-pulse" :
                      "bg-muted border-border text-muted-foreground")}>
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div className={cn("text-xs mt-2 font-medium", s.active && "text-primary")}>{s.name}</div>
                    {s.by && <div className="text-[10px] text-muted-foreground mt-0.5">{s.by}</div>}
                  </div>
                  {i < stages.length - 1 && <div className={cn("w-10 md:w-16 h-0.5 -mt-7", s.done ? "bg-success" : "bg-border")} />}
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-xs font-medium text-muted-foreground mb-3">APPROVAL TIMELINE</div>
              <ol className="relative border-l border-border ml-2 space-y-4">
                {timeline.map((t, i) => (
                  <li key={i} className="pl-4 relative">
                    <span className={cn("absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full ring-4",
                      t.tone === "success" ? "bg-success ring-success/15" : "bg-info ring-info/15")} />
                    <div className="flex items-center gap-2 text-sm">
                      <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px] bg-primary/10 text-primary">{t.user.split(" ").map(w=>w[0]).join("")}</AvatarFallback></Avatar>
                      <span className="font-medium">{t.user}</span>
                      <span className="text-muted-foreground">{t.action}</span>
                      <span className="text-[11px] text-muted-foreground ml-auto">{t.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 ml-8">{t.remarks}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5">
              <div className="text-sm font-medium mb-2 flex items-center gap-1.5"><MessageSquare className="h-4 w-4 text-primary" />Your remarks</div>
              <Textarea rows={3} placeholder="Add a comment for the next approver…" />
              <div className="flex gap-2 mt-3 flex-wrap">
                <Button onClick={() => toast.success("Approved")}><Check className="h-4 w-4 mr-1.5" />Approve</Button>
                <Button variant="outline" onClick={() => toast("Changes requested")}><MessageSquare className="h-4 w-4 mr-1.5" />Request changes</Button>
                <Button variant="outline" className="text-destructive border-destructive/40 hover:bg-destructive/10" onClick={() => toast.error("Rejected")}><X className="h-4 w-4 mr-1.5" />Reject</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Pending your approval</CardTitle></CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {pending.map((p) => (
                <li key={p.id} className="p-4 hover:bg-muted/40 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-mono text-xs text-muted-foreground">{p.id}</div>
                    <span className="text-[10px] text-warning font-medium">{p.waiting} waiting</span>
                  </div>
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground"><span>{p.requester}</span><span className="font-medium text-foreground">${p.amount.toLocaleString()}</span></div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
