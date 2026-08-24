import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { ConsentBanner } from "@/components/ConsentBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CartProvider } from "@/lib/cart-context";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "הזמנות לארבעת המינים - יהונתן יוסופוב",
  description:
    "סטים לארבעת המינים לחג הסוכות — סטים רגילים וסטים מיוחדים במהדורה מוגבלת, עם משלוח אישי לשכונות נחלת יהודה ואברמוביץ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[radial-gradient(circle_at_top,#f2f9f0,transparent_55%)]">
        <GoogleAnalytics />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <WhatsAppButton />
        <AccessibilityWidget />
        <ConsentBanner />
      </body>
    </html>
  );
}
