import { verifyAdminSession } from "@/lib/dal";
import { AdminSidebar } from "@/components/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifyAdminSession();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
