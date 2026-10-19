import { ArrowRight, Plus } from "lucide-react";
import { SectionHead, Reveal } from "./ui";
import { PHONE_MOBILE_DISPLAY, PHONE_MOBILE_HREF } from "../lib/data";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Как происходит оцифровка видеокассет?",
    a: "Я считываю запись с кассеты MiniDV или Digital8 в цифровой файл в реальном времени: час видео занимает час захвата. Передам файлы на флешке, диске или через облако — как договоримся. Оригиналы кассет верну вместе с готовыми файлами.",
  },
  {
    q: "Чем отличается MiniDV от Digital8?",
    a: "MiniDV — небольшая кассета примерно 6,6 × 4,8 см с надписями MiniDV, DVM60 или DVM80. Кассеты 8 мм крупнее, около 9,5 × 6,3 см. На них может быть цифровая запись Digital8 или аналоговая Video8/Hi8: маркировка корпуса сама по себе не определяет формат записи. Я работаю с MiniDV и Digital8. Для кассеты с надписью Hi8, Video8 или 8 mm сначала уточню запись и возможность считывания; заранее обещать совместимость не могу.",
  },
  {
    q: "Что делать, если кассета заплесневела или порвалась?",
    a: "Не прокручивайте кассету в камере: повреждённая лента или плесень могут повредить механизм и головки. Позвоните мне и опишите состояние кассеты. После осмотра оценю возможность работы и согласую стоимость. Если часть записи утрачена, вернуть её нельзя; повреждение может привести к потере фрагментов.",
  },
  {
    q: "Нужно ли записываться заранее?",
    a: "Да, позвоните мне перед визитом и договоритесь о времени. Я работаю один и принимаю по звонку. Рабочие дни — понедельник–пятница, с 9:00 до 18:00.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-paper2/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead
          chapter="05"
          kicker="Частые вопросы"
          title="О чём спрашивают по телефону"
          lead={
            <p>
              Здесь я ответил на вопросы о кассетах, оцифровке и приёме. Если вашего вопроса нет в списке, позвоните мне. Для точной цены понадобится осмотр кассет.
            </p>
          }
          hand="есть вопрос — позвоните мне ↓"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="group h-full rounded-2xl border-2 border-ink/12 bg-paper px-5 py-4 open:border-branddark/50 open:bg-cream sm:px-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[17.5px] leading-snug font-extrabold">{item.q}</h3>
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/20 text-branddark transition group-open:rotate-45">
                    <Plus className="h-5 w-5" />
                  </span>
                </summary>
                <p className="mt-3 pr-10 leading-relaxed text-ink2">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl bg-ink px-6 py-5 text-cream">
            <p className="text-[16.5px] font-semibold">
              Не нашли свой случай? Позвоните мне — обсудим.
            </p>
            <a
              href={PHONE_MOBILE_HREF}
              className="inline-flex items-center gap-2 font-mono text-[16px] font-bold text-brandsoft transition hover:text-brand"
            >
              {PHONE_MOBILE_DISPLAY}
              <ArrowRight className="h-4.5 w-4.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
