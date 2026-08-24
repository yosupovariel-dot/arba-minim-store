export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="text-sm text-emerald-600">{label}</div>
      <div className="mt-1 text-2xl font-extrabold text-emerald-950">{value}</div>
      {hint && <div className="mt-1 text-xs text-emerald-500">{hint}</div>}
    </div>
  );
}
