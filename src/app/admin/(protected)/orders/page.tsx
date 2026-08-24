import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatILS } from "@/lib/pricing";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";

const STATUS_FILTERS = [
  { value: "", label: "הכל" },
  { value: "PENDING", label: "ממתינות" },
  { value: "CONFIRMED", label: "אושרו" },
  { value: "CANCELLED", label: "בוטלו" },
  { value: "COMPLETED", label: "הושלמו" },
];

export default async function AdminOrdersPage({
  searchParams,
}: PageProps<"/admin/orders">) {
  const sp = await searchParams;
  const statusFilter = typeof sp.status === "string" ? sp.status : "";

  const orders = await prisma.order.findMany({
    where: statusFilter ? { status: statusFilter as never } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-emerald-950">הזמנות</h1>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <Link
              key={f.value}
              href={f.value ? `/admin/orders?status=${f.value}` : "/admin/orders"}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                statusFilter === f.value
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-50"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-emerald-50 text-emerald-800">
            <tr>
              <th className="px-4 py-3 text-right font-semibold">#</th>
              <th className="px-4 py-3 text-right font-semibold">לקוח</th>
              <th className="px-4 py-3 text-right font-semibold">סט</th>
              <th className="px-4 py-3 text-right font-semibold">מחיר</th>
              <th className="px-4 py-3 text-right font-semibold">מקדמה</th>
              <th className="px-4 py-3 text-right font-semibold">סטטוס תשלום</th>
              <th className="px-4 py-3 text-right font-semibold">סטטוס הזמנה</th>
              <th className="px-4 py-3 text-right font-semibold">תאריך</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-emerald-50/50">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-semibold text-emerald-700 hover:underline">
                    #{o.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-emerald-950">{o.customerName}</div>
                  <div className="text-xs text-emerald-500" dir="ltr">
                    {o.phone}
                  </div>
                </td>
                <td className="px-4 py-3">{o.setNameSnapshot}</td>
                <td className="px-4 py-3">{formatILS(o.priceSnapshot / 100)}</td>
                <td className="px-4 py-3">{formatILS(o.depositAmount / 100)}</td>
                <td className="px-4 py-3">
                  {o.depositConfirmed ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">
                      התקבל
                    </span>
                  ) : o.depositMarkedPaid ? (
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                      לא אושר
                    </span>
                  ) : (
                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-600">
                      לא סומן
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 text-emerald-600">
                  {new Date(o.createdAt).toLocaleDateString("he-IL")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-emerald-500">
                  לא נמצאו הזמנות
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
