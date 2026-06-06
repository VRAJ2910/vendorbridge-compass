import { useEffect, useState } from "react";
import { Bell, Moon, Search, Sun, Command as CmdIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CommandPalette } from "./CommandPalette";
import { useNavigate } from "@tanstack/react-router";

export function TopBar() {
  const [dark, setDark] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-3 md:px-5 gap-3">
      <SidebarTrigger />
      <button
        onClick={() => setCmdOpen(true)}
        className="hidden md:flex items-center gap-2 h-9 px-3 rounded-md border bg-muted/40 text-muted-foreground text-sm w-[340px] hover:bg-muted/70 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search RFQs, vendors, POs…</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded border bg-background flex items-center gap-1">
          <CmdIcon className="h-3 w-3" />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setCmdOpen(true)} aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications <Badge variant="secondary" className="text-[10px]">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { t: "New quote received", d: "Nordic Components on RFQ-2026-0420", a: "1h ago" },
              { t: "PO-50211 awaiting approval", d: "From Steelworks · $184,500", a: "3h ago" },
              { t: "Invoice overdue", d: "INV-88207 · Nordic Components", a: "2d ago" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex-col items-start gap-0.5 py-2.5">
                <div className="text-sm font-medium">{n.t}</div>
                <div className="text-xs text-muted-foreground">{n.d}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{n.a}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 h-9 px-1.5 rounded-md hover:bg-muted">
              <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-xs">PS</AvatarFallback></Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="text-sm">Priya Sharma</div>
              <div className="text-xs font-normal text-muted-foreground">priya@vendorbridge.io</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuItem>Organization</DropdownMenuItem>
            <DropdownMenuItem>API keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/login" })}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </header>
  );
}
