import {
  ArrowUpRight,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { SectionHead, Reveal, StatusDot, useOpenStatus } from "./ui";
import { LogoMark } from "./Header";
import {
  ADDRESS,
  PHONE_MOBILE_DISPLAY,
  PHONE_MOBILE_HREF,
  WORK_HOURS_LONG,
  WORK_HOURS_NOTE,
  WORK_HOURS_SHORT,
  YANDEX_MAPS_URL,
  getTobolskNow,
} from "../lib/data";

/* ------------------------------------------------------------------ */
/*  График                                                             */
/* ------------------------------------------------------------------ */

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Schedule() {
  const status = useOpenStatus();
  const todayIdx = (getTobolskNow().weekday + 6) % 7; // Пн = 0

  return (
    <div className="rounded-[28px] border-2 border-ink bg-cream p-6 shadow-[8px_8px_0_0_rgba(34,27,18,0.9)] sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <Clock className="h-6 w-6 text-branddark" />
        <h3 className="font-display text-lg font-bold sm:text-xl">Когда работает мастерская</h3>
      </div>

      <p className="mt-4 flex items-start gap-2.5 text-[16px] leading-relaxed">
        <span className="mt-2">
          <StatusDot status={status} />
        </span>
        <span>
          <strong>{status.label}.</strong> {status.detail}
        </span>
      </p>

      <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
        {DAYS.map((d, i) => {
          const isToday = i === todayIdx;
          const off = i >= 5;
          return (
            <div
              key={d}
              className={`rounded-xl border-2 px-1 py-2.5 text-center ${
                isToday
                  ? "border-branddark bg-brand/20"
                  : off
                    ? "border-ink/8 bg-paper2/60 text-ink3/70"
                    : "border-ink/12 bg-paper"
              }`}
            >
              <p className="font-mono text-[11px] font-bold tracking-wider uppercase sm:text-xs">
                {d}
                {isToday && <span className="block text-[9px] text-branddark">сегодня</span>}
              </p>
              <p className="mt-1 font-mono text-[11px] leading-tight font-bold sm:text-[13px]">
                {off ? "вых." : "9–18"}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 leading-relaxed text-ink3">
        {WORK_HOURS_LONG} Обеденного перерыва в графике нет, но я работаю один — могу ненадолго отойти или быть занят на приёме.
      </p>

      <p className="mt-4 rounded-xl bg-brand/15 px-4 py-3.5 leading-relaxed font-semibold">
        {WORK_HOURS_SHORT} · {WORK_HOURS_NOTE}. Перед визитом обязательно
        позвоните мне и договоритесь о времени приёма.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Схема входа                                                        */
/* ------------------------------------------------------------------ */

function EntranceScheme() {
  return (
    <svg
      viewBox="0 0 560 380"
      className="h-auto w-full"
      role="img"
      aria-label="Схема: мастерская «Хай-Фай» находится в доме 16 восьмого микрорайона, вход со двора. Со стороны улицы в том же доме — организация «Фото-плюс», это не мастерская."
    >
      {/* двор */}
      <rect x="10" y="10" width="540" height="150" rx="14" fill="#5e7a52" opacity="0.16" />
      <text x="28" y="42" fontFamily="'JetBrains Mono', monospace" fontSize="14" fontWeight="700" letterSpacing="2" fill="#42563a">
        ДВОР
      </text>
      {[70, 120, 470, 515].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={i % 2 ? 84 : 70} r="17" fill="#5e7a52" opacity="0.5" />
          <rect x={x - 2.5} y={i % 2 ? 96 : 82} width="5" height="12" fill="#7a5b3a" />
        </g>
      ))}

      {/* дорожка к входу */}
      <path
        d="M 540 330 C 470 300 505 220 440 185 C 400 163 360 160 330 158"
        fill="none"
        stroke="#b96f14"
        strokeWidth="4"
        strokeDasharray="10 8"
        strokeLinecap="round"
      />
      <path d="M 322 146 L 330 160 L 344 150" fill="none" stroke="#b96f14" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {/* дом */}
      <rect x="90" y="165" width="380" height="110" rx="10" fill="#221b12" />
      <text x="280" y="205" textAnchor="middle" fontFamily="'Unbounded', sans-serif" fontSize="19" fontWeight="700" fill="#f5eedf">
        ДОМ 16
      </text>
      <text x="280" y="230" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12.5" fill="#f3c969">
        8-й микрорайон
      </text>

      {/* вход Хай-Фай со двора */}
      <rect x="298" y="150" width="64" height="18" rx="4" fill="#df9426" stroke="#221b12" strokeWidth="2.5" />
      <circle cx="330" cy="118" r="27" fill="#df9426" stroke="#221b12" strokeWidth="3" />
      <text x="330" y="112" textAnchor="middle" fontFamily="'Unbounded', sans-serif" fontSize="10.5" fontWeight="900" fill="#221b12">
        ХАЙ-
      </text>
      <text x="330" y="126" textAnchor="middle" fontFamily="'Unbounded', sans-serif" fontSize="10.5" fontWeight="900" fill="#221b12">
        ФАЙ
      </text>
      <text x="330" y="66" textAnchor="middle" fontFamily="'Manrope', sans-serif" fontSize="15" fontWeight="800" fill="#221b12">
        вход в мастерскую — со двора, 1 этаж
      </text>

      {/* Фото-плюс со стороны улицы */}
      <rect x="120" y="272" width="120" height="16" rx="4" fill="#4a3d2a" stroke="#221b12" strokeWidth="2" />
      <text x="180" y="312" textAnchor="middle" fontFamily="'Manrope', sans-serif" fontSize="14.5" fontWeight="700" fill="#4a3d2a">
        «Фото-плюс» — другая организация
      </text>

      {/* улица */}
      <rect x="10" y="330" width="540" height="40" rx="8" fill="#221b12" opacity="0.12" />
      <path d="M 16 350 H 544" stroke="#221b12" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="22 16" />
      <text x="28" y="364" fontFamily="'JetBrains Mono', monospace" fontSize="12" letterSpacing="2" fill="#4a3d2a">
        УЛИЦА
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export default function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead
          chapter="06"
          kicker="Контакты"
          title="Позвоните мне — обсудим вашу задачу"
          lead={
            <p>
              Я принимаю по звонку. Расскажите, какие у вас кассеты, — уточню детали и договоримся о визите. Мне можно позвонить на сотовый, номер указан ниже.
            </p>
          }
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          <div className="space-y-7">
            {/* телефон */}
            <Reveal>
              <a
                href={PHONE_MOBILE_HREF}
                className="group block rounded-[24px] bg-brand p-6 text-ink shadow-[0_5px_0_0_var(--color-branddark)] transition hover:-translate-y-0.5 hover:bg-brandsoft sm:p-7"
              >
                <Phone className="h-8 w-8 transition-transform group-hover:-rotate-12" />
                <p className="mt-4 font-mono text-xs font-bold tracking-[0.16em] uppercase opacity-70">
                  Мобильный · единственный номер
                </p>
                <p className="mt-1 font-sans text-[30px] font-extrabold tracking-tight tabular-nums sm:text-[38px]">
                  {PHONE_MOBILE_DISPLAY}
                </p>
                <p className="mt-2 text-[16px] font-semibold opacity-75">
                  {WORK_HOURS_SHORT} · {WORK_HOURS_NOTE}
                </p>
              </a>
            </Reveal>

            <Reveal delay={90}>
              <Schedule />
            </Reveal>
          </div>

          {/* адрес и схема */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-[28px] border-2 border-ink bg-cream p-6 shadow-[8px_8px_0_0_rgba(34,27,18,0.9)] sm:p-7">
              <div className="flex items-start gap-3.5">
                <MapPin className="mt-1 h-7 w-7 shrink-0 text-rec" />
                <div>
                  <h3 className="font-sans text-[19px] leading-snug font-extrabold sm:text-[21px]">
                    {ADDRESS}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink3">
                    Вход именно со двора — обойдите дом, как показано на схеме.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-paper p-3 sm:p-4">
                <EntranceScheme />
              </div>

              <p className="mt-4 leading-relaxed text-ink3">
                В том же доме со стороны улицы работает «Фото-плюс» — это другая
                организация. Если вошли туда, вы почти на месте: просто обойдите
                дом со двора.
              </p>

              <div className="mt-auto pt-6">
                <a
                  href={YANDEX_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-base font-bold text-cream transition hover:bg-ink2"
                >
                  Открыть адрес в Яндекс.Картах
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <p className="mt-3 text-center font-mono text-xs text-ink3">
                  схема условная — маршрут можно посмотреть на карте или уточнить у меня по телефону
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Подвал                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-28 sm:px-6 lg:px-8 lg:pb-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-cream p-1.5">
                <LogoMark className="block h-9 w-9" />
              </span>
              <span className="leading-none">
                <span className="font-display block text-lg font-bold text-cream">
                  ХАЙ-ФАЙ
                </span>
                <span className="mt-1 block font-mono text-[10.5px] tracking-[0.22em] text-paper/60 uppercase">
                  мастерская · Тобольск
                </span>
              </span>
            </div>
            <p className="mt-5 leading-relaxed text-paper/75">
              Оцифровываю видеокассеты MiniDV и Digital8. Передам запись в файлах на флешке, диске или через облако и верну оригиналы кассет. Работаю один, принимаю по звонку.
            </p>
            <p className="font-hand mt-4 -rotate-1 text-2xl text-brandsoft">
              плёнка не вечна — память должна быть
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Разделы сайта">
              <p className="font-mono text-xs font-bold tracking-[0.2em] text-brandsoft uppercase">
                Главы кассеты
              </p>
              <ul className="mt-4 space-y-2.5 text-[16px] font-semibold">
                {[
                  ["#digitize", "Оцифровка кассет"],
                  ["#calculator", "Калькулятор цен"],
                  ["#about", "О мастерской"],
                  ["#visit", "Как проходит визит"],
                  ["#faq", "Частые вопросы"],
                  ["#contacts", "Контакты"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="transition hover:text-brandsoft">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.2em] text-brandsoft uppercase">
                Связь и адрес
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href={PHONE_MOBILE_HREF} className="font-sans text-[18px] font-extrabold tabular-nums text-cream transition hover:text-brandsoft">
                    {PHONE_MOBILE_DISPLAY}
                  </a>
                </li>
                <li className="leading-relaxed text-paper/75">{ADDRESS}</li>
                <li className="leading-relaxed text-paper/75">
                  {WORK_HOURS_LONG}
                  <br />
                  {WORK_HOURS_NOTE} — перед визитом позвоните.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-[14px] leading-relaxed text-paper/55">
          <p>
            Цены на сайте соответствуют прайсу мастерской. Точную стоимость я назову после осмотра кассет — до начала работы.
            Возможность считывания записи зависит от состояния ленты.
            Уже утраченные фрагменты вернуть нельзя.
          </p>
          <p className="mt-3 font-mono text-[12.5px] tracking-wide">
            © Мастерская «Хай-Фай», Тобольск · ■ КОНЕЦ ЗАПИСИ — ПЕРЕМОТАЙТЕ, ПОЖАЛУЙСТА
          </p>
        </div>
      </div>
    </footer>
  );
}
