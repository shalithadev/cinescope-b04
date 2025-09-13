"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  FilmIcon,
  UserIcon,
  UsersIcon,
  MessageSquareIcon,
  BarChartIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import ModeToggle from "./mode-toggle";

const menuItems = [
  { title: "Dashboard", href: "/admin", icon: HomeIcon, exact: true },
  { title: "Movies", href: "/admin/movies", icon: FilmIcon },
  { title: "Users", href: "/admin/users", icon: UsersIcon },
  { title: "Reviews", href: "/admin/reviews", icon: MessageSquareIcon },
  { title: "Analytics", href: "/admin/analytics", icon: BarChartIcon },
  { title: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

const accountItems = [
  { title: "Profile", href: "/admin/profile", icon: UserIcon },
  { title: "Public Site", href: "/", icon: FilmIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  console.log("Current pathname:", pathname);

  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(item.href);
  };

  return (
    <Sidebar>
      {/* Header with Logo */}
      <SidebarHeader className="flex flex-col">
        <div className="flex items-center p-2">
          <Logo />
          <h2 className="ml-2 text-xl font-medium">CineScope</h2>
          <div className="ml-auto flex items-center">
            <ModeToggle />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={
                      isActive(item) ? "bg-primary/20 font-medium" : ""
                    }
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Account */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={
                      isActive(item) ? "bg-primary/20 font-medium" : ""
                    }
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
