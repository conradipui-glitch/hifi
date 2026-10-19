import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { StatusDot, useOpenStatus } from "./ui";
import {
  PHONE_MOBILE_DISPLAY,
  PHONE_MOBILE_HREF,
  WORK_HOURS_NOTE,
  WORK_HOURS_SHORT,
} from "../lib/data";

const NAV = [
  { href: "#digitize", label: "Оцифровка" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#about", label: "Мастерская" },
  { href: "#visit", label: "Передать кассеты" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contacts", label: "Контакты" },
];

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="3" y="9" width="42" height="30" rx="6" fill="#221b12" />
      <rect x="8" y="14" width="32" height="9" rx="2" fill="#f3c969" />
      <circle cx="16" cy="30" r="5.2" fill="none" stroke="#f5eedf" strokeWidth="2.4" />
      <circle cx="32" cy="30" r="5.2" fill="none" stroke="#f5eedf" strokeWidth="2.4" />
      <circle cx="16" cy="30" r="1.7" fill="#f5eedf" />
      <circle cx="32" cy="30" r="1.7" fill="#f5eedf" />
      <path d="M 16 35 L 32 35" stroke="#f5eedf" strokeWidth="2" />
    </svg>
  );
}

export default function Header() {
  const status = useOpenStatus();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow ${
        scrolled ? "shadow-[0_6px_24px_rgba(34,27,18,0.14)]" : ""
      }`}
    >
      <div className="border-b border-ink/10 bg-paper/92 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Мастерская «Хай-Фай» — наверх">
            <LogoMark />
            <span className="leading-none">
              <span className="font-display block text-[17px] font-bold tracking-tight">
                ХАЙ-ФАЙ
              </span>
              <span className="mt-1 block font-mono text-[10.5px] tracking-[0.22em] text-ink3 uppercase">
                мастерская · Тобольск
              </span>
            </span>
          </a>

          <nav className="ml-4 hidden items-center gap-0.5 xl:flex" aria-label="Разделы сайта">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-2 text-[14.5px] font-semibold whitespace-nowrap text-ink2 transition hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span
              className="hidden items-center gap-2 rounded-full border border-ink/15 bg-cream px-3.5 py-2 text-[13.5px] font-bold whitespace-nowrap 2xl:inline-flex"
              title={`${status.detail} ${WORK_HOURS_SHORT}, ${WORK_HOURS_NOTE}.`}
            >
              <StatusDot status={status} />
              {status.label}
            </span>
            <a
              href={PHONE_MOBILE_HREF}
              className="hidden min-h-11 items-center gap-2 rounded-xl bg-ink px-4 py-2.5 font-sans text-[15px] font-extrabold tabular-nums whitespace-nowrap text-cream transition hover:bg-ink2 sm:inline-flex"
            >
              <Phone className="h-4.5 w-4.5 text-brandsoft" />
              {PHONE_MOBILE_DISPLAY}
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink/15 bg-cream xl:hidden"
              aria-expanded={open}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-ink/10 bg-cream px-4 pt-2 pb-5 xl:hidden" aria-label="Разделы сайта">
            <p className="flex items-center gap-2 px-2 py-2 text-sm font-bold">
              <StatusDot status={status} />
              {status.label}
              <span className="font-medium text-ink3">— {status.detail}</span>
            </p>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 text-lg font-bold text-ink hover:bg-paper"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 grid gap-2.5 px-2">
              <a
                href={PHONE_MOBILE_HREF}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-sans text-base font-extrabold tabular-nums text-ink"
              >
                <Phone className="h-5 w-5" /> {PHONE_MOBILE_DISPLAY}
              </a>
              <p className="text-center text-sm font-semibold text-ink3">
                {WORK_HOURS_SHORT} · {WORK_HOURS_NOTE}
              </p>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
