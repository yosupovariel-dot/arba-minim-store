"use server";

import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/dal";
import { revalidatePath } from "next/cache";

export async function updateSet(setId: string, formData: FormData) {
  await verifyAdminSession();

  const priceShekels = Number(formData.get("price"));
  const stockTotalRaw = formData.get("stockTotal");
  const active = formData.get("active") === "on";

  const stockTotal =
    stockTotalRaw === null || stockTotalRaw === ""
      ? null
      : Math.max(0, Math.trunc(Number(stockTotalRaw)));

  if (!Number.isFinite(priceShekels) || priceShekels <= 0) {
    return;
  }

  await prisma.productSet.update({
    where: { id: setId },
    data: {
      price: Math.round(priceShekels * 100),
      stockTotal,
      active,
    },
  });

  revalidatePath("/admin/sets");
  revalidatePath("/");
}
