import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { getNewLeadCounts } from "@/lib/leads";

// Sidebar/mobile nav show a red "new lead" badge, so this layout needs
// fresh counts on every navigation rather than a cached render.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const newCounts = await getNewLeadCounts();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar newCounts={newCounts} />
      <div className="min-w-0 flex-1">
        <AdminMobileNav newCounts={newCounts} />
        <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
