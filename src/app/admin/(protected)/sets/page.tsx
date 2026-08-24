import { prisma } from "@/lib/prisma";
import { updateSet } from "@/actions/sets";

export default async function AdminSetsPage() {
  const sets = await prisma.productSet.findMany({
    orderBy: [{ kind: "asc" }, { sortOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-emerald-950">ניהול סטים</h1>
        <p className="mt-1 text-sm text-emerald-600">
          עדכון מחיר, מלאי (לסטים מיוחדים) וזמינות. שינוי שם, תיאור ותמונות
          נעשה כרגע בקוד האתר — פנו למפתח לעדכון תוכן.
        </p>
      </div>

      <div className="grid gap-4">
        {sets.map((set) => (
          <form
            key={set.id}
            action={updateSet.bind(null, set.id)}
            className="grid gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:grid-cols-[1fr_auto_auto_auto]"
          >
            <div>
              <div className="font-bold text-emerald-950">{set.name}</div>
              <div className="text-xs text-emerald-500">
                {set.kind === "SPECIAL" ? "סט מיוחד" : "סט רגיל"} · אתרוג: {set.etrogType} · נמכרו: {set.stockSold}
              </div>
            </div>

            <label className="text-sm">
              <span className="mb-1 block text-emerald-700">מחיר (₪)</span>
              <input
                type="number"
                name="price"
                min={1}
                step="1"
                defaultValue={set.price / 100}
                className="w-28 rounded-lg border border-emerald-200 px-2 py-1"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block text-emerald-700">מלאי כולל</span>
              <input
                type="number"
                name="stockTotal"
                min={0}
                step="1"
                defaultValue={set.stockTotal ?? ""}
                placeholder={set.kind === "REGULAR" ? "ללא הגבלה" : ""}
                className="w-28 rounded-lg border border-emerald-200 px-2 py-1"
              />
            </label>

            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 text-sm text-emerald-700">
                <input type="checkbox" name="active" defaultChecked={set.active} className="h-4 w-4 accent-emerald-600" />
                פעיל
              </label>
              <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                שמירה
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
