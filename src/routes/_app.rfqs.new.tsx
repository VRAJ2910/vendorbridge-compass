import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, FileUp, Plus, Save, Trash2, Upload } from "lucide-react";
import { vendors } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/rfqs/new")({ component: NewRFQ });

const steps = ["RFQ Information", "Items", "Vendors", "Attachments", "Review"];

function NewRFQ() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("CNC Machining Spare Parts - Q3");
  const [desc, setDesc] = useState("Procurement of precision-machined spare parts for Plant 2 CNC line, 90-day lead.");
  const [category, setCategory] = useState("raw");
  const [priority, setPriority] = useState("High");
  const [items, setItems] = useState([
    { id: 1, product: "Aluminum bracket A-203", qty: 500, unit: "pcs" },
    { id: 2, product: "Steel shaft S-118 (heat-treated)", qty: 200, unit: "pcs" },
  ]);
  const [selected, setSelected] = useState<string[]>(["V-1042", "V-1046", "V-1043"]);
  const [files, setFiles] = useState<string[]>(["Spec_Sheet_v3.pdf", "BOM_Drawing.dwg"]);

  function addItem() {
    setItems([...items, { id: Date.now(), product: "", qty: 1, unit: "pcs" }]);
  }
  function removeItem(id: number) { setItems(items.filter(i => i.id !== id)); }

  function publish() {
    toast.success("RFQ published to 3 vendors");
    navigate({ to: "/rfqs" });
  }

  return (
    <div>
      <PageHeader title="Create RFQ" description="Build a structured request for quotation in 5 steps." />

      <Card className="mb-5">
        <CardContent className="p-4 md:p-5">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 md:gap-4 shrink-0">
                <div className={`h-8 w-8 rounded-full grid place-items-center text-xs font-semibold border ${i < step ? "bg-success text-success-foreground border-success" : i === step ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <div className={`text-sm font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                {i < steps.length - 1 && <div className="w-6 md:w-12 h-px bg-border" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 md:p-6">
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <div className="md:col-span-2 space-y-1.5"><Label>RFQ Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div className="md:col-span-2 space-y-1.5"><Label>Description</Label><Textarea rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="raw">Raw Materials</SelectItem>
                    <SelectItem value="it">IT Services</SelectItem>
                    <SelectItem value="log">Logistics</SelectItem>
                    <SelectItem value="pkg">Packaging</SelectItem>
                    <SelectItem value="tool">Tools & Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="High">High</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Low">Low</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div><div className="font-medium">Line items</div><div className="text-xs text-muted-foreground">Add products and quantities you're requesting quotes for.</div></div>
                <Button size="sm" variant="outline" onClick={addItem}><Plus className="h-4 w-4 mr-1.5" />Add item</Button>
              </div>
              <Table>
                <TableHeader><TableRow><TableHead>Product / Description</TableHead><TableHead className="w-[120px]">Quantity</TableHead><TableHead className="w-[120px]">Unit</TableHead><TableHead className="w-[60px]"></TableHead></TableRow></TableHeader>
                <TableBody>
                  {items.map((it) => (
                    <TableRow key={it.id}>
                      <TableCell><Input value={it.product} onChange={(e) => setItems(items.map(x => x.id === it.id ? { ...x, product: e.target.value } : x))} /></TableCell>
                      <TableCell><Input type="number" value={it.qty} onChange={(e) => setItems(items.map(x => x.id === it.id ? { ...x, qty: +e.target.value } : x))} /></TableCell>
                      <TableCell>
                        <Select value={it.unit} onValueChange={(v) => setItems(items.map(x => x.id === it.id ? { ...x, unit: v } : x))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="pcs">pcs</SelectItem><SelectItem value="kg">kg</SelectItem><SelectItem value="L">L</SelectItem><SelectItem value="hrs">hrs</SelectItem></SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell><Button variant="ghost" size="icon" onClick={() => removeItem(it.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="font-medium mb-1">Invite vendors</div>
              <div className="text-xs text-muted-foreground mb-3">{selected.length} vendor{selected.length !== 1 && "s"} selected</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[420px] overflow-auto">
                {vendors.map((v) => {
                  const checked = selected.includes(v.id);
                  return (
                    <label key={v.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${checked ? "border-primary bg-primary/5" : "hover:bg-muted/40"}`}>
                      <Checkbox checked={checked} onCheckedChange={(c) => setSelected(c ? [...selected, v.id] : selected.filter(x => x !== v.id))} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{v.name}</div>
                        <div className="text-[11px] text-muted-foreground">{v.category} · ★ {v.rating}</div>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{v.status}</Badge>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="font-medium mb-3">Attachments</div>
              <label className="border-2 border-dashed border-border rounded-xl p-10 grid place-items-center text-center hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer">
                <div className="h-12 w-12 rounded-full bg-primary/10 grid place-items-center mb-3 text-primary"><Upload className="h-5 w-5" /></div>
                <div className="text-sm font-medium">Drop files here or click to browse</div>
                <div className="text-xs text-muted-foreground mt-1">PDF, DOCX, DWG up to 25MB</div>
                <input type="file" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setFiles([...files, e.target.files[0].name]); }} />
              </label>
              <div className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                    <FileUp className="h-4 w-4 text-primary" />
                    <span className="text-sm flex-1 truncate">{f}</span>
                    <Button variant="ghost" size="icon" onClick={() => setFiles(files.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 max-w-3xl">
              <div className="font-medium">Review & submit</div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="border rounded-lg p-4"><div className="text-xs text-muted-foreground">Title</div><div className="font-medium mt-1">{title}</div></div>
                <div className="border rounded-lg p-4"><div className="text-xs text-muted-foreground">Priority</div><div className="font-medium mt-1">{priority}</div></div>
                <div className="border rounded-lg p-4"><div className="text-xs text-muted-foreground">Items</div><div className="font-medium mt-1">{items.length} line items</div></div>
                <div className="border rounded-lg p-4"><div className="text-xs text-muted-foreground">Vendors invited</div><div className="font-medium mt-1">{selected.length} vendors</div></div>
                <div className="border rounded-lg p-4 md:col-span-2"><div className="text-xs text-muted-foreground">Attachments</div><div className="font-medium mt-1">{files.join(", ") || "None"}</div></div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-5 border-t">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft className="h-4 w-4 mr-1.5" />Back</Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => toast.success("Draft saved")}><Save className="h-4 w-4 mr-1.5" />Save draft</Button>
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep(step + 1)}>Next<ArrowRight className="h-4 w-4 ml-1.5" /></Button>
              ) : (
                <Button onClick={publish}>Publish RFQ</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
