import { type ReactNode, useState } from "react";
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Fan,
  Film,
  HardDrive,
  Info,
  Layers,
  Monitor,
  RotateCcw,
  Smartphone,
  X,
} from "lucide-react";
import { SectionHead, CallButton, Reveal, useCopy } from "./ui";
import { Digital8Cassette, MiniDvCassette } from "./Cassette";
import { TAPE_KINDS, formatMoney, volumeDiscountPerTape } from "../lib/data";

type Screen =
  | "start"
  | "tapes-kind"
  | "tapes-count"
  | "tapes-result"
  | "windows-result"
  | "data-kind"
  | "data-result"
  | "comp-kind"
  | "comp-result"
  | "appliance-kind"
  | "appliance-result"
  | "phone-result";

type TapeChoice = "minidv" | "digital8" | "unknown";
type Band = "1-2" | "3-4" | "5-9" | "10-19" | "20+";

const BANDS: { id: Band; label: string; min: number; max: number }[] = [
  { id: "1-2", label: "1–2 кассеты", min: 1, max: 2 },
  { id: "3-4", label: "3–4 кассеты", min: 3, max: 4 },
  { id: "5-9", label: "5–9 кассет", min: 5, max: 9 },
  { id: "10-19", label: "10–19 кассет", min: 10, max: 19 },
  { id: "20+", label: "20 и больше", min: 20, max: 20 },
];

const DEPTH: Record<Screen, number> = {
  start: 1,
  "tapes-kind": 2,
  "data-kind": 2,
  "comp-kind": 2,
  "appliance-kind": 2,
  "tapes-count": 3,
  "tapes-result": 3,
  "data-result": 3,
  "comp-result": 3,
  "appliance-result": 3,
  "windows-result": 3,
  "phone-result": 3,
};

function OptionButton({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-16 w-full items-center gap-4 rounded-2xl border-2 border-ink/15 bg-paper px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-brand hover:bg-cream hover:shadow-[0_6px_0_0_rgba(34,27,18,0.12)] ${className}`}
    >
      {children}
    </button>
  );
}

function OptionText({ title, sub }: { title: string; sub?: string }) {
  return (
    <span className="min-w-0 flex-1">
      <span className="block text-lg leading-snug font-extrabold">{title}</span>
      {sub && <span className="mt-0.5 block text-[15px] leading-snug text-ink3">{sub}</span>}
    </span>
  );
}

type Verdict = "yes" | "maybe" | "no";

const VERDICT_UI: Record<
  Verdict,
  { label: string; bg: string; ring: string; Icon: typeof Check }
> = {
  yes: { label: "Могу помочь", bg: "bg-sage/15", ring: "bg-sage text-cream", Icon: Check },
  maybe: { label: "Возможность уточню после осмотра", bg: "bg-brand/15", ring: "bg-brand text-ink", Icon: Info },
  no: { label: "За такую работу не берусь", bg: "bg-rec/10", ring: "bg-rec text-cream", Icon: X },
};

function ResultView({
  verdict,
  title,
  price,
  note,
  cheat,
  calcLink = false,
  showCall = true,
  onReset,
}: {
  verdict: Verdict;
  title: string;
  price?: string;
  note: string;
  cheat?: string;
  calcLink?: boolean;
  showCall?: boolean;
  onReset: () => void;
}) {
  const [copied, copy] = useCopy();
  const v = VERDICT_UI[verdict];
  const VIcon = v.Icon;
  return (
    <div>
      <div className={`flex items-center gap-3.5 rounded-2xl ${v.bg} px-5 py-4`}>
        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${v.ring}`}>
          <VIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.16em] uppercase opacity-70">
            {v.label}
          </p>
          <p className="text-xl leading-snug font-extrabold">{title}</p>
        </div>
      </div>

      {price && (
        <p className="mt-5 rounded-2xl border-2 border-dashed border-ink/25 bg-paper px-5 py-4 text-[17px] leading-relaxed">
          <span className="font-mono text-xs font-bold tracking-[0.16em] text-branddark uppercase">
            Ориентир по цене
          </span>
          <span className="mt-1 block font-semibold">{price}</span>
        </p>
      )}

      <p className="mt-5 text-[17px] leading-relaxed text-ink2">{note}</p>

      {cheat && (
        <div className="mt-6 rounded-2xl bg-ink px-5 py-5 text-cream">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs font-bold tracking-[0.18em] text-brandsoft uppercase">
              Что сказать по телефону
            </p>
            <button
              type="button"
              onClick={() => copy(cheat)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cream/25 px-3 py-1.5 text-sm font-bold transition hover:border-brandsoft hover:text-brandsoft"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
          <p className="mt-3 font-mono text-[15.5px] leading-relaxed">«{cheat}»</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3.5">
        {showCall && <CallButton />}
        {calcLink && (
          <a
            href="#calculator"
            className="inline-flex min-h-14 items-center gap-2 rounded-2xl border-2 border-ink px-6 py-3.5 text-lg font-bold transition hover:bg-ink hover:text-cream"
          >
            Посчитать точнее
            <ArrowRight className="h-5 w-5" />
          </a>
        )}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 py-2.5 font-bold text-ink3 underline decoration-2 underline-offset-4 transition hover:text-ink"
        >
          <RotateCcw className="h-4.5 w-4.5" />
          Начать заново
        </button>
      </div>
    </div>
  );
}

export default function Wizard() {
  const [screen, setScreen] = useState<Screen>("start");
  const [history, setHistory] = useState<Screen[]>([]);
  const [kind, setKind] = useState<TapeChoice>("unknown");
  const [band, setBand] = useState<Band>("1-2");
  const [sub, setSub] = useState("");

  const go = (s: Screen) => {
    setHistory((h) => [...h, screen]);
    setScreen(s);
  };
  const back = () => {
    setHistory((h) => {
      const prev = h[h.length - 1];
      if (prev) setScreen(prev);
      return h.slice(0, -1);
    });
  };
  const reset = () => {
    setScreen("start");
    setHistory([]);
  };

  const depth = DEPTH[screen];
  const isResult = screen.endsWith("result");

  /* ---- результат по кассетам ---- */
  const tapesResult = () => {
    const b = BANDS.find((x) => x.id === band)!;
    const baseMin =
      kind === "minidv"
        ? TAPE_KINDS.minidvShort.price
        : kind === "digital8"
          ? TAPE_KINDS.digital8Short.price
          : TAPE_KINDS.minidvShort.price;
    const disc = volumeDiscountPerTape(b.min);
    const from = b.min * (baseMin - disc);
    const kindName =
      kind === "minidv" ? "MiniDV" : kind === "digital8" ? "8 мм (формат записи нужно уточнить)" : "видеокассеты";
    const price =
      kind === "unknown"
        ? `Одна кассета — от ${formatMoney(600)} (MiniDV) или от ${formatMoney(700)} (Digital8). За объём есть скидка: от 5 кассет — минус ${formatMoney(100)} с каждой, от 10 — минус ${formatMoney(150)}, от 20 — минус ${formatMoney(200)}.`
        : `За ${b.label.toLowerCase()} — примерно от ${formatMoney(from)}, если записи не очень длинные${
            disc > 0 ? ` (скидка за объём ${formatMoney(disc)} с кассеты уже учтена)` : ""
          }. Точную цифру посчитает калькулятор ниже.`;
    const cheat =
      kind === "unknown"
        ? "Здравствуйте! У меня лежат старые видеокассеты, точно не знаю, какого они формата. Хочу перевести их в цифру. Можно подойти и показать вам?"
        : `Здравствуйте! У меня есть кассеты ${kindName}, примерно ${b.label.toLowerCase()}. Хочу оцифровать. Скажите, когда можно подойти?`;
    return (
      <ResultView
        verdict="yes"
        title="Оцифровываю записи MiniDV и Digital8"
        price={price}
        note="Цены выше относятся к записям MiniDV и Digital8. Я считываю их в реальном времени: час записи занимает час захвата. Оригиналы верну вместе с файлами. Для кассет 8 мм сначала уточню формат записи и возможность считывания — маркировка Hi8 или Video8 сама по себе не означает Digital8. Перед визитом позвоните мне."
        cheat={cheat}
        calcLink
        onReset={reset}
      />
    );
  };

  /* ---- результат по данным ---- */
  const dataResult = () => {
    if (sub === "clicks") {
      return (
        <ResultView
          verdict="no"
          title="Похоже на механическую поломку диска"
          note="Щелчки и стук могут указывать на механическую неисправность. Я не вскрываю гермоблок диска: для этого нужна специализированная лаборатория. Не включайте диск повторно — это может усугубить повреждения. Если не уверены, какие звуки слышите, позвоните мне и опишите их."
          onReset={reset}
        />
      );
    }
    const cheatBySub: Record<string, string> = {
      visible:
        "Здравствуйте! У меня диск (флешка) открывается, но файлы не читаются. Там важные фотографии и документы. Можно принести вам на диагностику?",
      deleted:
        "Здравствуйте! Случайно удалили важные файлы с диска. Можно принести его вам — посмотреть, удастся ли восстановить?",
      notdetected:
        "Здравствуйте! Компьютер перестал видеть диск (флешку), а там важные файлы. Можно принести вам на диагностику?",
    };
    return (
      <ResultView
        verdict="maybe"
        title="Проверю, можно ли восстановить файлы"
        price={`Диагностика носителя — ${formatMoney(500)}. Если файлы удастся извлечь, работа — от ${formatMoney(2000)} до ${formatMoney(5000)}.`}
        note="Я восстанавливаю данные при программных и логических сбоях: удалённых файлах, повреждённых разделах, ошибках чтения. Результат зависит от состояния носителя, заранее обещать восстановление не могу. Пока ничего не записывайте на этот носитель."
        cheat={cheatBySub[sub] ?? cheatBySub.visible}
        onReset={reset}
      />
    );
  };

  /* ---- результат по компьютерам ---- */
  const compResult = () => {
    const map: Record<
      string,
      { title: string; price: string; note: string; cheat: string }
    > = {
      nopower: {
        title: "Приносите — проверю причину",
        price: `Диагностика — ${formatMoney(500)}. Если согласитесь на ремонт, диагностика бесплатна.`,
        note: "После диагностики я объясню причину поломки и назову стоимость. Вы решите, нужен ли ремонт. Если он нецелесообразен, скажу об этом прямо.",
        cheat:
          "Здравствуйте! У меня компьютер не включается. Можно принести вам на диагностику? Когда вам удобно?",
      },
      slow: {
        title: "Обычно лечится чисткой и настройкой",
        price: `Чистка от пыли и замена термопасты: системный блок — от ${formatMoney(1200)}, ноутбук — от ${formatMoney(1800)}. Работа по апгрейду — от ${formatMoney(800)}.`,
        note: "Я проверю охлаждение и другие возможные причины шума, перегрева и медленной работы. Диагностика стоит 500 ₽ и бесплатна при согласии на ремонт.",
        cheat:
          "Здравствуйте! Компьютер стал сильно шуметь и тормозить. Похоже, нужна чистка. Можно принести его вам?",
      },
      virus: {
        title: "Удалю вирусы и настрою защиту",
        price: `Удаление вирусов и настройка — от ${formatMoney(1200)}.`,
        note: "Я удалю нежелательные программы и настрою защиту. Перед работой обсужу сохранение ваших файлов и предупрежу о рисках, если их обнаружу.",
        cheat:
          "Здравствуйте! На компьютере вирусы: всплывает реклама и всё тормозит. Можно принести вам на чистку?",
      },
      windows: {
        title: "Установлю систему и программы",
        price: `Установка Windows, драйверов и базовых программ — от ${formatMoney(1500)}. Перенос данных со старого диска — ${formatMoney(1000)}.`,
        note: "Я установлю подходящие драйверы и согласованные программы. Перед работой уточню версии, лицензии и файлы, которые нужно сохранить.",
        cheat:
          "Здравствуйте! Нужно переустановить Windows и настроить компьютер. Можно договориться о времени?",
      },
      buy: {
        title: "Подберу конфигурацию или проверю б/у ПК",
        price: `Проверка б/у компьютера перед покупкой — ${formatMoney(1000)}. Подбор конфигурации — ${formatMoney(1500)} (при заказе сборки входит в её стоимость). Сборка из ваших деталей — ${formatMoney(3500)}, игрового — ${formatMoney(4500)}; с подбором комплектующих — ${formatMoney(5000)} и ${formatMoney(6000)}.`,
        note: "Я уточню задачи и бюджет, подберу комплектующие и объясню выбор. Если рассматриваете б/у компьютер, могу проверить его перед покупкой.",
        cheat:
          "Здравствуйте! Хочу собрать компьютер (проверить б/у перед покупкой). Можно обсудить с вами конфигурацию и бюджет?",
      },
    };
    const r = map[sub] ?? map.slow;
    return (
      <ResultView
        verdict="yes"
        title={r.title}
        price={r.price}
        note={r.note}
        cheat={r.cheat}
        onReset={reset}
      />
    );
  };

  /* ---- результат по технике ---- */
  const applianceResult = () => {
    const map: Record<string, { title: string; price: string; note: string; cheat: string }> = {
      radio: {
        title: "Проверю неисправность магнитолы",
        price: `Диагностика — ${formatMoney(300)}, ремонт — от ${formatMoney(1000)}.`,
        note: "Я ремонтирую магнитолы, музыкальные центры и активную акустику. Сначала осмотрю технику, объясню возможность ремонта и согласую стоимость.",
        cheat:
          "Здравствуйте! У меня магнитола перестала работать как следует. Можно принести её вам на диагностику?",
      },
      audio: {
        title: "Ремонтирую усилители и акустику",
        price: `Диагностика усилителя — ${formatMoney(300)}, ремонт — от ${formatMoney(1500)}. Активная акустика — от ${formatMoney(1200)}.`,
        note: "Я ремонтирую автомобильные и домашние усилители, музыкальные центры и активную акустику. После диагностики назову точную цену до начала ремонта.",
        cheat:
          "Здравствуйте! У меня усилитель (музыкальный центр) перестал работать как следует. Можно принести его вам на диагностику?",
      },
      vacuum: {
        title: "Проверю, что с роботом-пылесосом",
        price: `Диагностика и ремонт — от ${formatMoney(1000)}.`,
        note: "Я осмотрю робот-пылесос и оценю, есть ли смысл в ремонте. Сначала позвоните мне, назовите модель и опишите неисправность: уточню, могу ли принять прибор.",
        cheat:
          "Здравствуйте! У меня робот-пылесос перестал работать. Можно узнать, возьмётесь ли вы за такой ремонт?",
      },
      humidifier: {
        title: "Оценю возможность ремонта увлажнителя",
        price: `Диагностика и ремонт — от ${formatMoney(1000)}.`,
        note: "Я осмотрю увлажнитель и назову стоимость до начала работы. Если ремонт нецелесообразен или нужных деталей нет, объясню это вам.",
        cheat:
          "Здравствуйте! У меня сломался увлажнитель. Можно принести его вам посмотреть?",
      },
    };
    const r = map[sub] ?? map.audio;
    return (
      <ResultView
        verdict="yes"
        title={r.title}
        price={r.price}
        note={r.note}
        cheat={r.cheat}
        onReset={reset}
      />
    );
  };

  return (
    <section id="wizard" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead
          chapter="01"
          kicker="Определитель задачи"
          title="С чем вы пришли?"
          lead={
            <p>
              Выберите задачу: здесь я собрал услуги, ориентиры по цене и подсказки для звонка. Возможность работы с вашей техникой и точную стоимость уточню после осмотра.
            </p>
          }
          hand="не стесняйтесь, тут все свои ↓"
        />

        <Reveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-[28px] border-2 border-ink bg-cream shadow-[10px_10px_0_0_rgba(34,27,18,0.9)]">
            {/* шапка помощника */}
            <div className="flex items-center justify-between gap-4 border-b-2 border-ink/10 bg-paper px-5 py-4 sm:px-8">
              <p className="font-mono text-[13px] font-bold tracking-[0.18em] uppercase">
                {isResult ? "Ответ готов" : `Шаг ${depth} из 3`}
              </p>
              <div className="flex items-center gap-2" aria-hidden>
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-10 rounded-full transition-colors ${
                      i <= depth ? "bg-brand" : "bg-ink/15"
                    }`}
                  />
                ))}
              </div>
              {history.length > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-bold text-ink3 transition hover:bg-ink/5 hover:text-ink"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                  Назад
                </button>
              ) : (
                <span className="w-[84px]" aria-hidden />
              )}
            </div>

            <div className="px-5 py-7 sm:px-8 sm:py-9">
              {screen === "start" && (
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    Что случилось?
                  </h3>
                  <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                    <OptionButton onClick={() => go("tapes-kind")}>
                      <Film className="h-7 w-7 shrink-0 text-branddark" />
                      <OptionText
                        title="Дома лежат видеокассеты"
                        sub="MiniDV или Digital8 — хочу сохранить в цифре"
                      />
                      <ChevronRight className="h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </OptionButton>
                    <OptionButton onClick={() => go("windows-result")}>
                      <AppWindow className="h-7 w-7 shrink-0 text-branddark" />
                      <OptionText
                        title="Нужно установить Windows и программы"
                        sub="система, драйверы, антивирус, Office — под ключ"
                      />
                      <ChevronRight className="h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </OptionButton>
                    <OptionButton onClick={() => go("comp-kind")}>
                      <Monitor className="h-7 w-7 shrink-0 text-branddark" />
                      <OptionText
                        title="Компьютер или ноутбук барахлит"
                        sub="не включается, тормозит, шумит — или нужен новый"
                      />
                      <ChevronRight className="h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </OptionButton>
                    <OptionButton onClick={() => go("data-kind")}>
                      <HardDrive className="h-7 w-7 shrink-0 text-branddark" />
                      <OptionText
                        title="Пропали важные файлы"
                        sub="диск, флешка или старый компьютер не открываются"
                      />
                      <ChevronRight className="h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </OptionButton>
                    <OptionButton onClick={() => go("appliance-kind")}>
                      <Fan className="h-7 w-7 shrink-0 text-branddark" />
                      <OptionText
                        title="Магнитола, пылесос или музыкальный центр"
                        sub="бытовая техника и аудио перестали работать"
                      />
                      <ChevronRight className="h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </OptionButton>
                    <OptionButton onClick={() => go("phone-result")}>
                      <Smartphone className="h-7 w-7 shrink-0 text-ink3" />
                      <OptionText
                        title="Сломался телефон или планшет"
                        sub="я не ремонтирую телефоны и планшеты"
                      />
                      <ChevronRight className="h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </OptionButton>
                  </div>
                </div>
              )}

              {screen === "tapes-kind" && (
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    Какая у вас кассета?
                  </h3>
                  <p className="mt-2 text-[16px] text-ink3">
                    Посмотрите на размер и надписи. Для кассет 8 мм формат записи нужно уточнить отдельно.
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => {
                        setKind("minidv");
                        go("tapes-count");
                      }}
                      className="group rounded-2xl border-2 border-ink/15 bg-ink p-5 text-left text-cream transition hover:-translate-y-1 hover:border-brand"
                    >
                      <MiniDvCassette className="mx-auto h-auto w-full max-w-[150px] pt-3" />
                      <p className="mt-4 text-lg font-extrabold">Маленькая — MiniDV</p>
                      <p className="mt-1 text-[15px] leading-snug text-paper/75">
                        Помещается в ладонь: 6,6 × 4,8 см. Из видеокамеры. Написано
                        MiniDV, DVM60 или DVM80.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKind("digital8");
                        go("tapes-count");
                      }}
                      className="group rounded-2xl border-2 border-ink/15 bg-ink p-5 text-left text-cream transition hover:-translate-y-1 hover:border-brand"
                    >
                      <div className="cassette-paused">
                        <Digital8Cassette className="mx-auto h-auto w-full max-w-[230px]" />
                      </div>
                      <p className="mt-4 text-lg font-extrabold">
                        Кассета 8 мм — формат нужно уточнить
                      </p>
                      <p className="mt-1 text-[15px] leading-snug text-paper/75">
                        Размер около 9,5 × 6,3 см. Надписи Hi8, Video8 или 8 mm не означают, что запись цифровая. Я уточню формат и возможность считывания.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKind("unknown");
                        go("tapes-result");
                      }}
                      className="group flex flex-col rounded-2xl border-2 border-dashed border-ink/30 bg-paper p-5 text-left transition hover:-translate-y-1 hover:border-brand"
                    >
                      <Layers className="h-10 w-10 text-branddark" />
                      <p className="mt-4 text-lg font-extrabold">
                        Не знаю / есть разные
                      </p>
                      <p className="mt-1 text-[15px] leading-snug text-ink3">
                        Ничего страшного: просто принесите одну кассету показать —
                        или опишите её размер по телефону.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {screen === "tapes-count" && (
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    Сколько примерно кассет?
                  </h3>
                  <p className="mt-2 text-[16px] text-ink3">
                    От количества зависит скидка: чем больше архив, тем дешевле
                    каждая кассета.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {BANDS.map((b) => {
                      const d = volumeDiscountPerTape(b.min);
                      return (
                        <OptionButton
                          key={b.id}
                          onClick={() => {
                            setBand(b.id);
                            go("tapes-result");
                          }}
                        >
                          <OptionText
                            title={b.label}
                            sub={
                              d > 0
                                ? `скидка ${formatMoney(d)} с каждой кассеты`
                                : "скидка — от 5 кассет"
                            }
                          />
                          <ChevronRight className="h-5 w-5 shrink-0 opacity-40" />
                        </OptionButton>
                      );
                    })}
                  </div>
                </div>
              )}

              {screen === "data-kind" && (
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    Что именно произошло с носителем?
                  </h3>
                  <div className="mt-6 grid gap-3.5">
                    {[
                      { id: "visible", t: "Диск или флешка видны, но файлы не открываются", s: "папки пустые, фото «битые», просит отформатировать" },
                      { id: "deleted", t: "Файлы случайно удалили или отформатировали носитель", s: "важно: после этого лучше ничего не записывать сверху" },
                      { id: "notdetected", t: "Компьютер носитель не видит совсем", s: "подключаю — и тишина" },
                      { id: "clicks", t: "Жёсткий диск щёлкает, стучит или пищит", s: "посторонние звуки при включении" },
                    ].map((o) => (
                      <OptionButton
                        key={o.id}
                        onClick={() => {
                          setSub(o.id);
                          go("data-result");
                        }}
                      >
                        <OptionText title={o.t} sub={o.s} />
                        <ChevronRight className="h-5 w-5 shrink-0 opacity-40" />
                      </OptionButton>
                    ))}
                  </div>
                </div>
              )}

              {screen === "comp-kind" && (
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    Что с компьютером?
                  </h3>
                  <div className="mt-6 grid gap-3.5">
                    {[
                      { id: "nopower", t: "Не включается или выключается сам", s: "нужна диагностика и честный ответ: чинить или нет" },
                      { id: "slow", t: "Тормозит, шумит, греется", s: "похоже на пыль, термопасту или уставшие детали" },
                      { id: "virus", t: "Вирусы, баннеры, всплывающая реклама", s: "компьютером стало невозможно пользоваться" },
                      { id: "windows", t: "Нужна установка Windows и программ", s: "с нуля или после поломки — с настройкой под себя" },
                      { id: "buy", t: "Хочу собрать новый или проверить б/у перед покупкой", s: "подобрать конфигурацию под бюджет без переплат" },
                    ].map((o) => (
                      <OptionButton
                        key={o.id}
                        onClick={() => {
                          setSub(o.id);
                          go("comp-result");
                        }}
                      >
                        <OptionText title={o.t} sub={o.s} />
                        <ChevronRight className="h-5 w-5 shrink-0 opacity-40" />
                      </OptionButton>
                    ))}
                  </div>
                </div>
              )}

              {screen === "appliance-kind" && (
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    Что за техника?
                  </h3>
                  <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                    {[
                      { id: "radio", t: "Магнитола", s: "автомобильная или домашняя" },
                      { id: "audio", t: "Усилитель, музыкальный центр, активная акустика", s: "звук пропал, хрипит или не включается" },
                      { id: "vacuum", t: "Робот-пылесос", s: "не едет, не сосёт, не заряжается" },
                      { id: "humidifier", t: "Увлажнитель", s: "не включается или не даёт пар" },
                    ].map((o) => (
                      <OptionButton
                        key={o.id}
                        onClick={() => {
                          setSub(o.id);
                          go("appliance-result");
                        }}
                      >
                        <OptionText title={o.t} sub={o.s} />
                        <ChevronRight className="h-5 w-5 shrink-0 opacity-40" />
                      </OptionButton>
                    ))}
                  </div>
                </div>
              )}

              {screen === "tapes-result" && tapesResult()}
              {screen === "data-result" && dataResult()}
              {screen === "comp-result" && compResult()}
              {screen === "appliance-result" && applianceResult()}
              {screen === "windows-result" && (
                <ResultView
                  verdict="yes"
                  title="Установлю систему и настрою под вас"
                  price={`Windows, драйверы и базовые программы — от ${formatMoney(1500)}. Удаление вирусов и настройка — от ${formatMoney(1200)}. Перенос данных со старого диска — ${formatMoney(1000)}.`}
                  note="Я установлю Windows, подходящие драйверы и согласованный набор программ. По телефону обсудим, что нужно для вашей работы; я подскажу по версиям и лицензиям."
                  cheat="Здравствуйте! Нужно установить Windows, драйверы и программы. Можно договориться о времени и узнать цену?"
                  onReset={reset}
                />
              )}
              {screen === "phone-result" && (
                <ResultView
                  verdict="no"
                  title="Смартфоны и планшеты я не ремонтирую"
                  note="С телефоном или планшетом лучше обратиться в специализированный сервис. Я занимаюсь компьютерами, аудиотехникой и указанными на сайте бытовыми приборами. Если фотографии остались на старом компьютере или диске, могу проверить возможность их переноса или восстановления."
                  showCall={false}
                  onReset={reset}
                />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
