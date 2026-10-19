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
  yes: { label: "Поможем", bg: "bg-sage/15", ring: "bg-sage text-cream", Icon: Check },
  maybe: { label: "Скорее всего, поможем", bg: "bg-brand/15", ring: "bg-brand text-ink", Icon: Info },
  no: { label: "Это не к нам — и это честно", bg: "bg-rec/10", ring: "bg-rec text-cream", Icon: X },
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
      kind === "minidv" ? "MiniDV" : kind === "digital8" ? "Digital8" : "видеокассеты";
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
        title="Это как раз главная работа мастерской"
        price={price}
        note="Кассета захватывается в реальном времени — час записи пишется час, поэтому большой архив делается не за один день. Оригиналы кассет вы всегда получаете обратно. Перед визитом позвоните: мастер работает один, договоритесь об удобном времени."
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
          note="Щелчки и стук означают, что беда внутри гермоблока. Такие диски вскрывают только в специальной чистой комнате — мастерская этим не занимается и притворяться не будет. Главный совет: больше не включайте диск, каждая попытка может окончательно повредить поверхность с данными. Для такого случая нужна лаборатория восстановления данных в большом городе. Если сомневаетесь в звуках — позвоните, по описанию мастер подскажет."
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
        title="Очень похоже на случай, с которым к нам и идут"
        price={`Диагностика носителя — ${formatMoney(500)}. Если файлы удастся извлечь, работа — от ${formatMoney(2000)} до ${formatMoney(5000)}.`}
        note="Мастерская спасает данные при программных и логических сбоях: удалённые файлы, повреждённые разделы, «умершие» флешки. Честно предупреждаем: результат зависит от состояния носителя — гарантировать его заранее нельзя. И важный совет: по возможности ничего больше не записывайте на этот носитель."
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
        title: "Приносите — разберёмся в причине",
        price: `Диагностика — ${formatMoney(500)}. Если согласитесь на ремонт, диагностика бесплатна.`,
        note: "Мастер сначала назовёт причину поломки и стоимость ремонта — и только потом вы решите, чинить или нет. Если чинить невыгодно, так прямо и скажет.",
        cheat:
          "Здравствуйте! У меня компьютер не включается. Можно принести вам на диагностику? Когда вам удобно?",
      },
      slow: {
        title: "Обычно лечится чисткой и настройкой",
        price: `Чистка от пыли и замена термопасты: системный блок — от ${formatMoney(1200)}, ноутбук — от ${formatMoney(1800)}. Работа по апгрейду — от ${formatMoney(800)}.`,
        note: "Шум и перегрев чаще всего означают пыль и высохшую термопасту. Если дело окажется в чём-то другом, диагностика стоит 500 ₽ и бесплатна при согласии на ремонт.",
        cheat:
          "Здравствуйте! Компьютер стал сильно шуметь и тормозить. Похоже, нужна чистка. Можно принести его вам?",
      },
      virus: {
        title: "Вычистим и настроим защиту",
        price: `Удаление вирусов и настройка — от ${formatMoney(1200)}.`,
        note: "Всплывающие баннеры и «левые» программы убираются, система приводится в порядок. Ваши файлы при этом стараемся сохранить — если что-то будет под угрозой, мастер предупредит заранее.",
        cheat:
          "Здравствуйте! На компьютере вирусы: всплывает реклама и всё тормозит. Можно принести вам на чистку?",
      },
      windows: {
        title: "Поставим систему и всё настроим",
        price: `Установка Windows, драйверов и базовых программ — от ${formatMoney(1500)}. Перенос данных со старого диска — ${formatMoney(1000)}.`,
        note: "После установки компьютером можно пользоваться сразу: драйверы, браузер, офисные программы — всё на месте. Скажите по телефону, какие программы нужны именно вам.",
        cheat:
          "Здравствуйте! Нужно переустановить Windows и настроить компьютер. Можно договориться о времени?",
      },
      buy: {
        title: "Поможем не переплатить и не купить «кота в мешке»",
        price: `Проверка б/у компьютера перед покупкой — ${formatMoney(1000)}. Подбор конфигурации — ${formatMoney(1500)} (при заказе сборки входит в её стоимость). Сборка из ваших деталей — ${formatMoney(3500)}, игрового — ${formatMoney(4500)}; с подбором комплектующих — ${formatMoney(5000)} и ${formatMoney(6000)}.`,
        note: "Мастер много лет сам собирал и продавал компьютеры в Тобольске, поэтому в конфигурациях разбирается досконально: соберёт ровно под вашу задачу и бюджет, без магазинных накруток.",
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
        title: "Магнитолу посмотрим — это по нашей части",
        price: `Диагностика — ${formatMoney(300)}, ремонт — от ${formatMoney(1000)}.`,
        note: "Магнитолы, музыкальные центры и активная акустика — та самая «хай-файная» стихия мастера. Сначала осмотр и честный вердикт: ремонт имеет смысл или дешевле заменить. Точная цена — до начала работы.",
        cheat:
          "Здравствуйте! У меня магнитола перестала работать как следует. Можно принести её вам на диагностику?",
      },
      audio: {
        title: "Усилитель и акустику здесь любят и умеют",
        price: `Диагностика усилителя — ${formatMoney(300)}, ремонт — от ${formatMoney(1500)}. Активная акустика — от ${formatMoney(1200)}.`,
        note: "Автомобильные усилители, музыкальные центры, домашние усилители и колонки, которые жалко выбрасывать, здесь получают вторую жизнь. После диагностики мастер назовёт точную цену до начала ремонта.",
        cheat:
          "Здравствуйте! У меня усилитель (музыкальный центр) перестал работать как следует. Можно принести его вам на диагностику?",
      },
      vacuum: {
        title: "Робот-пылесос — смотрим, что с ним",
        price: `Диагностика и ремонт — от ${formatMoney(1000)}.`,
        note: "Не всё современное можно починить: часть приборов сделана одноразовой. Мастер посмотрит и честно скажет, есть ли смысл в ремонте. Сначала позвоните и опишите симптом — сэкономите поездку, если случай безнадёжный.",
        cheat:
          "Здравствуйте! У меня робот-пылесос перестал работать. Можно узнать, возьмётесь ли вы за такой ремонт?",
      },
      humidifier: {
        title: "Увлажнитель — если ремонтопригоден, починим",
        price: `Диагностика и ремонт — от ${formatMoney(1000)}.`,
        note: "Увлажнители и мелкая бытовая техника: сначала осмотр, потом цена. Если прибор одноразовый и ремонт не имеет смысла, мастер скажет прямо — без счёта за «попытку».",
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
              Ответьте на один-два вопроса. Подскажем, поможет ли мастерская именно
              в вашем случае, сколько это примерно стоит и что сказать мастеру по
              телефону. Звонить будет уже не страшно.
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
                        sub="сразу проверим, наш ли это случай"
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
                    Посмотрите на размер и надписи — это самый простой способ отличить.
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
                        Как аудиокассета — Digital8
                      </p>
                      <p className="mt-1 text-[15px] leading-snug text-paper/75">
                        Размером с аудиокассету: 9,5 × 6,3 см, но пишет видео.
                        На корпусе — Digital8, Hi8, Video8, 8 mm.
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
                  title="Поставим систему и настроим под вас"
                  price={`Windows, драйверы и базовые программы — от ${formatMoney(1500)}. Удаление вирусов и настройка — от ${formatMoney(1200)}. Перенос данных со старого диска — ${formatMoney(1000)}.`}
                  note="Чистая установка без «сборок» с сюрпризами: система, драйверы на всё железо, браузер, антивирус и офисные программы. После установки компьютером можно пользоваться сразу. Скажите по телефону, какие программы нужны именно вам, — мастер подскажет по лицензиям и версиям."
                  cheat="Здравствуйте! Нужно установить Windows, драйверы и программы. Можно договориться о времени и узнать цену?"
                  onReset={reset}
                />
              )}
              {screen === "phone-result" && (
                <ResultView
                  verdict="no"
                  title="Смартфоны и планшеты мы не ремонтируем"
                  note="Это сознательная и честная позиция мастерской: лучше сразу обратиться в сервис, который специализируется именно на телефонах, чем мы возьмёмся не за своё дело. Но если на старом компьютере или диске остались фотографии с этого телефона — вот тут «Хай-Фай» как раз поможет. И с кассетами, конечно, тоже."
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
