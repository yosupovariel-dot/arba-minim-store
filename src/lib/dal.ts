import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";

export const verifyAdminSession = cache(async () => {
  const session = await getAdminSession();
  if (!session?.adminId) {
    redirect("/admin/login");
  }
  return session;
});
