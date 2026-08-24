import type { Metadata } from "next";
import { SITE } from "@/lib/site-content";

export const metadata: Metadata = { title: "הצהרת נגישות | " + SITE.siteName };

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-emerald-950 mb-6">הצהרת נגישות</h1>
      <div className="space-y-6 leading-relaxed text-emerald-900">
        <p>
          אנו במחויבות לאפשר לכלל הגולשים, לרבות אנשים עם מוגבלות, לגלוש
          באתר בצורה נוחה ונגישה. האתר פועל להנגשה בהתאם לתקן הישראלי (ת&quot;י
          5568) ולהנחיות WCAG 2.1 ברמה AA, ככל הניתן.
        </p>

        <Section title="אמצעי נגישות באתר">
          <ul className="list-disc pr-5 space-y-1">
            <li>תפריט נגישות ייעודי (אייקון בפינת המסך) המאפשר הגדלת טקסט, הגברת ניגודיות, הדגשת קישורים, גווני אפור ועצירת אנימציות.</li>
            <li>תמיכה בניווט מקלדת, כולל סימון ברור (Focus) לאלמנט הפעיל.</li>
            <li>מבנה עמודים מסודר עם כותרות היררכיות ותיאורי alt לתמונות.</li>
            <li>ניגודיות צבעים נבחרה מתוך שאיפה לעמידה בדרישות הנגישות.</li>
          </ul>
        </Section>

        <Section title="מגבלות ידועות">
          חלק מהתכנים באתר, כגון סרטוני וידאו, עשויים שלא לכלול כתוביות
          מלאות בשלב זה. אנו פועלים לשיפור מתמיד של רמת הנגישות באתר.
        </Section>

        <Section title="פנייה בנושא נגישות">
          נתקלתם בבעיית נגישות באתר? נשמח שתפנו אלינו ל{SITE.businessOwnerName}{" "}
          בטלפון {SITE.phoneDisplay}, ונטפל בפנייה בהקדם.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-emerald-900 mb-2">{title}</h2>
      <div className="text-emerald-800">{children}</div>
    </section>
  );
}
