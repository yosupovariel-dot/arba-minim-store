// Central place for editable site copy: contact info, legal text, delivery
// notice. Edit here rather than hunting through page files.

export const SITE = {
  businessOwnerName: "יהונתן יוסופוב",
  phoneDisplay: "054-953-3757",
  phoneHref: "tel:0549533757",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972549533757",
  siteName: "ארבעת המינים | סטים לסוכות",
};

export const DELIVERY_NOTICE = {
  timing: "המשלוחים יתבצעו יום–יומיים לפני סוכות, בתיאום מראש מול הלקוח.",
  areas: "המשלוחים ניתנים אך ורק לשכונות נחלת יהודה ואברמוביץ.",
};

// TODO(owner): the cancellation percentage below is a placeholder — confirm
// the exact terms with the business owner before launch and update this text
// (and the matching copy in the terms page) accordingly.
export const CANCELLATION_POLICY_TEXT = `
ניתן לבטל הזמנה שטרם שולמה במלואה, בכפוף לתנאים הבאים:
- ביטול הזמנה שהועברה עבורה מקדמה בלבד (טרם הושלם התשלום המלא) יזכה בהחזר מלא של המקדמה, למעט דמי טיפול בשיעור של 10% מסכום המקדמה.
- ביטול בתוך פחות מ-3 ימים לפני מועד האספקה עשוי שלא לזכות בהחזר, בהתאם לשיקול דעת המנהל, זאת עקב מועד ההזמנה הסמוך לחג.
- בקשת ביטול תתבצע בפנייה בוואטסאפ או בטלפון לבעל העסק.
`.trim();
