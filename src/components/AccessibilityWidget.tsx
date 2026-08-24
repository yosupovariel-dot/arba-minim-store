"use client";

import { useEffect, useState } from "react";

type A11yState = {
  textScale: number; // 100 | 115 | 130 | 145
  highContrast: boolean;
  underlineLinks: boolean;
  grayscale: boolean;
  pauseAnimations: boolean;
};

const DEFAULT_STATE: A11yState = {
  textScale: 100,
  highContrast: false,
  underlineLinks: false,
  grayscale: false,
  pauseAnimations: false,
};

const STORAGE_KEY = "a11y-preferences";

function applyState(state: A11yState) {
  const root = document.documentElement;
  root.style.setProperty("--a11y-scale", String(state.textScale / 100));
  root.classList.toggle("a11y-contrast", state.highContrast);
  root.classList.toggle("a11y-underline-links", state.underlineLinks);
  root.classList.toggle("a11y-grayscale", state.grayscale);
  root.classList.toggle("a11y-pause-animations", state.pauseAnimations);
}

function readStoredState(): A11yState {
  // Only ever called client-side (lazy useState initializer): the dropdown
  // this feeds is always closed on first render, so reading localStorage
  // here can't cause a hydration mismatch the way visible content would.
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(readStoredState);

  useEffect(() => {
    applyState(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }, [state]);

  function update<K extends keyof A11yState>(key: K, value: A11yState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="הגדרות נגישות"
          className="mb-3 w-72 rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl text-sm text-emerald-900"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">הגדרות נגישות</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגירת חלון נגישות"
              className="text-emerald-500 hover:text-emerald-800"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="block mb-1 font-medium">גודל טקסט</span>
              <div className="flex gap-2">
                {[100, 115, 130, 145].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => update("textScale", scale)}
                    className={`flex-1 rounded-lg border px-2 py-1 ${
                      state.textScale === scale
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-emerald-200 hover:bg-emerald-50"
                    }`}
                  >
                    {scale}%
                  </button>
                ))}
              </div>
            </div>

            <ToggleRow
              label="ניגודיות גבוהה"
              checked={state.highContrast}
              onChange={(v) => update("highContrast", v)}
            />
            <ToggleRow
              label="הדגשת קישורים (קו תחתון)"
              checked={state.underlineLinks}
              onChange={(v) => update("underlineLinks", v)}
            />
            <ToggleRow
              label="גווני אפור"
              checked={state.grayscale}
              onChange={(v) => update("grayscale", v)}
            />
            <ToggleRow
              label="עצירת אנימציות"
              checked={state.pauseAnimations}
              onChange={(v) => update("pauseAnimations", v)}
            />

            <button
              onClick={() => setState(DEFAULT_STATE)}
              className="w-full rounded-lg border border-emerald-200 py-1.5 hover:bg-emerald-50"
            >
              איפוס להגדרות ברירת מחדל
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="פתיחת תפריט נגישות"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M12 2a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12 2Zm8 6.6-5.6 1v3l3.2 6.6-1.9.9-3-6.2-1.8 1v5H8.1v-5.4l-1.9 1.6L4.9 14l4.6-4V9.6L4 10.6l-.4-2L11 7.1c.3-.1.6-.2 1-.2s.7.1 1 .2l6.4 1.5-.4 2Z" />
        </svg>
      </button>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-emerald-600"
      />
    </label>
  );
}
