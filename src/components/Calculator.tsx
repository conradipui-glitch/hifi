import { useMemo, useState } from "react";
import {
  Check,
  Cloud,
  Copy,
  Disc,
  Minus,
  Plus,
  RotateCcw,
  Scissors,
  Sparkles,
  Usb,
  Zap,
} from "lucide-react";
import { SectionHead, CallButton, Reveal, useCopy } from "./ui";
import {
  PRICE,
  TAPE_KINDS,
  type TapeKind,
  formatMoney,
  nextDiscountStep,
  plural,
  volumeDiscountPerTape,
} from "../lib/data";

type Medium = "cloud" | "usb" | "dvd";
type Counts = Record<TapeKind, number>;

const KIND_ORDER: TapeKind[] = ["minidvShort", "minidvLong", "digital8Short", "digital8Long"];

const KIND_CHEAT: Record<TapeKind, string> = {
  minidvShort: "MiniDV до 60 минут",
  minidvLong: "MiniDV 60–90 минут",
  digital8Short: "Digital8 до 60 минут",
  digital8Long: "Digital8 60–90 минут",
};

const MEDIUMS: {
  id: Medium;
  title: string;
  price: string;
  note: string;
  Icon: typeof Cloud;
  cheat: string;
}[] = [
  {
    id: "cloud",
    title: "В облако",
    price: "бесплатно",
    note: "ссылка для скачивания, файлы хранятся 30 дней",
    Icon: Cloud,
    cheat: "Записать прошу в облако по ссылке",
  },
  {
    id: "usb",
    title: "Новая флешка 64 ГБ",
    price: "+600 ₽",
    note: "флешка останется у вас, хватает на большой архив",
    Icon: Usb,
    cheat: "Записать прошу на новую флешку",
  },
  {
    id: "dvd",
    title: "На DVD-диски",
    price: "+200 ₽ за кассету",
    note: "по старинке, для DVD-проигрывателя",
    Icon: Disc,
    cheat: "Записать прошу на DVD-диски",
  },
];

function Counter({
  kind,
  value,
  effectivePrice,
  onChange,
}: {
  kind: TapeKind;
  value: number;
  effectivePrice: number;
  onChange: (v: number) => void;
}) {
  const k = TAPE_KINDS[kind];
  const btn =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-cream/30 text-cream transition enabled:hover:border-brandsoft enabled:hover:text-brandsoft disabled:opacity-30";
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-cream/12 bg-ink2 px-4 py-3.5 sm:px-5">
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-extrabold text-cream">{k.title}</p>
        <p className="mt-0.5 text-sm text-paper/60">
          {k.hint} ·{" "}
          <span className="font-mono font-bold text-brandsoft">
            {formatMoney(effectivePrice)}
          </span>
          {effectivePrice !== k.price && (
            <span className="ml-1.5 font-mono text-paper/45 line-through">
              {formatMoney(k.price)}
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          className={btn}
          disabled={value === 0}
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`Убавить: ${k.title}`}
        >
          <Minus className="h-5 w-5" />
        </button>
        <span
          className="w-9 text-center font-mono text-xl font-bold text-cream tabular-nums"
          aria-live="polite"
          aria-label={`${k.title}: ${value}`}
        >
          {value}
        </span>
        <button
          type="button"
          className={btn}
          onClick={() => onChange(Math.min(60, value + 1))}
          aria-label={`Прибавить: ${k.title}`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function Toggle({
  on,
  onClick,
  Icon,
  title,
  price,
  note,
}: {
  on: boolean;
  onClick: () => void;
  Icon: typeof Sparkles;
  title: string;
  price: string;
  note: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition sm:px-5 ${
        on
          ? "border-brand bg-brand/15"
          : "border-cream/12 bg-ink2 hover:border-cream/30"
      }`}
    >
      <Icon className={`h-6 w-6 shrink-0 ${on ? "text-brandsoft" : "text-paper/55"}`} />
      <span className="min-w-0 flex-1">
        <span className="block text-[17px] font-extrabold text-cream">
          {title}{" "}
          <span className="font-mono text-sm font-bold text-brandsoft">{price}</span>
        </span>
        <span className="mt-0.5 block text-sm text-paper/60">{note}</span>
      </span>
      <span
        aria-hidden
        className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
          on ? "bg-brand" : "bg-cream/20"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-cream shadow transition-all ${
            on ? "left-7" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

function ReceiptEdge() {
  const pts: string[] = ["0,0", "1000,0"];
  for (let x = 1000; x > 0; x -= 25) {
    pts.push(`${x - 12.5},12`);
    pts.push(`${x - 25},0`);
  }
  return (
    <svg
      viewBox="0 0 1000 12"
      preserveAspectRatio="none"
      className="-mt-px block h-3 w-full"
      aria-hidden
    >
      <polygon points={pts.join(" ")} fill="#fbf7ec" />
    </svg>
  );
}

function ReceiptLine({
  name,
  value,
  strong = false,
  accent = false,
}: {
  name: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 ${
        strong ? "text-[17px] font-bold" : "text-[15px]"
      } ${accent ? "text-sage" : ""}`}
    >
      <span className="min-w-0">{name}</span>
      <span aria-hidden className="mx-1 flex-1 border-b border-dotted border-ink/30" />
      <span className="shrink-0 tabular-nums">{value}</span>
    </div>
  );
}

export default function Calculator() {
  const [counts, setCounts] = useState<Counts>({
    minidvShort: 2,
    minidvLong: 0,
    digital8Short: 3,
    digital8Long: 0,
  });
  const [noise, setNoise] = useState(false);
  const [edit, setEdit] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [medium, setMedium] = useState<Medium>("cloud");
  const [copied, copy] = useCopy();

  const calc = useMemo(() => {
    const totalTapes = KIND_ORDER.reduce((s, k) => s + counts[k], 0);
    const discount = volumeDiscountPerTape(totalTapes);
    const baseLines = KIND_ORDER.filter((k) => counts[k] > 0).map((k) => ({
      kind: k,
      count: counts[k],
      sum: counts[k] * TAPE_KINDS[k].price,
    }));
    const baseSum = baseLines.reduce((s, l) => s + l.sum, 0);
    const discountSum = discount * totalTapes;
    const noiseSum = noise ? PRICE.noisePerTape * totalTapes : 0;
    const editSum = edit ? PRICE.editPerTapeFrom * totalTapes : 0;
    const dvdSum = medium === "dvd" ? PRICE.dvdPerDisc * totalTapes : 0;
    const works = baseSum - discountSum + noiseSum + editSum + dvdSum;
    const urgentFee = urgent && works > 0 ? Math.round(works * 0.5) : 0;
    const usbSum = medium === "usb" && totalTapes > 0 ? PRICE.usb64 : 0;
    let total = works + urgentFee + usbSum;
    const minApplied = totalTapes > 0 && total > 0 && total < PRICE.minOrder;
    if (minApplied) total = PRICE.minOrder;
    const hours = KIND_ORDER.reduce(
      (s, k) => s + counts[k] * TAPE_KINDS[k].hours,
      0,
    );
    return {
      totalTapes,
      discount,
      baseLines,
      discountSum,
      noiseSum,
      editSum,
      dvdSum,
      urgentFee,
      usbSum,
      total,
      minApplied,
      hours,
    };
  }, [counts, noise, edit, urgent, medium]);

  const next = nextDiscountStep(calc.totalTapes);
  const today = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cheat = useMemo(() => {
    if (calc.totalTapes === 0) return "";
    const parts = KIND_ORDER.filter((k) => counts[k] > 0).map(
      (k) =>
        `${counts[k]} ${plural(counts[k], ["кассета", "кассеты", "кассет"])} ${KIND_CHEAT[k]}`,
    );
    let text = `Здравствуйте! Хочу оцифровать кассеты: у меня ${parts.join(", ")}.`;
    if (noise) text += " Нужно шумоподавление.";
    if (edit) text += " Интересует простой монтаж.";
    text += ` ${MEDIUMS.find((m) => m.id === medium)!.cheat}.`;
    if (urgent) text += " Хотелось бы побыстрее — готов(а) доплатить за срочность.";
    text += ` Посчитал(а) на сайте, получилось ${edit ? "от " : ""}${formatMoney(calc.total)}. Когда можно подойти?`;
    return text;
  }, [calc, counts, noise, edit, urgent, medium]);

  const setCount = (kind: TapeKind, v: number) =>
    setCounts((c) => ({ ...c, [kind]: v }));

  const hoursText = Number.isInteger(calc.hours)
    ? String(calc.hours)
    : calc.hours.toFixed(1).replace(".", ",");

  return (
    <section id="calculator" className="grain relative scroll-mt-24 overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute top-[-12%] left-[30%] h-[420px] w-[420px] rounded-full bg-brand/15 blur-[110px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead
          dark
          chapter="02"
          kicker="Смета без сюрпризов"
          title="Калькулятор оцифровки"
          lead={
            <p>
              Одна кассета MiniDV — от {formatMoney(TAPE_KINDS.minidvShort.price)},
              Digital8 — от {formatMoney(TAPE_KINDS.digital8Short.price)}. Цены —
              строго из прайса мастерской, скидки за объём считаются сами.
              Соберите свой архив слева, а справа «напечатается» расчёт и
              шпаргалка: её можно прочитать мне по телефону.
            </p>
          }
          hand="честно, до копейки по прайсу"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* ---------- элементы управления ---------- */}
          <Reveal>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="mr-1 font-mono text-xs font-bold tracking-[0.16em] text-paper/55 uppercase">
                  Быстрый старт:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCounts({ minidvShort: 1, minidvLong: 0, digital8Short: 0, digital8Long: 0 })
                  }
                  className="min-h-10 rounded-full border border-cream/25 px-4 py-2 text-sm font-bold text-cream transition hover:border-brandsoft hover:text-brandsoft"
                >
                  Одна кассета MiniDV
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCounts({ minidvShort: 3, minidvLong: 1, digital8Short: 6, digital8Long: 1 })
                  }
                  className="min-h-10 rounded-full border border-cream/25 px-4 py-2 text-sm font-bold text-cream transition hover:border-brandsoft hover:text-brandsoft"
                >
                  Целая коробка с антресолей
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCounts({ minidvShort: 0, minidvLong: 0, digital8Short: 0, digital8Long: 0 });
                    setNoise(false);
                    setEdit(false);
                    setUrgent(false);
                    setMedium("cloud");
                  }}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-cream/25 px-4 py-2 text-sm font-bold text-cream transition hover:border-rec hover:text-rec"
                >
                  <RotateCcw className="h-4 w-4" /> Сбросить
                </button>
              </div>

              <h3 className="mt-8 font-mono text-sm font-bold tracking-[0.18em] text-brandsoft uppercase">
                1 · Ваши кассеты
              </h3>
              <div className="mt-4 space-y-3">
                {KIND_ORDER.map((kind) => (
                  <Counter
                    key={kind}
                    kind={kind}
                    value={counts[kind]}
                    effectivePrice={TAPE_KINDS[kind].price - calc.discount}
                    onChange={(v) => setCount(kind, v)}
                  />
                ))}
              </div>
              <p aria-live="polite" className="mt-4 text-[15.5px] leading-relaxed text-paper/75">
                Всего кассет:{" "}
                <strong className="text-cream">{calc.totalTapes}</strong>
                {calc.discount > 0 && (
                  <>
                    {" "}· действует скидка за объём{" "}
                    <strong className="text-brandsoft">
                      −{formatMoney(calc.discount)} с каждой кассеты
                    </strong>
                  </>
                )}
                {next && calc.totalTapes > 0 && (
                  <>
                    {" "}· добавьте ещё {next.need}{" "}
                    {plural(next.need, ["кассету", "кассеты", "кассет"])} — скидка
                    вырастет до {formatMoney(next.discount)} с кассеты
                  </>
                )}
              </p>

              <h3 className="mt-9 font-mono text-sm font-bold tracking-[0.18em] text-brandsoft uppercase">
                2 · Дополнительно
              </h3>
              <div className="mt-4 space-y-3">
                <Toggle
                  on={noise}
                  onClick={() => setNoise((v) => !v)}
                  Icon={Sparkles}
                  title="Шумоподавление"
                  price="+250 ₽ / кассета"
                  note="убрать часть «снега» и шипения старой плёнки"
                />
                <Toggle
                  on={edit}
                  onClick={() => setEdit((v) => !v)}
                  Icon={Scissors}
                  title="Простой монтаж"
                  price="от 500 ₽ / кассета"
                  note="склеить фрагменты и вырезать пустые места в Pinnacle Studio"
                />
                <Toggle
                  on={urgent}
                  onClick={() => setUrgent((v) => !v)}
                  Icon={Zap}
                  title="Срочный заказ"
                  price="+50% к работам"
                  note="если видео нужно к юбилею или другой дате — договоримся о сроке по телефону"
                />
              </div>

              <h3 className="mt-9 font-mono text-sm font-bold tracking-[0.18em] text-brandsoft uppercase">
                3 · На что записать результат
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Носитель для готовых файлов">
                {MEDIUMS.map((m) => {
                  const selected = medium === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setMedium(m.id)}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        selected
                          ? "border-brand bg-brand/15"
                          : "border-cream/12 bg-ink2 hover:border-cream/30"
                      }`}
                    >
                      <m.Icon className={`h-7 w-7 ${selected ? "text-brandsoft" : "text-paper/55"}`} />
                      <span className="mt-2.5 block text-[16px] leading-snug font-extrabold text-cream">
                        {m.title}
                      </span>
                      <span className="mt-0.5 block font-mono text-sm font-bold text-brandsoft">
                        {m.price}
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-paper/60">
                        {m.note}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3.5 text-sm text-paper/55">
                Можно принести и свою флешку — тогда носитель ничего не стоит.
              </p>
            </div>
          </Reveal>

          {/* ---------- чек ---------- */}
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <div className="-rotate-[0.6deg]">
                <div className="bg-cream px-6 pt-7 pb-6 font-mono text-ink shadow-[0_30px_50px_rgba(0,0,0,0.45)] sm:px-8">
                  <div className="text-center">
                    <p className="text-[17px] font-bold tracking-[0.14em]">
                      МАСТЕРСКАЯ «ХАЙ-ФАЙ»
                    </p>
                    <p className="mt-1 text-[13px] text-ink3">
                      Тобольск · 8-й мкр, д. 16 · вход со двора
                    </p>
                    <p className="mt-1 text-[13px] text-ink3">{today}</p>
                    <p className="mt-3 text-[13px] font-bold tracking-[0.3em]">
                      * * * РАСЧЁТ ОЦИФРОВКИ * * *
                    </p>
                  </div>

                  <div className="my-5 border-t-2 border-dashed border-ink/25" />

                  {calc.totalTapes === 0 ? (
                    <p className="py-6 text-center text-[15.5px] leading-relaxed text-ink3">
                      Добавьте кассеты в панели слева —<br />
                      расчёт появится здесь сразу.
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {calc.baseLines.map((l) => (
                        <ReceiptLine
                          key={l.kind}
                          name={`${TAPE_KINDS[l.kind].title} × ${l.count}`}
                          value={formatMoney(l.sum)}
                        />
                      ))}
                      {calc.discountSum > 0 && (
                        <ReceiptLine
                          accent
                          name={`Скидка за объём (${formatMoney(calc.discount)} × ${calc.totalTapes})`}
                          value={`−${formatMoney(calc.discountSum)}`}
                        />
                      )}
                      {calc.noiseSum > 0 && (
                        <ReceiptLine
                          name={`Шумоподавление × ${calc.totalTapes}`}
                          value={formatMoney(calc.noiseSum)}
                        />
                      )}
                      {calc.editSum > 0 && (
                        <ReceiptLine
                          name={`Монтаж × ${calc.totalTapes}`}
                          value={`от ${formatMoney(calc.editSum)}`}
                        />
                      )}
                      {calc.dvdSum > 0 && (
                        <ReceiptLine
                          name={`Запись на DVD × ${calc.totalTapes}`}
                          value={formatMoney(calc.dvdSum)}
                        />
                      )}
                      {calc.urgentFee > 0 && (
                        <ReceiptLine
                          name="Срочная наценка +50% к работам"
                          value={formatMoney(calc.urgentFee)}
                        />
                      )}
                      {calc.usbSum > 0 && (
                        <ReceiptLine
                          name="Флешка 64 ГБ (новая)"
                          value={formatMoney(calc.usbSum)}
                        />
                      )}
                      {calc.minApplied && (
                        <ReceiptLine name="Минимальный заказ" value={formatMoney(PRICE.minOrder)} />
                      )}

                      <div className="my-4 border-t-2 border-dashed border-ink/25" />
                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-bold tracking-[0.12em]">ИТОГО</span>
                        <span className="text-[26px] font-bold tabular-nums sm:text-3xl">
                          {edit ? "от " : ""}
                          {formatMoney(calc.total)}
                        </span>
                      </div>
                      <p className="pt-1 text-[13.5px] leading-relaxed text-ink3">
                        Кассет: {calc.totalTapes} · примерно {hoursText} ч видео.
                        Тариф — по фактической длительности записи: точную длину
                        кассеты я проверю при осмотре. Захват идёт в реальном
                        времени, поэтому точный срок уточню с вами по телефону.
                      </p>
                    </div>
                  )}

                  <div className="my-5 border-t-2 border-dashed border-ink/25" />
                  <p className="text-[12.5px] leading-relaxed text-ink3">
                    Расчёт по действующему прайсу мастерской. Точную цену я назову после осмотра кассет — до начала работы.
                  </p>

                  {/* штрих-код для настроения */}
                  <div className="mt-5 flex items-end justify-center gap-[3px]" aria-hidden>
                    {[3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2].map(
                      (w, i) => (
                        <span
                          key={i}
                          className="inline-block bg-ink"
                          style={{ width: `${w * 2}px`, height: "34px" }}
                        />
                      ),
                    )}
                  </div>
                  <p className="mt-2 text-center text-[12px] tracking-[0.35em] text-ink3">
                    СПАСИБО, ЧТО ХРАНИТЕ ПАМЯТЬ
                  </p>
                </div>
                <ReceiptEdge />
              </div>

              {/* шпаргалка + звонок */}
              {calc.totalTapes > 0 && (
                <div className="mt-7 rounded-3xl border border-cream/15 bg-ink2 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs font-bold tracking-[0.18em] text-brandsoft uppercase">
                      Шпаргалка для звонка
                    </p>
                    <button
                      type="button"
                      onClick={() => copy(cheat)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-cream/25 px-3 py-1.5 text-sm font-bold text-cream transition hover:border-brandsoft hover:text-brandsoft"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Скопировано" : "Копировать"}
                    </button>
                  </div>
                  <p className="mt-3 font-mono text-[15px] leading-relaxed text-paper/90">
                    «{cheat}»
                  </p>
                  <CallButton className="mt-5 w-full" />
                  <p className="mt-3.5 text-center text-sm text-paper/60">
                    Позвоните мне на сотовый: я отвечаю лично. Мессенджерами не пользуюсь.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
