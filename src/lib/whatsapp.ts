import { SITE } from "@/lib/site-content";

export function buildWhatsAppLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
