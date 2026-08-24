"use server";

import { prisma } from "@/lib/prisma";
import { OrderFormSchema } from "@/lib/validation";
import { calcDeposit } from "@/lib/pricing";
import { verifyAdminSession } from "@/lib/dal";
import { resyncOrdersSheet } from "@/lib/googleSheets";
import { revalidatePath } from "next/cache";

export type OrderActionState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
  orderNumber?: number;
};

export async function createOrder(
  _prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  const raw = {
    setId: formData.get("setId"),
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    neighborhood: formData.get("neighborhood"),
    address: formData.get("address"),
    notes: formData.get("notes"),
    depositMarkedPaid: formData.get("depositMarkedPaid") === "on" ? true : undefined,
    termsAccepted: formData.get("termsAccepted") === "on" ? true : undefined,
  };

  const parsed = OrderFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const data = parsed.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const set = await tx.productSet.findUnique({ where: { id: data.setId } });
      if (!set || !set.active) {
        throw new Error("הסט המבוקש אינו זמין");
      }
      if (set.stockTotal != null && set.stockSold >= set.stockTotal) {
        throw new Error("אזל המלאי עבור סט זה");
      }

      const orderCount = await tx.order.count();
      const orderNumber = 1000 + orderCount + 1;

      const order = await tx.order.create({
        data: {
          orderNumber,
          setId: set.id,
          setNameSnapshot: set.name,
          priceSnapshot: set.price,
          depositAmount: calcDeposit(set.price),
          customerName: data.customerName,
          phone: data.phone,
          email: data.email || null,
          neighborhood: data.neighborhood,
          address: data.address,
          notes: data.notes || null,
          depositMarkedPaid: true,
          depositMarkedAt: new Date(),
          termsAccepted: true,
        },
      });

      if (set.stockTotal != null) {
        await tx.productSet.update({
          where: { id: set.id },
          data: { stockSold: { increment: 1 } },
        });
      }

      return order;
    });

    revalidatePath("/");
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    await resyncOrdersSheet();

    return { success: true, orderNumber: result.orderNumber };
  } catch (err) {
    return {
      message: err instanceof Error ? err.message : "אירעה שגיאה, נסו שוב",
    };
  }
}

export async function confirmDeposit(orderId: string) {
  await verifyAdminSession();
  await prisma.order.update({
    where: { id: orderId },
    data: { depositConfirmed: true, depositConfirmedAt: new Date(), status: "CONFIRMED" },
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
  await resyncOrdersSheet();
}

export async function unconfirmDeposit(orderId: string) {
  await verifyAdminSession();
  await prisma.order.update({
    where: { id: orderId },
    data: { depositConfirmed: false, depositConfirmedAt: null },
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
  await resyncOrdersSheet();
}

export async function setOrderStatus(orderId: string, status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED") {
  await verifyAdminSession();

  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order) return;

    const wasCancelled = order.status === "CANCELLED";
    const willBeCancelled = status === "CANCELLED";

    if (wasCancelled !== willBeCancelled) {
      const set = await tx.productSet.findUnique({ where: { id: order.setId } });
      if (set?.stockTotal != null) {
        await tx.productSet.update({
          where: { id: set.id },
          data: { stockSold: { increment: willBeCancelled ? -1 : 1 } },
        });
      }
    }

    await tx.order.update({ where: { id: orderId }, data: { status } });
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
  await resyncOrdersSheet();
}

export async function saveAdminNotes(orderId: string, formData: FormData) {
  await verifyAdminSession();
  const notes = String(formData.get("notes") || "");
  await prisma.order.update({ where: { id: orderId }, data: { adminNotes: notes } });
  revalidatePath(`/admin/orders/${orderId}`);
  await resyncOrdersSheet();
}

export async function manualSheetResync() {
  await verifyAdminSession();
  await resyncOrdersSheet();
  revalidatePath("/admin/orders");
}
