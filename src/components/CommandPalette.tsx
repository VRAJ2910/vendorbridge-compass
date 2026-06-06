import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import { LayoutDashboard, Users, FileText, Send, GitCompareArrows, CheckSquare, ShoppingCart, Receipt, FileBarChart2, Activity, Plus } from "lucide-react";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const go = (to: string) => { onOpenChange(false); navigate({ to }); };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => go("/rfqs/new")}><Plus className="h-4 w-4 mr-2" />Create new RFQ</CommandItem>
          <CommandItem onSelect={() => go("/vendors")}><Plus className="h-4 w-4 mr-2" />Add vendor</CommandItem>
          <CommandItem onSelect={() => go("/reports")}><FileBarChart2 className="h-4 w-4 mr-2" />Generate report</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/dashboard")}><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</CommandItem>
          <CommandItem onSelect={() => go("/vendors")}><Users className="h-4 w-4 mr-2" />Vendors</CommandItem>
          <CommandItem onSelect={() => go("/rfqs")}><FileText className="h-4 w-4 mr-2" />RFQs</CommandItem>
          <CommandItem onSelect={() => go("/quotations")}><Send className="h-4 w-4 mr-2" />Quotations</CommandItem>
          <CommandItem onSelect={() => go("/comparison")}><GitCompareArrows className="h-4 w-4 mr-2" />Comparison</CommandItem>
          <CommandItem onSelect={() => go("/approvals")}><CheckSquare className="h-4 w-4 mr-2" />Approvals</CommandItem>
          <CommandItem onSelect={() => go("/purchase-orders")}><ShoppingCart className="h-4 w-4 mr-2" />Purchase Orders</CommandItem>
          <CommandItem onSelect={() => go("/invoices")}><Receipt className="h-4 w-4 mr-2" />Invoices</CommandItem>
          <CommandItem onSelect={() => go("/reports")}><FileBarChart2 className="h-4 w-4 mr-2" />Reports</CommandItem>
          <CommandItem onSelect={() => go("/activity")}><Activity className="h-4 w-4 mr-2" />Activity</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
