import { useMemo, useState } from "react";
import {
  ArrowRight,
  Cloud,
  Disc,
  Scissors,
  Sparkles,
  Undo2,
  Usb,
  Wrench,
} from "lucide-react";
import { SectionHead, Reveal } from "./ui";
import { formatMoney } from "../lib/data";

/* ------------------------------------------------------------------ */
/*  Гид по форматам: Digital8 и MiniDV в одном масштабе               */
/* ------------------------------------------------------------------ */

type Format = "digital8" | "minidv";

const FORMAT_INFO: Record<
  Format,
  { title: string; size: string; signs: string[]; prices: string[] }
> = {
  digital8: {
    title: "Digital8 и похожие кассеты 8 мм",
    size: "95 × 62,5 мм · почти как аудиокассета",
    signs: [
      "кассета 8 мм может содержать аналоговую или цифровую запись",
      "Hi8, Video8 и 8 mm на корпусе не подтверждают запись Digital8",
      "перед приёмом я уточню формат записи и возможность считывания",
    ],
    prices: ["запись Digital8 до 60 минут — 700 ₽", "Digital8 60–90 минут — 900 ₽"],
  },
  minidv: {
    title: "MiniDV — маленькая кассета",
    size: "66 × 48 мм · помещается в ладонь",
    signs: [
      "из компактной видеокамеры 2000-х годов",
      "надписи: MiniDV, DVM60, DVM80",
      "меньше банковской карты, очень лёгкая",
    ],
    prices: ["до 60 минут записи — 600 ₽", "60–90 минут — 800 ₽"],
  },
};

function FormatGuide() {
  const [format, setFormat] = useState<Format>("digital8");
  const info = FORMAT_INFO[format];

  const boxCls = (f: Format) =>
    format === f
      ? "fill-brand/25 stroke-branddark"
      : "fill-ink/[0.04] stroke-ink/30";

  return (
    <div className="rounded-[28px] border-2 border-ink bg-cream p-5 shadow-[8px_8px_0_0_rgba(34,27,18,0.9)] sm:p-7">
      <p className="font-mono text-xs font-bold tracking-[0.18em] text-branddark uppercase">
        Гид: какая у меня кассета?
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5" role="tablist" aria-label="Формат кассеты">
        {(Object.keys(FORMAT_INFO) as Format[]).map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={format === f}
            onClick={() => setFormat(f)}
            className={`min-h-12 rounded-xl border-2 px-5 py-2.5 text-base font-extrabold transition ${
              format === f
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 bg-paper hover:border-ink"
            }`}
          >
            {f === "digital8" ? "Digital8 · как аудио" : "MiniDV · в ладонь"}
          </button>
        ))}
      </div>

      {/* чертёж в масштабе 1 мм ≈ 2,4 px */}
      <svg
        viewBox="0 0 560 350"
        className="mt-5 h-auto w-full"
        role="img"
        aria-label="Сравнение размеров: кассета Digital8 95 на 62,5 миллиметра, кассета MiniDV 66 на 48 миллиметров и банковская карта"
      >
        {/* Digital8 */}
        <rect x="36" y="40" width="228" height="150" rx="9" className={boxCls("digital8")} strokeWidth="3" />
        <text x="52" y="70" fontFamily="'JetBrains Mono', monospace" fontSize="16" fontWeight="700" fill="#221b12">
          Digital8 · 95×62,5
        </text>
        <rect x="86" y="92" width="128" height="60" rx="8" fill="none" stroke="#221b12" strokeOpacity="0.3" strokeWidth="2" />
        <circle cx="120" cy="122" r="17" fill="none" stroke="#221b12" strokeOpacity="0.35" strokeWidth="2.5" />
        <circle cx="180" cy="122" r="14" fill="none" stroke="#221b12" strokeOpacity="0.35" strokeWidth="2.5" />
        <text x="52" y="178" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#4a3d2a">
          Hi8 / Video8 / 8 mm
        </text>

        {/* MiniDV */}
        <rect x="320" y="86" width="158" height="115" rx="7" className={boxCls("minidv")} strokeWidth="3" />
        <text x="334" y="112" fontFamily="'JetBrains Mono', monospace" fontSize="14.5" fontWeight="700" fill="#221b12">
          MiniDV
        </text>
        <text x="334" y="132" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#4a3d2a">
          66×48 мм
        </text>
        <circle cx="360" cy="166" r="12" fill="none" stroke="#221b12" strokeOpacity="0.4" strokeWidth="2" />
        <circle cx="432" cy="166" r="10" fill="none" stroke="#221b12" strokeOpacity="0.4" strokeWidth="2" />

        {/* карта */}
        <rect x="48" y="238" width="206" height="130" rx="8" fill="none" stroke="#7a5b3a" strokeWidth="2" strokeDasharray="7 6" />
        <text x="60" y="268" fontFamily="'JetBrains Mono', monospace" fontSize="13" fill="#7a5b3a">
          банковская карта
        </text>
        <text x="60" y="290" fontFamily="'JetBrains Mono', monospace" fontSize="13" fill="#7a5b3a">
          85,6×54 мм
        </text>
        <text x="36" y="330" fontFamily="'JetBrains Mono', monospace" fontSize="12.5" fill="#4a3d2a">
          чертёж условный, пропорции настоящие
        </text>
      </svg>

      <div className="mt-2 border-t-2 border-dashed border-ink/15 pt-5">
        <h4 className="text-xl font-extrabold">{info.title}</h4>
        <p className="mt-1 font-mono text-sm text-ink3">{info.size}</p>
        <ul className="mt-3.5 space-y-1.5">
          {info.signs.map((s) => (
            <li key={s} className="flex gap-2.5 text-[16px] leading-snug">
              <span aria-hidden className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-brand" />
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-xl bg-paper px-4 py-3.5">
          {info.prices.map((p) => (
            <p key={p} className="font-mono text-[15px] font-bold">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Возраст плёнки                                                     */
/* ------------------------------------------------------------------ */

function TapeAge() {
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(2003);
  const age = thisYear - year;

  const { text, health, tone } = useMemo(() => {
    const h = Math.max(8, Math.min(96, 100 - (age - 10) * 2.6));
    if (age < 18)
      return {
        health: h,
        tone: "bg-sage",
        text: "Возраст записи сам по себе не показывает состояние ленты. Я осмотрю кассету и проверю, можно ли считать запись.",
      };
    if (age <= 27)
      return {
        health: h,
        tone: "bg-brand",
        text: "На сохранность влияют влажность, температура и использование кассеты. Я проверю запись; по одному году съёмки качество определить нельзя.",
      };
    return {
      health: h,
      tone: "bg-rec",
      text: "Старую кассету стоит осмотреть перед воспроизведением. Я оценю состояние ленты и предупрежу о повреждениях, если их обнаружу.",
    };
  }, [age]);

  return (
    <div className="flex h-full flex-col rounded-[28px] bg-ink p-6 text-cream sm:p-8">
      <p className="font-mono text-xs font-bold tracking-[0.18em] text-brandsoft uppercase">
        Сколько лет вашим записям?
      </p>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <span className="font-display text-5xl font-black tabular-nums">{year}</span>
        <span className="text-lg text-paper/75">
          год съёмки — записи уже{" "}
          <strong className="text-brandsoft">
            {age}{" "}
            {age % 10 === 1 && age % 100 !== 11
              ? "год"
              : age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 10 || age % 100 >= 20)
                ? "года"
                : "лет"}
          </strong>
        </span>
      </div>
      <label className="mt-6 block">
        <span className="sr-only">Выберите год съёмки</span>
        <input
          type="range"
          min={1995}
          max={2012}
          step={1}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="tape-range"
          aria-valuetext={`${year} год, записи ${age} лет`}
        />
      </label>
      <div className="mt-2 flex justify-between font-mono text-xs text-paper/55">
        <span>1995</span>
        <span>2000</span>
        <span>2006</span>
        <span>2012</span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between font-mono text-xs tracking-wide text-paper/65 uppercase">
          <span>Шкала возраста записи</span>
          <span>условно</span>
        </div>
        <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-cream/15">
          <div
            className={`h-full rounded-full ${tone} transition-[width] duration-300`}
            style={{ width: `${health}%` }}
          />
        </div>
      </div>

      <p className="mt-5 text-[17px] leading-relaxed text-paper/90">{text}</p>
      <p className="font-hand mt-auto pt-5 text-2xl text-brandsoft">
        состояние записи проверю по самой кассете
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const STEPS = [
  {
    n: "01",
    title: "Приносите кассеты",
    text: "Я осмотрю ленту и корпус, уточню формат записи, назову цену и срок. Если кассета повреждена, объясню ограничения до начала работы.",
  },
  {
    n: "02",
    title: "Идёт захват — в реальном времени",
    text: "Я считываю запись MiniDV или Digital8 с камеры в цифровом виде: час видео занимает час захвата. Срок для всего архива согласую отдельно.",
  },
  {
    n: "03",
    title: "Забираете файлы и оригиналы",
    text: "Я передам видео на вашей или новой флешке, в облаке или на диске и верну оригиналы кассет. Способ записи согласую с вами с учётом того, где вы планируете смотреть видео.",
  },
];

const OPTIONS = [
  {
    Icon: Cloud,
    title: "Куда записать",
    text: "В облако по ссылке — бесплатно, файлы хранятся 30 дней. На новую флешку 64 ГБ — 600 ₽. На DVD-диск — 200 ₽. Можно и на вашу флешку.",
  },
  {
    Icon: Sparkles,
    title: "Шумоподавление · +250 ₽",
    text: "Программная обработка убирает часть «снега», шипения и грязи старой плёнки. Я заранее объясню, какие улучшения возможны для вашей записи.",
  },
  {
    Icon: Scissors,
    title: "Простой монтаж · от 500 ₽",
    text: "Аккуратная склейка: убрать пустые места и случайные куски «в пол», соединить фрагменты одного события в один фильм.",
  },
  {
    Icon: Undo2,
    title: "Оригиналы — обратно вам",
    text: "Я возвращаю оригиналы кассет вместе с готовыми файлами. Если для ремонта потребуется разобрать корпус, сначала обсужу это с вами.",
  },
];

const PRICE_SHORT: [string, string][] = [
  ["MiniDV до 60 минут", "600 ₽"],
  ["MiniDV 60–90 минут", "800 ₽"],
  ["Digital8 до 60 минут", "700 ₽"],
  ["Digital8 60–90 минут", "900 ₽"],
  ["Шумоподавление", "+250 ₽ за кассету"],
  ["Простой монтаж", "от 500 ₽ за кассету"],
  ["Облако (30 дней)", "бесплатно"],
  ["Новая флешка 64 ГБ", "600 ₽"],
  ["Запись на CD/DVD", "200 ₽"],
  ["Срочный заказ", "+50% к стоимости"],
  ["Минимальный заказ", "600 ₽"],
];

export default function Digitize() {
  return (
    <section id="digitize" className="scroll-mt-24 bg-paper2/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead
          chapter="01"
          kicker="Семейный архив"
          title={
            <>
              С кассеты — в цифру.
              <span className="block">Пока плёнка ещё жива.</span>
            </>
          }
          lead={
            <p>
              Я оцифровываю видеокассеты MiniDV и Digital8 с домашними записями: свадьбами, праздниками, первыми шагами детей. Перенесу доступную запись в файлы, которые можно смотреть без видеокамеры. Перед работой проверю состояние кассет и согласую с вами результат и стоимость.
            </p>
          }
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* процесс */}
          <div>
            <Reveal>
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                Как устроена оцифровка
              </h3>
            </Reveal>
            <ol className="mt-6 space-y-5">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 90}>
                  <div className="flex gap-5 rounded-3xl border-2 border-ink/10 bg-cream p-5 sm:p-6">
                    <span className="font-display shrink-0 text-2xl font-black text-brand">
                      {s.n}
                    </span>
                    <div>
                      <h4 className="text-lg font-extrabold">{s.title}</h4>
                      <p className="mt-1.5 leading-relaxed text-ink3">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={150}>
              <div className="mt-6 flex gap-4 rounded-3xl border-2 border-dashed border-branddark/50 bg-brand/10 p-5 sm:p-6">
                <Wrench className="h-7 w-7 shrink-0 text-branddark" />
                <p className="leading-relaxed">
                  <strong>Кассета сломана или плёнка порвана?</strong> Ремонт
                  корпуса и ленты — от {formatMoney(500)} до {formatMoney(1500)}.
                  Оплачивается сама работа по восстановлению: если запись на
                  повреждённом месте уже утрачена, вернуть её нельзя — об этом
                  я предупрежу до начала работы.
                </p>
              </div>
            </Reveal>
          </div>

          {/* гид по форматам */}
          <Reveal delay={100}>
            <FormatGuide />
          </Reveal>
        </div>

        {/* возраст плёнки + короткий прайс */}
        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <Reveal className="min-w-0 lg:col-span-3">
            <TapeAge />
          </Reveal>
          <Reveal delay={100} className="min-w-0 lg:col-span-2">
            <div className="flex h-full flex-col rounded-[28px] border-2 border-ink bg-cream p-6 sm:p-7">
              <p className="font-mono text-xs font-bold tracking-[0.18em] text-branddark uppercase">
                Прайс коротко
              </p>
              <ul className="mt-4 flex-1 divide-y divide-dashed divide-ink/15">
                {PRICE_SHORT.map(([name, price]) => (
                  <li key={name} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="text-[16px] font-semibold">{name}</span>
                    <span className="shrink-0 font-mono text-[15px] font-bold whitespace-nowrap">
                      {price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-brand/15 px-4 py-3 text-[15px] leading-snug font-semibold">
                Скидка за объём: −100 / −150 / −200 ₽ с каждой кассеты при 5 / 10 / 20 кассетах в заказе.
              </p>
              <a
                href="#calculator"
                className="mt-5 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-base font-bold text-cream transition hover:bg-ink2"
              >
                Посчитать мой архив
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* опции */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {OPTIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 80}>
              <div className="h-full rounded-3xl border-2 border-ink/10 bg-cream p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20">
                  <o.Icon className="h-6 w-6 text-branddark" />
                </span>
                <h4 className="mt-4 text-lg font-extrabold">{o.title}</h4>
                <p className="mt-2 leading-relaxed text-ink3">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mt-8 flex items-center gap-3 font-mono text-sm text-ink3">
            <Disc className="h-5 w-5 shrink-0" />
            <Usb className="h-5 w-5 shrink-0" />
            Я работаю с цифровыми записями MiniDV и Digital8. Если на кассете написано Hi8 или Video8, сначала уточню формат записи и возможность считывания: одной маркировки недостаточно. Аудиокассеты, бобины и киноплёнку не оцифровываю.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
