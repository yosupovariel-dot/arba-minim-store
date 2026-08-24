import type { Metadata } from "next";
import { CANCELLATION_POLICY_TEXT, SITE } from "@/lib/site-content";

export const metadata: Metadata = { title: "תקנון האתר | " + SITE.siteName };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold text-emerald-950 mb-6">תקנון האתר</h1>
      <div className="space-y-6 leading-relaxed text-emerald-900">
        <Section title="1. כללי">
          אתר זה מופעל על ידי {SITE.businessOwnerName} (&quot;בעל העסק&quot;), ומשמש
          למכירת סטים לארבעת המינים לחג הסוכות. גלישה ושימוש באתר, לרבות ביצוע
          הזמנה, מהווים הסכמה לתנאי תקנון זה.
        </Section>

        <Section title="2. הזמנת סטים">
          <ul className="list-disc pr-5 space-y-1">
            <li>באתר מוצגים שלושה סוגי סטים רגילים, שאינם מוגבלים בכמות בשלב זה.</li>
            <li>
              בנוסף מוצעים סטים מיוחדים, המוגבלים בכמות מלאי כפי שמופיע בעמוד
              הסט. עם אזילת המלאי, לא ניתן יהיה להזמין את הסט המדובר.
            </li>
            <li>כל סט מציג את סוג האתרוג הנכלל בו.</li>
            <li>
              ניתן להוסיף מספר סטים (מאותו סוג או מסוגים שונים) לסל הקניות
              ולהזמין אותם יחד במסגרת הזמנה אחת.
            </li>
          </ul>
        </Section>

        <Section title="3. תהליך ההזמנה והתשלום">
          <ul className="list-disc pr-5 space-y-1">
            <li>בעת ההזמנה יוצג ללקוח המחיר הכולל של כל הסטים שבסל הקניות.</li>
            <li>
              על הלקוח להעביר מקדמה בשיעור של 20% מהמחיר הכולל של ההזמנה,
              באמצעות אפליקציית Bit, בהתאם לפרטים שיימסרו.
            </li>
            <li>
              לאחר ביצוע ההעברה, על הלקוח לסמן זאת באתר, ולאשר את התקנון ואת
              מדיניות הפרטיות לפני שליחת ההזמנה.
            </li>
            <li>
              יתרת התשלום תיגבה במעמד המסירה, אלא אם סוכם אחרת מול בעל העסק.
            </li>
            <li>
              סימון &quot;העברתי את המקדמה&quot; אינו מהווה אישור סופי לקבלת התשלום —
              האישור הסופי ייעשה על ידי בעל העסק לאחר בדיקה בפועל.
            </li>
          </ul>
        </Section>

        <Section title="4. משלוחים">
          <ul className="list-disc pr-5 space-y-1">
            <li>המשלוחים יתבצעו יום–יומיים לפני חג הסוכות, בתיאום מראש מול הלקוח.</li>
            <li>המשלוחים ניתנים אך ורק לשכונות נחלת יהודה ואברמוביץ.</li>
          </ul>
        </Section>

        <Section title="5. ביטול הזמנה">
          <p className="whitespace-pre-line">{CANCELLATION_POLICY_TEXT}</p>
        </Section>

        <Section title="6. אחריות">
          בעל העסק עושה כמיטב יכולתו להבטיח סטים באיכות גבוהה, בהתאם לתיאור
          המופיע בעמוד המוצר. ייתכנו הבדלים קלים בין הפריט המסופק לבין התמונה
          המוצגת באתר, הנובעים מהיות המוצרים טבעיים.
        </Section>

        <Section title="7. פיתוח האתר">
          האתר פותח מבחינה טכנית על ידי Ariel Yosupov. למפתח האתר אין כל קשר
          לבעלות, לניהול, למכירת המוצרים, לתשלומים, למשלוחים או לכל היבט
          עסקי אחר של הפעילות המתוארת באתר, מעבר לעצם בנייתו הטכנית של
          האתר. בהתאם, מפתח האתר אינו נושא באחריות כלשהי, משפטית או אחרת,
          בקשר עם תוכן האתר, ההזמנות, המוצרים, התשלומים או כל מחלוקת
          שתתעורר בין הלקוח לבין בעל העסק. כל אחריות כאמור חלה על בעל
          העסק בלבד.
        </Section>

        <Section title="8. יצירת קשר">
          לכל שאלה או בעיה ניתן לפנות ל{SITE.businessOwnerName} בטלפון{" "}
          {SITE.phoneDisplay}, או באמצעות כפתור הוואטסאפ באתר.
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
