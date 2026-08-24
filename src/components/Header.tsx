"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/#sets", label: "הסטים שלנו" },
  { href: "/#delivery", label: "משלוחים" },
  { href: "/contact", label: "צור קשר" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 flex justify-center px-2 pt-2 sm:px-4 sm:pt-3">
      <header
        className={`w-full transition-all duration-300 ease-out ${
          scrolled
            ? "max-w-2xl rounded-full bg-white/90 shadow-lg shadow-emerald-900/10 backdrop-blur"
            : "max-w-5xl rounded-2xl bg-white/70 shadow-sm backdrop-blur"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-3 px-4 transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl" aria-hidden>
              🌿
            </span>
            <span
              className={`font-semibold text-emerald-900 transition-all ${
                scrolled ? "text-sm" : "text-base sm:text-lg"
              }`}
            >
              ארבעת המינים לסוכות
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-emerald-800">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#sets"
            className="shrink-0 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition-colors"
          >
            להזמנת סט
          </Link>
        </div>
      </header>
    </div>
  );
}
