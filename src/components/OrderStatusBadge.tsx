const STATUS_LABEL: Record<string, string> = {
  PENDING: "ממתינה",
  CONFIRMED: "אושרה",
  CANCELLED: "בוטלה",
  COMPLETED: "הושלמה",
};

const STATUS_CLASS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-sky-100 text-sky-800",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_CLASS[status] || "bg-neutral-100 text-neutral-700"
      }`}
    >
      {STATUS_LABEL[status] || status}
    </span>
  );
}
