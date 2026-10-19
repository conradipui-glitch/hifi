import {
  type ReactNode,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { Phone } from "lucide-react";
import {
  PHONE_MOBILE_DISPLAY,
  PHONE_MOBILE_HREF,
  getOpenStatus,
  type OpenStatus,
} from "../lib/data";

/* ---------------------------------------------------------------- */
/*  Появление при прокрутке                                          */
/* ---------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = delay
    ? { transitionDelay: `${delay}ms` }
    : {};
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as never}
      style={style}
      className={`reveal ${shown ? "in" : ""} ${className}`}
    >
      {children}
    </Comp>
  );
}

/* ---------------------------------------------------------------- */
/*  Предпочтение «меньше движения»                                   */
/* ---------------------------------------------------------------- */

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------------------------------------------------------------- */
/*  Живой статус мастерской                                          */
/* ---------------------------------------------------------------- */

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(() => getOpenStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return {
    ...status,
    detail: status.detail.replace("Работаем до", "Работаю до"),
  };
}

export function StatusDot({ status }: { status: OpenStatus }) {
  const color = status.state === "open" ? "bg-sage" : "bg-rec";
  return (
    <span className="relative inline-flex h-2.5 w-2.5 shrink-0" aria-hidden>
      {status.state === "open" && (
        <span
          className={`pulse-ring absolute inset-0 rounded-full ${color}`}
        />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

/* ---------------------------------------------------------------- */
/*  Заголовок секции — «глава кассеты»                               */
/* ---------------------------------------------------------------- */

export function SectionHead({
  chapter,
  kicker,
  title,
  lead,
  hand,
  dark = false,
}: {
  chapter: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  hand?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p
          className={`font-mono text-[13px] font-medium tracking-[0.18em] uppercase ${
            dark ? "text-brandsoft" : "text-branddark"
          }`}
        >
          <span aria-hidden>▶</span> Глава {chapter} · {kicker}
        </p>
      </Reveal>
      <Reveal delay={70}>
        <h2
          className={`font-display mt-4 text-[clamp(1.55rem,4.2vw,2.6rem)] leading-[1.14] font-bold text-balance ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={140}>
          <div
            className={`mt-5 text-lg leading-relaxed ${
              dark ? "text-paper/85" : "text-ink3"
            }`}
          >
            {lead}
          </div>
        </Reveal>
      )}
      {hand && (
        <Reveal delay={200}>
          <p
            className={`font-hand mt-4 -rotate-1 text-2xl ${
              dark ? "text-brandsoft" : "text-branddark"
            }`}
          >
            {hand}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Главная кнопка — звонок                                          */
/* ---------------------------------------------------------------- */

export function CallButton({
  className = "",
  withNumber = true,
  label = "Позвонить",
}: {
  className?: string;
  withNumber?: boolean;
  label?: string;
}) {
  return (
    <a
      href={PHONE_MOBILE_HREF}
      className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-brand px-7 py-3.5 text-lg font-extrabold text-ink shadow-[0_5px_0_0_var(--color-branddark)] transition hover:-translate-y-0.5 hover:bg-brandsoft hover:shadow-[0_7px_0_0_var(--color-branddark)] active:translate-y-1 active:shadow-[0_1px_0_0_var(--color-branddark)] ${className}`}
    >
      <Phone className="h-5 w-5 shrink-0 transition-transform group-hover:-rotate-12" />
      <span>
        {label}
        {withNumber && (
          <span className="mt-0.5 block font-sans text-[15.5px] font-extrabold tabular-nums tracking-wide">
            {PHONE_MOBILE_DISPLAY}
          </span>
        )}
      </span>
    </a>
  );
}

/* ---------------------------------------------------------------- */
/*  Копирование шпаргалки в буфер обмена                             */
/* ---------------------------------------------------------------- */

export function useCopy(): [boolean, (text: string) => void] {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallback());
    } else {
      fallback();
    }
    function fallback() {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch {
        /* noop */
      }
    }
  };
  return [copied, copy];
}
