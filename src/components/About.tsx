import {
  Heart,
  Lightbulb,
  MessageCircle,
  Users,
  Wallet,
} from "lucide-react";
import { SectionHead, Reveal } from "./ui";

const PASSPORT: [string, string][] = [
  ["Наименование", "Моя мастерская «Хай-Фай»"],
  ["Специализация", "MiniDV и Digital8, компьютеры, данные, аудиотехника"],
  ["Приём", "сам принимаю технику по звонку"],
  ["Стоимость", "согласую до начала работы"],
  ["Работаю один", "сам ремонтирую и отвечаю на вопросы"],
  ["Связь", "принимаю звонки, без мессенджеров"],
  ["Выезд", "работаю только в мастерской"],
  ["Оригиналы кассет", "возвращаю вместе с готовыми файлами"],
];

const PRINCIPLES = [
  {
    Icon: MessageCircle,
    title: "Объясню, что случилось",
    text: "После осмотра расскажу понятными словами, в чём неисправность и какие работы нужны. Если что-то осталось неясным, спросите — поясню подробнее.",
  },
  {
    Icon: Wallet,
    title: "Согласую стоимость",
    text: "Назову цену до начала работы. Если при ремонте понадобится что-то дополнительное, сначала обсужу это с вами, а не добавлю в счёт без согласования.",
  },
  {
    Icon: Lightbulb,
    title: "Оценю возможности",
    text: "Сначала разберусь в задаче и состоянии техники. Если ремонт нецелесообразен или случай не по моему профилю, скажу об этом прямо.",
  },
  {
    Icon: Users,
    title: "Отвечу лично",
    text: "Вы обсуждаете работу со мной: я принимаю технику и сам ею занимаюсь. По телефону можно уточнить условия приёма, стоимость и готовность заказа.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead
          chapter="06"
          kicker="Мастерская"
          title={
            <>
              Моя мастерская.
              <span className="block">Мои принципы работы.</span>
            </>
          }
          lead={
            <>
              <p>
                Я работаю в «Хай-Фай» один: сам принимаю технику и кассеты,
                выполняю работу и отвечаю на звонки. Перед визитом позвоните
                мне — обсудим задачу и договоримся о времени приёма.
              </p>
              <p className="mt-4">
                Для меня важно, чтобы до начала работы вы понимали, что я
                предлагаю сделать и сколько это будет стоить. После осмотра
                объясню варианты, назову ограничения и согласую с вами
                дальнейшие действия.
              </p>
            </>
          }
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-5">
          {/* Паспорт мастерской */}
          <Reveal className="lg:col-span-2">
            <div className="relative h-full rounded-[6px] border-2 border-ink bg-cream p-6 shadow-[8px_8px_0_0_rgba(34,27,18,0.9)] sm:p-7">
              <div className="pointer-events-none absolute inset-2 rounded-[3px] border border-ink/25" aria-hidden />
              <div className="relative">
                <p className="text-center font-mono text-xs font-bold tracking-[0.3em] text-ink3 uppercase">
                  Технический паспорт
                </p>
                <p className="font-display mt-2 text-center text-xl font-bold">
                  МАСТЕРСКАЯ «ХАЙ-ФАЙ»
                </p>
                <dl className="mt-6 space-y-0 divide-y divide-ink/10">
                  {PASSPORT.map(([k, v]) => (
                    <div key={k} className="flex gap-4 py-2.5">
                      <dt className="w-[42%] shrink-0 font-mono text-[12.5px] leading-snug font-bold tracking-wide text-ink3 uppercase">
                        {k}
                      </dt>
                      <dd className="text-[15.5px] leading-snug font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <p className="font-hand -rotate-2 text-[1.45rem] leading-tight text-[#33415e]">
                    сначала обсудим,
                    <br />
                    потом начну работу
                  </p>
                  <div
                    aria-hidden
                    className="flex h-24 w-24 shrink-0 rotate-[-10deg] flex-col items-center justify-center rounded-full border-[3px] border-branddark/70 text-center text-branddark/80"
                  >
                    <span className="font-mono text-[9px] font-bold tracking-[0.18em]">
                      ТОБОЛЬСК
                    </span>
                    <span className="font-display text-lg leading-none font-black">
                      ЛИЧНО
                    </span>
                    <span className="font-mono text-[9px] font-bold tracking-[0.14em]">
                      НА СВЯЗИ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Принципы работы */}
          <div className="lg:col-span-3">
            <Reveal delay={80}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-display text-3xl font-black">Как я работаю</span>
                <p className="text-[15.5px] font-semibold text-ink3">Обсуждаю задачу с вами напрямую</p>
              </div>
              <p className="mt-5 leading-relaxed text-ink3">
                По телефону я уточню, какая у вас техника и что произошло.
                После осмотра смогу предложить работу и назвать стоимость.
                Решение о ремонте остаётся за вами.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {PRINCIPLES.map((c, i) => (
                <Reveal key={c.title} delay={i * 80}>
                  <div className="h-full rounded-3xl border-2 border-ink/10 bg-cream p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20">
                      <c.Icon className="h-6 w-6 text-branddark" />
                    </span>
                    <h4 className="mt-4 text-lg font-extrabold">{c.title}</h4>
                    <p className="mt-2 leading-relaxed text-ink3">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={140}>
              <div className="mt-5 flex gap-4 rounded-3xl bg-ink p-6 text-cream sm:p-7">
                <Heart className="h-8 w-8 shrink-0 text-rec" fill="currentColor" strokeWidth={0} />
                <div>
                  <h4 className="font-display text-base font-bold sm:text-lg">
                    Семейные записи — с учётом состояния кассеты
                  </h4>
                  <p className="mt-2 leading-relaxed text-paper/88">
                    Перед оцифровкой я осмотрю кассету и объясню, что можно
                    сделать. Если лента повреждена, заранее предупрежу о
                    возможной потере фрагментов: уже утраченную запись
                    восстановить нельзя. Оригинал верну вместе с файлами.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Как проходит визит — киноплёнка шагов                              */
/* ------------------------------------------------------------------ */

const VISIT_STEPS = [
  {
    tc: "00:01",
    title: "Позвоните мне",
    text: "Позвоните мне и договоритесь о времени. Я работаю один, поэтому принимаю по предварительному звонку.",
  },
  {
    tc: "00:02",
    title: "Приезжайте",
    text: "8-й микрорайон, дом 16, 1 этаж, вход со двора. Не перепутайте с «Фото-плюс» — это другая организация в том же доме.",
  },
  {
    tc: "00:03",
    title: "Осмотр и цена",
    text: "Я осмотрю технику или кассеты, объясню, что можно сделать, и согласую с вами стоимость до начала работы.",
  },
  {
    tc: "00:04",
    title: "Работа",
    text: "Я выполняю согласованную работу. Кассеты считываю в реальном времени; срок ремонта зависит от неисправности и деталей.",
  },
  {
    tc: "00:05",
    title: "Забираете",
    text: "Я передам готовые файлы и оригиналы кассет или выдам технику после ремонта. Объясню результат и отвечу на вопросы.",
  },
];

export function Visit() {
  return (
    <section id="visit" className="scroll-mt-24 bg-paper2/60">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24">
        <SectionHead
          chapter="07"
          kicker="Как проходит визит"
          title="Пять кадров — от звонка до результата"
          lead={
            <p>
              Сначала я обсужу с вами задачу по телефону. На приёме осмотрю
              технику или кассеты и согласую работу, стоимость и срок.
            </p>
          }
        />
      </div>
      <Reveal delay={100}>
        <div className="filmstrip mt-12">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {VISIT_STEPS.map((s, i) => (
                <li
                  key={s.tc}
                  className={`rounded-xl bg-paper p-5 ${i % 2 ? "lg:translate-y-3" : ""}`}
                >
                  <p className="flex items-center justify-between font-mono text-[13px] font-bold tracking-[0.14em] text-branddark">
                    <span>{s.tc}</span>
                    <span aria-hidden className="text-rec">●</span>
                  </p>
                  <h4 className="font-display mt-3 text-[17px] font-bold">{s.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink3">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
