import { useEffect, useRef, useState } from "react";
import { Calculator, Pause, Play } from "lucide-react";
import { Digital8Cassette, TapeSticker } from "./Cassette";
import { CallButton, Reveal, StatusDot, useOpenStatus, useReducedMotion } from "./ui";

/* Таймкод как на видеокамере: 25 кадров в секунду (PAL). */
function Timecode({ playing }: { playing: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      return;
    }
    const id = window.setInterval(() => {
      const now = performance.now();
      if (lastRef.current != null) {
        const dt = now - lastRef.current;
        setElapsed((e) => e + dt);
      }
      lastRef.current = now;
    }, 40);
    return () => window.clearInterval(id);
  }, [playing]);

  const totalFrames = Math.floor((elapsed / 1000) * 25);
  const ff = totalFrames % 25;
  const totalSec = Math.floor(totalFrames / 25);
  const ss = totalSec % 60;
  const mm = Math.floor(totalSec / 60) % 60;
  const hh = Math.floor(totalSec / 3600);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="font-mono text-sm font-bold tracking-[0.14em] text-cream/90 tabular-nums sm:text-base">
      {pad(hh)}:{pad(mm)}:{pad(ss)}:{pad(ff)}
    </span>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-9 w-9 border-cream/45 sm:h-12 sm:w-12 ${className}`}
    />
  );
}

const STATS: { value: string; label: string }[] = [
  { value: "MiniDV", label: "перевожу запись в цифровые файлы" },
  { value: "Digital8", label: "считываю цифровое видео с кассет" },
  { value: "Лично", label: "принимаю технику и отвечаю на звонки" },
  { value: "До работ", label: "согласую с вами стоимость" },
];

export default function Hero() {
  const status = useOpenStatus();
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  return (
    <section id="top" className="grain relative overflow-hidden bg-ink text-cream">
      {/* тёплое ламповое пятно */}
      <div
        aria-hidden
        className="absolute top-[-10%] right-[-8%] h-[480px] w-[480px] rounded-full bg-brand/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-[-6%] h-[380px] w-[380px] rounded-full bg-brandsoft/10 blur-[100px]"
      />
      {/* полоса «трекинга» */}
      <div
        aria-hidden
        className="tracking-line pointer-events-none absolute right-0 left-0 h-16 bg-gradient-to-b from-transparent via-cream/[0.045] to-transparent"
      />

      {/* рамка видоискателя (верх — ниже фиксированной шапки) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-3 top-[86px] bottom-3 z-20 sm:inset-x-5 sm:bottom-5"
      >
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="right-0 bottom-0 border-r-2 border-b-2" />
      </div>

      {/* HUD: верх видоискателя */}
      <div className="pointer-events-none absolute inset-x-0 top-[98px] z-20 flex items-start justify-between px-7 sm:px-11">
        <span className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.28em]">
          <span className="rec-dot inline-block h-3 w-3 rounded-full bg-rec" />
          REC
        </span>
        <span className="flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] text-cream/80 sm:text-sm">
          <span className="hidden sm:inline">D8</span>
          <svg viewBox="0 0 30 16" className="h-4 w-7" aria-hidden>
            <rect x="1" y="2" width="24" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3.5" y="4.5" width="15" height="7" rx="1.2" fill="currentColor" />
            <path d="M 27.5 6 v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-36 pb-14 sm:px-10 lg:px-14 lg:pt-40 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* текст */}
          <div>
            <Reveal>
              <p className="font-mono text-[13px] font-medium tracking-[0.2em] text-brandsoft uppercase">
                Тобольск · 8-й микрорайон, 16 · вход со двора
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-5 text-[clamp(1.9rem,5.2vw,3.6rem)] leading-[1.12] font-black text-balance">
                Оцифровываю кассеты.
                <span className="mt-1 block text-brandsoft">Ремонтирую технику.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/90 sm:text-xl">
                Я владелец и мастер «Хай-Фай» в Тобольске. Перевожу в цифру
                семейные кассеты MiniDV и Digital8, устанавливаю Windows и
                программы, восстанавливаю файлы со старых дисков. Ремонтирую
                компьютеры, магнитолы, роботы-пылесосы и аудиотехнику.
                Сам принимаю технику, объясняю, что нужно сделать, и согласую
                стоимость до начала работы. По телефону вы говорите со мной.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CallButton />
                <a
                  href="#calculator"
                  className="inline-flex min-h-14 items-center gap-2.5 rounded-2xl border-2 border-cream/35 px-6 py-3.5 text-lg font-bold text-cream transition hover:border-brandsoft hover:text-brandsoft"
                >
                  <Calculator className="h-5 w-5" />
                  Сколько стоит оцифровка?
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-6 flex max-w-xl items-start gap-2.5 text-[15.5px] leading-relaxed text-paper/75">
                <span className="mt-1.5">
                  <StatusDot status={status} />
                </span>
                <span>
                  <strong className="text-cream">{status.label}.</strong>{" "}
                  {status.detail} Я работаю один и на дом не выезжаю —
                  перед визитом обязательно позвоните и договоритесь о времени.
                </span>
              </p>
            </Reveal>
          </div>

          {/* кассета */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-[560px]">
              <TapeSticker
                text="выпускной, 11 «Б»"
                tilt="-5deg"
                className="floaty absolute -top-7 left-2 z-20 hidden sm:inline-block"
              />
              <TapeSticker
                text="Кате 3 года. Дача"
                tilt="4deg"
                className="floaty absolute -right-2 -bottom-5 z-20 hidden [animation-delay:1.4s] sm:inline-block"
              />
              <div
                className={`-rotate-2 drop-shadow-[0_34px_44px_rgba(0,0,0,0.55)] ${
                  playing ? "" : "cassette-paused"
                }`}
              >
                <Digital8Cassette className="h-auto w-full" />
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-pressed={playing}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-cream/25 bg-ink2 px-5 py-2.5 font-mono text-sm font-bold tracking-[0.18em] text-cream uppercase transition hover:border-brandsoft hover:text-brandsoft"
                >
                  {playing ? (
                    <>
                      <Pause className="h-4.5 w-4.5" /> Пауза
                    </>
                  ) : (
                    <>
                      <Play className="h-4.5 w-4.5" /> Пуск
                    </>
                  )}
                </button>
                <span className="font-mono text-[13px] text-paper/60">
                  бобины крутятся — как в 2003-м
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* цифры */}
        <Reveal delay={150}>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cream/15 pt-9 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-[15px] leading-snug text-paper/70">
                  {s.label}
                </dt>
                <dd className="font-display order-1 text-3xl font-bold text-brandsoft sm:text-4xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* HUD: низ видоискателя */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-7 pb-6 sm:px-11 sm:pb-7">
        <span className="hidden font-mono text-xs font-bold tracking-[0.22em] text-cream/75 uppercase sm:inline">
          Тобольск · мастерская «Хай-Фай»
        </span>
        <span className="sm:hidden" />
        <Timecode playing={playing} />
      </div>
    </section>
  );
}
