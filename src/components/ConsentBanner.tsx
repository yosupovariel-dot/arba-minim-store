"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "site-terms-ack";
const CHANGE_EVENT = "consent-ack-changed";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

// Server (and the client's first hydration pass) never has localStorage, so
// we render nothing until useSyncExternalStore swaps in the real snapshot —
// avoids a hydration mismatch on this banner's visibility.
function getServerSnapshot() {
  return false;
}

export function ConsentBanner() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-200 bg-white/95 backdrop-blur px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center sm:flex-row sm:text-right sm:justify-between">
        <p className="text-sm text-emerald-900">
          שימוש באתר זה כפוף ל
          <Link href="/terms" className="mx-1 underline hover:text-emerald-700">
            תקנון האתר
          </Link>
          ול
          <Link href="/privacy" className="mx-1 underline hover:text-emerald-700">
            מדיניות הפרטיות
          </Link>
          . המשך גלישה באתר מהווה הסכמה לתנאים אלו.
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          הבנתי, אני מאשר/ת
        </button>
      </div>
    </div>
  );
}
