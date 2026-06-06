import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, FileText, Receipt, CheckSquare, ShoppingCart, FileBarChart2, Activity, Send, GitCompareArrows } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Vendors", url: "/vendors", icon: Users },
  { title: "RFQs", url: "/rfqs", icon: FileText },
  { title: "Quotations", url: "/quotations", icon: Send },
  { title: "Comparison", url: "/comparison", icon: GitCompareArrows },
  { title: "Approvals", url: "/approvals", icon: CheckSquare },
  { title: "Purchase Orders", url: "/purchase-orders", icon: ShoppingCart },
  { title: "Invoices", url: "/invoices", icon: Receipt },
];

const analyticsNav = [
  { title: "Reports", url: "/reports", icon: FileBarChart2 },
  { title: "Activity", url: "/activity", icon: Activity },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const renderItem = (item: { title: string; url: string; icon: React.ComponentType<{ className?: string }> }) => {
    const Icon = item.icon;
    const active = pathname === item.url || pathname.startsWith(item.url + "/");
    return (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
          <Link to={item.url} className="flex items-center gap-2.5">
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-sm">{item.title}</span>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="h-16 px-3 flex items-center justify-center border-b">
        <Logo collapsed={collapsed} />
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Procurement</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{mainNav.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Insights</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{analyticsNav.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">PS</AvatarFallback></Avatar>
          {!collapsed && (
            <div className="leading-tight min-w-0">
              <div className="text-sm font-medium truncate">Priya Sharma</div>
              <div className="text-[11px] text-muted-foreground truncate">Procurement Manager</div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
