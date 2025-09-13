import UserNav from "@/components/user-nav";
import AdminSidebar from "@/components/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const metadata = {
  title: "Cinescope | Admin Dashboard",
  description: "Movie Database and Management Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      {/* 1. Sidebar Section */}
      <AdminSidebar />

      {/* 2. Main Content Area */}
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            {/* User Navigation Dropdown */}
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
