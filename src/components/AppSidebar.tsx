import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Search,
  CreditCard,
  History,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import logo from "@/assets/messmate-logo.png";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Book Meals", url: "/book-meals", icon: Calendar },
  { title: "Find Mess", url: "/find-mess", icon: Search },
  { title: "Payment", url: "/payment", icon: CreditCard },
  { title: "View History", url: "/history", icon: History },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MessMate Logo" className="w-10 h-10" />
          <span className="font-heading font-bold text-xl text-gray-900">MessMate</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-body text-xs uppercase tracking-wider">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? "bg-gray-100 text-gray-900 font-medium shadow-sm"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-body">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
