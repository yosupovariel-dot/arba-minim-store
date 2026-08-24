import { PrismaClient, SetKind, MediaType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Placeholder catalog — replace names, etrog types, prices, and media with
// the real data from the business owner before launch.
const REGULAR_SETS = [
  {
    slug: "basic",
    name: "סט בסיסי",
    etrogType: "אתרוג מרוקאי מהודר",
    description:
      "סט ארבעת המינים בסיסי ואיכותי: לולב, הדסים, ערבות ואתרוג מרוקאי בהכשר מהודר. מתאים לשימוש יומיומי לאורך כל ימי החג.",
    price: 18000, // אגורות = 180 ש"ח
    sortOrder: 1,
  },
  {
    slug: "premium",
    name: "סט מהודר",
    etrogType: "אתרוג תימני",
    description:
      "סט ארבעת המינים ברמת הידור גבוהה, עם אתרוג תימני נבחר. מינים איכותיים ומטופחים במיוחד.",
    price: 32000,
    sortOrder: 2,
  },
  {
    slug: "deluxe",
    name: "סט דה-לוקס",
    etrogType: "אתרוג קלברי (איטלקי)",
    description:
      "סט ברמה הגבוהה ביותר, עם אתרוג קלברי מיובא. עבור המהדרים מן המהדרים.",
    price: 55000,
    sortOrder: 3,
  },
];

const SPECIAL_SETS = [
  {
    slug: "special-yanover",
    name: "סט מיוחד — יאנובר",
    etrogType: "אתרוג יאנובר נדיר",
    description:
      "מהדורה מוגבלת של סט חגיגי עם אתרוג יאנובר נדיר, נבחר ידנית. כמות מוגבלת — עד גמר המלאי.",
    price: 75000,
    stockTotal: 10,
    sortOrder: 1,
  },
  {
    slug: "special-collectors",
    name: "סט אספנים",
    etrogType: "אתרוג תימני נדיר",
    description:
      "סט אספנים מפואר במיוחד, כולל אריזת מתנה חגיגית. כמות מוגבלת מאוד.",
    price: 95000,
    stockTotal: 5,
    sortOrder: 2,
  },
];

async function main() {
  for (const set of REGULAR_SETS) {
    await prisma.productSet.upsert({
      where: { slug: set.slug },
      update: {},
      create: { ...set, kind: SetKind.REGULAR },
    });
  }

  for (const set of SPECIAL_SETS) {
    const created = await prisma.productSet.upsert({
      where: { slug: set.slug },
      update: {},
      create: { ...set, kind: SetKind.SPECIAL },
    });
    const existingMedia = await prisma.setMedia.count({
      where: { setId: created.id },
    });
    if (existingMedia === 0) {
      await prisma.setMedia.create({
        data: {
          setId: created.id,
          type: MediaType.IMAGE,
          url: "/images/placeholder-set.svg",
          sortOrder: 0,
        },
      });
    }
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-please";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: {},
    create: { username: adminUsername, passwordHash },
  });

  console.log("Seed complete.");
  console.log(`Admin login -> username: "${adminUsername}", password: (from .env ADMIN_PASSWORD)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
