import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Filter, MoreHorizontal, Plus, Search, Star } from "lucide-react";
import { vendors } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/vendors")({ component: Vendors });

function Vendors() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(() => vendors.filter((v) =>
    (status === "all" || v.status === status) &&
    (v.name.toLowerCase().includes(q.toLowerCase()) || v.category.toLowerCase().includes(q.toLowerCase()))
  ), [q, status]);

  return (
    <div>
      <PageHeader
        title="Vendors"
        description="Manage your vendor master list, compliance, and performance ratings."
        actions={
          <Dialog>
            <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Add vendor</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new vendor</DialogTitle>
                <DialogDescription>Vendor onboarding starts with basic details. Compliance documents can be added later.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="col-span-2 space-y-1.5"><Label>Vendor name</Label><Input placeholder="Acme Industries Pvt Ltd" /></div>
                <div className="space-y-1.5"><Label>Category</Label><Input placeholder="Raw Materials" /></div>
                <div className="space-y-1.5"><Label>GST / Tax ID</Label><Input placeholder="27AABCS1234A1Z5" /></div>
                <div className="space-y-1.5"><Label>Contact person</Label><Input placeholder="Full name" /></div>
                <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="name@vendor.com" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Vendor onboarded")}>Create vendor</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-2 p-3 md:p-4 border-b">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search vendors, category, GST…" className="pl-8" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9"><Filter className="h-4 w-4 mr-1.5" />Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>GST / Tax ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">{v.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</AvatarFallback></Avatar>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{v.name}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{v.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-sm">{v.category}</span></TableCell>
                  <TableCell className="font-mono text-xs">{v.gst}</TableCell>
                  <TableCell>
                    <div className="text-sm">{v.contact}</div>
                    <div className="text-[11px] text-muted-foreground">{v.email}</div>
                  </TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm font-medium"><Star className="h-3.5 w-3.5 text-warning fill-warning" />{v.rating.toFixed(1)}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit vendor</DropdownMenuItem>
                        <DropdownMenuItem>Invite to RFQ</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-12 text-sm text-muted-foreground">No vendors match your filters.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
