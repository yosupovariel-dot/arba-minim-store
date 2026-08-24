# ארבעת המינים לסוכות — אתר הזמנות

אתר להזמנת סטים לארבעת המינים (רגילים + מהדורה מוגבלת), עם תהליך הזמנה
ותשלום מקדמה (20%) בביט, ומערכת ניהול הזמנות למנהל.

נבנה עם Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Prisma.

## הרצה מקומית

```bash
npm install
npx prisma migrate dev   # יוצר את בסיס הנתונים המקומי (SQLite)
npm run seed              # קטלוג לדוגמה + משתמש מנהל
npm run dev
```

האתר יעלה בכתובת http://localhost:3000. כניסת מנהל: http://localhost:3000/admin/login
עם הפרטים שמוגדרים ב-`.env` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).

## משתני סביבה (`.env`)

| משתנה | תיאור |
|---|---|
| `DATABASE_URL` | חיבור לבסיס הנתונים. מקומית: קובץ SQLite. בפרודקשן: Postgres מנוהל. |
| `SESSION_SECRET` | מפתח לחתימת session מנהל. **חובה להחליף** לערך אקראי לפני העלאה לאוויר (`openssl rand -base64 32`). |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | משמשים רק ל-seed הראשוני של משתמש המנהל. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | מזהה Google Analytics (G-XXXXXXX). ריק = לא נטען GA כלל. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | מספר הוואטסאפ לכפתור הצף, בפורמט בינלאומי ללא +. |

## פריטים שהם Placeholder — יש להשלים לפני עלייה לאוויר

- **קטלוג הסטים**: שמות, סוגי אתרוג, מחירים ותיאורים ב-`prisma/seed.ts` הם
  לדוגמה בלבד. יש לעדכן שם ולהריץ `npm run seed` מחדש (או לערוך ישירות
  דרך עמוד `/admin/sets` לאחר ההרצה).
- **תמונות/סרטונים**: כרגע כל הסטים משתמשים בתמונת placeholder
  (`public/images/placeholder-set.svg`). יש להוסיף קבצי מדיה אמיתיים
  ולקשר אותם דרך טבלת `SetMedia` (כרגע נעשה בקוד/seed — ניהול תוכן מלא
  לא נבנה ב-MVP הזה).
- **מספר הביט לתשלום**: העמוד מפנה את הלקוח לקבל את מספר הביט בהודעת
  הוואטסאפ / בעמוד יצירת קשר. יש לוודא שהמספר בפועל (`SITE.phoneDisplay`
  ב-`src/lib/site-content.ts`) הוא המספר הנכון לביט.
- **אחוז/תנאי ביטול הזמנה**: הטקסט ב-`src/lib/site-content.ts`
  (`CANCELLATION_POLICY_TEXT`) הוא ניסוח לדוגמה בלבד — יש לאשר עם בעל
  העסק את האחוזים והתנאים המדויקים לפני העלאה לאוויר.
- **הודעות WhatsApp אוטומטיות**: בשלב זה שליחת הודעת אישור ללקוח נעשית
  ידנית — כפתור בעמוד ההזמנה במערכת הניהול פותח וואטסאפ עם טקסט מוכן
  מראש, שהמנהל שולח בלחיצה. שילוב API אוטומטי (למשל Twilio) אפשרי בהמשך.

## פריסה לפרודקשן (Vercel)

1. **בסיס נתונים**: הקימו בסיס Postgres מנוהל (Supabase / Neon / Vercel
   Postgres). עדכנו את `prisma/schema.prisma`: שנו `provider = "sqlite"`
   ל-`provider = "postgresql"`, ואז:
   ```bash
   npx prisma migrate dev --name init_postgres
   ```
2. הגדירו את משתני הסביבה בפרויקט ב-Vercel (`DATABASE_URL`,
   `SESSION_SECRET` חדש וסודי, `ADMIN_USERNAME`/`ADMIN_PASSWORD` לצורך
   ה-seed הראשוני, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER`).
3. הריצו seed חד-פעמי מול בסיס הפרודקשן (`npm run seed` עם `DATABASE_URL`
   של הפרודקשן), ואז **שנו את סיסמת המנהל** (או מחקו והחליפו את המשתמש).
4. חברו את הריפו ל-Vercel ובצעו דיפלוי.
5. חברו את חשבון Google Analytics ל-`NEXT_PUBLIC_GA_MEASUREMENT_ID`.

## אבטחה — מה כבר קיים

- סיסמת מנהל מוצפנת (bcrypt), session חתום (JWT/HttpOnly cookie),
  נעילת חשבון זמנית אחרי 5 ניסיונות כניסה כושלים.
- עמודי `/admin/*` מוגנים גם ב-Proxy (בדיקה אופטימית) וגם בכל עמוד/פעולת
  שרת בנפרד (הבדיקה האמיתית) — כך שאין נתיב שמדלג על ההרשאה.
- כל טופס מאומת בצד שרת (Zod) לפני כתיבה לבסיס הנתונים.
- לקוחות אינם רואים הזמנות של לקוחות אחרים — אין באתר הציבורי שום עמוד
  שמציג רשימת הזמנות; רק מסך "תודה" אישי לאחר שליחה.
- כותרות אבטחה בסיסיות (`X-Frame-Options`, `X-Content-Type-Options`
  וכו') מוגדרות ב-`next.config.ts`.

**מומלץ לפני עלייה לאוויר**: להריץ סקירת אבטחה נוספת (`/security-review`
בקוד הזה, או סקירה ידנית), ולוודא HTTPS בכל סביבת הפרודקשן.
