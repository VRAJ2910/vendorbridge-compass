import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText, Paperclip, Save, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/quotations")({ component: Quotations });

function Quotations() {
  const [unitPrice, setUnitPrice] = useState(369);
  const qty = 500;
  const subtotal = unitPrice * qty;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div>
      <PageHeader
        title="Submit Quotation"
        description="Vendor portal · RFQ-2026-0421 · CNC Machining Spare Parts"
        actions={<>
          <Button variant="outline" size="sm" onClick={() => toast.success("Draft saved")}><Save className="h-4 w-4 mr-1.5" />Save draft</Button>
          <Button size="sm" onClick={() => toast.success("Quotation submitted")}><Send className="h-4 w-4 mr-1.5" />Submit quotation</Button>
        </>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />RFQ Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">RFQ ID</div><div className="font-mono mt-0.5">RFQ-2026-0421</div></div>
              <div><div className="text-xs text-muted-foreground">Category</div><div className="mt-0.5">Raw Materials</div></div>
              <div><div className="text-xs text-muted-foreground">Priority</div><div className="mt-0.5"><StatusBadge status="High" /></div></div>
              <div><div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Deadline</div><div className="mt-0.5">Jun 18, 2026</div></div>
            </div>
            <Separator />
            <div>
              <div className="text-xs text-muted-foreground mb-1">Description</div>
              <p className="text-sm">Procurement of precision-machined aluminum brackets and heat-treated steel shafts for CNC line at Plant 2. Vendor must comply with ISO 9001 and provide MTC for each batch.</p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Unit price (USD)</Label><Input type="number" value={unitPrice} onChange={(e) => setUnitPrice(+e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Delivery timeline</Label><Input defaultValue="14 working days" /></div>
              <div className="space-y-1.5"><Label>Warranty</Label><Input defaultValue="24 months" /></div>
              <div className="space-y-1.5"><Label>Payment terms</Label><Input defaultValue="Net 30" /></div>
              <div className="md:col-span-2 space-y-1.5"><Label>Notes</Label><Textarea rows={3} placeholder="Add quality certifications, packaging info, etc." /></div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Paperclip className="h-3 w-3" />Attachments from buyer</div>
              <div className="flex flex-wrap gap-2">
                {["Spec_Sheet_v3.pdf", "BOM_Drawing.dwg", "QA_Requirements.pdf"].map((f) => (
                  <span key={f} className="px-2.5 py-1 rounded-md border bg-muted/40 text-xs flex items-center gap-1.5"><FileText className="h-3 w-3 text-primary" />{f}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Quotation Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Qty</span><span>{qty} pcs</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Unit price</span><span>${unitPrice.toFixed(2)}</span></div>
              <Separator />
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>${tax.toLocaleString()}</span></div>
              <Separator />
              <div className="flex justify-between text-base font-semibold"><span>Grand total</span><span>${total.toLocaleString()}</span></div>
            </div>
            <Button className="w-full mt-5" onClick={() => toast.success("Quotation submitted")}>Submit quotation</Button>
            <p className="text-[11px] text-muted-foreground mt-3 text-center">By submitting you confirm pricing is valid for 30 days.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
