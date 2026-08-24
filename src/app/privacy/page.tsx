import type { Metadata } from "next";
import { SITE } from "@/lib/site-content";

export const metadata: Metadata = { title: "מדיניות פרטיות | " + SITE.siteName };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-emerald-950 mb-6">מדיניות פרטיות</h1>
      <div className="space-y-6 leading-relaxed text-emerald-900">
        <Section title="1. המידע שאנו אוספים">
          בעת ביצוע הזמנה באתר, אנו אוספים את הפרטים הבאים: שם מלא, מספר
          טלפון, כתובת אימייל (אם סופקה), שכונת מגורים וכתובת למשלוח, וכן
          פרטי ההזמנה עצמה (הסט שנבחר, מחיר וסטטוס תשלום).
        </Section>

        <Section title="2. מטרת השימוש במידע">
          <ul className="list-disc pr-5 space-y-1">
            <li>טיפול בהזמנה, כולל תיאום ואספקת המשלוח.</li>
            <li>יצירת קשר עמך בנוגע להזמנה, לרבות הודעות אישור בוואטסאפ.</li>
            <li>מעקב פנימי אחר מכירות ומלאי.</li>
          </ul>
        </Section>

        <Section title="3. שמירת המידע">
          פרטי הלקוחות וההזמנות נשמרים במערכת ניהול מוגנת בסיסמה, המיועדת
          לשימוש בעל העסק בלבד. אין ללקוחות אחרים גישה למידע של לקוחות אחרים.
        </Section>

        <Section title="4. מסירת מידע לצדדים שלישיים">
          אנו לא מוכרים ואיננו מעבירים את פרטיך לצדדים שלישיים, למעט ככל
          שנדרש לצורך ביצוע ההזמנה עצמה (למשל שירותי תקשורת כגון וואטסאפ)
          או על פי דרישת חוק.
        </Section>

        <Section title="5. Google Analytics">
          האתר עשוי לעשות שימוש בכלי Google Analytics לצורך ניתוח סטטיסטי
          כללי ואנונימי של השימוש באתר (כגון מספר מבקרים ועמודים נצפים), שאינו
          כולל מידע מזהה אישית.
        </Section>

        <Section title="6. פנייה בנוגע למידע אישי">
          לכל שאלה, בקשה לעיון, תיקון או מחיקת מידע אישי, ניתן לפנות ל
          {SITE.businessOwnerName} בטלפון {SITE.phoneDisplay}.
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
