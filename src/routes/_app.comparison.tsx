import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Check, Download, Star, Truck, X } from "lucide-react";
import { comparisonData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/comparison")({ component: Comparison });

function Comparison() {
  const vendors = comparisonData.vendors;
  const minPrice = Math.min(...vendors.map(v => v.price));
  const minDelivery = Math.min(...vendors.map(v => parseInt(v.delivery)));
  const maxRating = Math.max(...vendors.map(v => v.rating));

  const rows: { label: string; key: keyof typeof vendors[0]; best?: (v: typeof vendors[0]) => boolean; render?: (v: typeof vendors[0]) => React.ReactNode; }[] = [
    { label: "Price", key: "price", best: (v) => v.price === minPrice, render: (v) => `$${v.price.toLocaleString()}` },
    { label: "Delivery Time", key: "delivery", best: (v) => parseInt(v.delivery) === minDelivery },
    { label: "Vendor Rating", key: "rating", best: (v) => v.rating === maxRating, render: (v) => <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning fill-warning" />{v.rating}</span> },
    { label: "Compliance Score", key: "compliance", render: (v) => `${v.compliance}%` },
    { label: "Warranty", key: "warranty" },
  ];

  return (
    <div>
      <PageHeader
        title="Quotation Comparison"
        description={comparisonData.rfq}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => toast.success("Export queued")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
        </>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { icon: Award, label: "Lowest price", value: vendors.find(v => v.price === minPrice)!.name, color: "text-success" },
          { icon: Truck, label: "Fastest delivery", value: vendors.find(v => parseInt(v.delivery) === minDelivery)!.name, color: "text-info" },
          { icon: Star, label: "Best rated", value: vendors.find(v => v.rating === maxRating)!.name, color: "text-warning" },
          { icon: Check, label: "Recommended", value: vendors.find(v => v.recommended)!.name, color: "text-primary" },
        ].map((h, i) => (
          <Card key={i}><CardContent className="p-4">
            <div className={cn("h-9 w-9 rounded-lg grid place-items-center mb-2", h.color, "bg-current/10")}><h.icon className={cn("h-4 w-4", h.color)} /></div>
            <div className="text-[11px] text-muted-foreground">{h.label}</div>
            <div className="text-sm font-medium mt-0.5 truncate">{h.value}</div>
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left text-xs uppercase tracking-wider text-muted-foreground font-medium p-4 w-[180px]">Criteria</th>
                {vendors.map((v) => (
                  <th key={v.name} className={cn("p-4 text-left min-w-[200px]", v.recommended && "bg-primary/5")}>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-sm">{v.name}</div>
                      {v.recommended && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">RECOMMENDED</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b last:border-0">
                  <td className="p-4 text-sm font-medium text-muted-foreground">{row.label}</td>
                  {vendors.map((v) => {
                    const isBest = row.best?.(v);
                    return (
                      <td key={v.name} className={cn("p-4 text-sm", v.recommended && "bg-primary/5")}>
                        <span className={cn("inline-flex items-center gap-1.5", isBest && "font-semibold text-success")}>
                          {row.render ? row.render(v) : String(v[row.key])}
                          {isBest && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                {vendors.map((v) => (
                  <td key={v.name} className={cn("p-4", v.recommended && "bg-primary/5")}>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-8 flex-1" onClick={() => toast.success(`${v.name} selected`)}><Check className="h-3.5 w-3.5 mr-1" />Select</Button>
                      <Button size="sm" variant="outline" className="h-8" onClick={() => toast(`${v.name} rejected`)}><X className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
