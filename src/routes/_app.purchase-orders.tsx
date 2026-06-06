import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, Mail, Printer } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/_app/purchase-orders")({ component: POs });

const lineItems = [
  { desc: "Aluminum bracket A-203", qty: 500, unit: 245.00, tax: 18 },
  { desc: "Steel shaft S-118 (heat-treated)", qty: 200, unit: 312.50, tax: 18 },
];

function POs() {
  const subtotal = lineItems.reduce((s, i) => s + i.qty * i.unit, 0);
  const tax = lineItems.reduce((s, i) => s + (i.qty * i.unit * i.tax) / 100, 0);
  const total = subtotal + tax;

  return (
    <div>
      <PageHeader
        title="Purchase Order & Invoice"
        description="Document view — issue, print, or email procurement documents."
        actions={<>
          <Button variant="outline" size="sm" onClick={() => toast.success("PDF downloaded")}><Download className="h-4 w-4 mr-1.5" />PDF</Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Printing")}><Printer className="h-4 w-4 mr-1.5" />Print</Button>
          <Button size="sm" onClick={() => toast.success("Email sent to vendor")}><Mail className="h-4 w-4 mr-1.5" />Email vendor</Button>
        </>}
      />

      <Tabs defaultValue="po">
        <TabsList>
          <TabsTrigger value="po">Purchase Order</TabsTrigger>
          <TabsTrigger value="inv">Invoice</TabsTrigger>
        </TabsList>
        <TabsContent value="po" className="mt-4">
          <DocCard kind="Purchase Order" docId="PO-50211" status="Acknowledged" lineItems={lineItems} subtotal={subtotal} tax={tax} total={total} />
        </TabsContent>
        <TabsContent value="inv" className="mt-4">
          <DocCard kind="Invoice" docId="INV-88210" status="Pending" lineItems={lineItems} subtotal={subtotal} tax={tax} total={total} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DocCard({ kind, docId, status, lineItems, subtotal, tax, total }: {
  kind: string; docId: string; status: string;
  lineItems: typeof lineItems; subtotal: number; tax: number; total: number;
}) {
  return (
    <Card className="max-w-5xl mx-auto">
      <CardContent className="p-6 md:p-10">
        <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
          <div>
            <Logo />
            <div className="text-xs text-muted-foreground mt-3 leading-relaxed">
              VendorBridge Procurement Ltd.<br />
              Level 12, BKC, Mumbai 400051, India<br />
              GST: 27AAACV1234A1Z5
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{kind}</div>
            <div className="text-2xl font-semibold mt-1 font-mono">{docId}</div>
            <div className="mt-2"><StatusBadge status={status} /></div>
            <div className="text-xs text-muted-foreground mt-3">Issued: Jun 2, 2026<br />Due: Jun 20, 2026</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Vendor</div>
            <div className="font-semibold">Steelworks India Pvt Ltd</div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Plot 14B, MIDC Industrial Estate<br />
              Pune 411019 · India<br />
              GST: 27AABCS1234A1Z5
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Ship to</div>
            <div className="font-semibold">VendorBridge Plant 2</div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Survey No. 88, Chakan Phase III<br />
              Pune 410501 · India<br />
              Attn: Karthik R.
            </div>
          </div>
        </div>

        <Table>
          <TableHeader><TableRow>
            <TableHead>Item</TableHead><TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Unit price</TableHead><TableHead className="text-right">Tax</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {lineItems.map((i, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{i.desc}</TableCell>
                <TableCell className="text-right">{i.qty}</TableCell>
                <TableCell className="text-right">${i.unit.toFixed(2)}</TableCell>
                <TableCell className="text-right">{i.tax}%</TableCell>
                <TableCell className="text-right font-medium">${(i.qty * i.unit * (1 + i.tax/100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-6">
          <div className="w-full md:w-72 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>${tax.toLocaleString()}</span></div>
            <Separator />
            <div className="flex justify-between text-base font-semibold"><span>Grand total</span><span>${total.toLocaleString()}</span></div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-xs text-muted-foreground">
          Payment terms: Net 30. Bank transfer to HDFC Bank A/C ****5421. For queries contact finance@vendorbridge.io.
        </div>
      </CardContent>
    </Card>
  );
}
