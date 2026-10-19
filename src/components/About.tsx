import {
  Heart,
  Lightbulb,
  MessageCircle,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { SectionHead, Reveal } from "./ui";

/* Рейтинг звёздами: 4,6 из 5 */
function Stars() {
  const row = (cls: string) => (
    <div className={`flex gap-1 ${cls}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-7 w-7 fill-current" strokeWidth={0} />
      ))}
    </div>
  );
  return (
    <span className="relative inline-block" role="img" aria-label="Рейтинг мастерской в 2ГИС: 4,6 из 5">
      {row("text-ink/15")}
      <span className="absolute inset-0 overflow-hidden" style={{ width: "92%" }}>
        {row("text-brand")}
      </span>
    </span>
  );
}

const PASSPORT: [string, string][] = [
  ["Наименование", "Мастерская «Хай-Фай»"],
  ["Специализация", "MiniDV и Digital8, компьютеры, данные, аудиотехника"],
  ["Работает в Тобольске", "более 30 лет"],
  ["По этому адресу", "более 11 лет в одном и том же помещении"],
  ["Персонал", "1 человек: мастер, приёмщик и директор"],
  ["Телефон мастера", "сотовый — только звонки, без мессенджеров"],
  ["Рейтинг в 2ГИС", "4,6 по оценкам горожан"],
  ["Оригиналы кассет", "возвращаются владельцу обязательно"],
];

const CITY_SAYS = [
  {
    Icon: MessageCircle,
    title: "Объясняет, а не пугает",
    text: "В отзывах повторяется одно и то же: мастер подробно и понятными словами рассказывает, что именно сломалось и почему, — до ремонта, а не после счёта.",
  },
  {
    Icon: Wallet,
    title: "Не берёт лишнего",
    text: "Цена называется заранее и по делу. Никаких «вскрыли — а там ещё на десять тысяч», чем грешат мастера по объявлениям.",
  },
  {
    Icon: Lightbulb,
    title: "Берётся за нестандартное",
    text: "Помогает с задачами, от которых в сервисах отмахиваются: старая техника, редкие носители, странные поломки — если случай по его части.",
  },
  {
    Icon: Users,
    title: "Клиенты — по 20–30 лет",
    text: "Многие горожане знают мастера десятилетиями и ведут к нему уже детей и внуков. Для маленького города это лучшая рекомендация.",
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
              Один мастер. Тридцать лет.
              <span className="block">Один адрес.</span>
            </>
          }
          lead={
            <>
              <p>
                «Хай-Фай» — не сеть и не сервисный центр с колл-центром. Это
                личная мастерская человека, который когда-то собирал и продавал
                компьютеры в Тобольске, а со временем сосредоточился на ремонте
                техники и сохранении домашних архивов.
              </p>
              <p className="mt-4">
                Он работает полностью один: сам принимает технику, сам чинит, сам
                отвечает за результат и сам берёт трубку своего телефона. Поэтому здесь нет посредников, «менеджеров по продажам
                допов» и накруток — есть один специалист, которого в городе
                знают десятилетиями.
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
                    проверено временем,
                    <br />
                    а не рекламой
                  </p>
                  <div
                    aria-hidden
                    className="flex h-24 w-24 shrink-0 rotate-[-10deg] flex-col items-center justify-center rounded-full border-[3px] border-branddark/70 text-center text-branddark/80"
                  >
                    <span className="font-mono text-[9px] font-bold tracking-[0.18em]">
                      ТОБОЛЬСК
                    </span>
                    <span className="font-display text-lg leading-none font-black">
                      30 ЛЕТ
                    </span>
                    <span className="font-mono text-[9px] font-bold tracking-[0.14em]">
                      НА МЕСТЕ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Что говорят в городе */}
          <div className="lg:col-span-3">
            <Reveal delay={80}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-display text-5xl font-black">4,6</span>
                <div>
                  <Stars />
                  <p className="mt-1.5 text-[15.5px] font-semibold text-ink3">
                    рейтинг мастерской в справочнике 2ГИС — по реальным оценкам
                    жителей Тобольска
                  </p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-ink3">
                Выдумывать отзывы с именами и фотографиями мы не будем. Вот что
                на самом деле повторяется в оценках горожан — пересказываем
                своими словами:
              </p>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {CITY_SAYS.map((c, i) => (
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
                    Одна история вместо тысячи отзывов
                  </h4>
                  <p className="mt-2 leading-relaxed text-paper/88">
                    Один из клиентов впервые пришёл сюда в 17 лет — принёс кассету
                    со своими детскими записями и перевёл её в цифру. Кассета
                    теперь живёт в цифровом виде, клиент давно вырос, а
                    мастерская работает всё в том же помещении — и его кассеты
                    наверняка ещё ждут своей очереди на оцифровку.
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
    title: "Позвоните",
    text: "Договоритесь о времени визита. Мастер работает один — без звонка можно прийти к закрытой двери.",
  },
  {
    tc: "00:02",
    title: "Приезжайте",
    text: "8-й микрорайон, дом 16, 1 этаж, вход со двора. Не перепутайте с «Фото-плюс» — это другая организация в том же доме.",
  },
  {
    tc: "00:03",
    title: "Осмотр и цена",
    text: "Мастер смотрит технику или кассеты, объясняет, что случилось, и называет стоимость — до начала работы.",
  },
  {
    tc: "00:04",
    title: "Работа",
    text: "Без конвейера и спешки. Кассета пишется в реальном времени, техника чинится основательно — как для себя.",
  },
  {
    tc: "00:05",
    title: "Забираете",
    text: "Готовые файлы, оригиналы кассет и отремонтированную технику. И номер мастера — теперь он у вас есть на будущее.",
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
              Никаких очередей, талонов и «оставьте заявку, мы перезвоним в течение
              трёх дней». Всё устроено по-простому, по-человечески.
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
