import type { Metadata } from "next";
import { SITE } from "@/lib/site-content";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "צור קשר | " + SITE.siteName };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center">
      <h1 className="text-3xl font-extrabold text-emerald-950 mb-4">צור קשר</h1>
      <p className="text-emerald-800 mb-8">
        נשמח לענות על כל שאלה לגבי הסטים, המשלוחים או ההזמנה.
      </p>

      <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm space-y-4">
        <div className="text-lg font-semibold text-emerald-950">{SITE.businessOwnerName}</div>
        <a
          href={SITE.phoneHref}
          className="block text-2xl font-bold text-emerald-700 hover:text-emerald-900"
          dir="ltr"
        >
          {SITE.phoneDisplay}
        </a>
        <a
          href={buildWhatsAppLink("שלום, אשמח לשאול לגבי סטים לארבעת המינים")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          שליחת הודעה בוואטסאפ
        </a>
      </div>
    </div>
  );
}
