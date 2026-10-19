import {
  AppWindow,
  Check,
  Cpu,
  Download,
  HardDrive,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SectionHead, Reveal, CallButton } from "./ui";
import { PHONE_MOBILE_DISPLAY, PHONE_MOBILE_HREF, formatMoney } from "../lib/data";

const INCLUDED = [
  "Windows 10 или 11 — установка и первичная настройка",
  "драйверы на всё железо: звук, Wi-Fi, видео, принтер",
  "браузер, архиватор, PDF и другие базовые программы",
  "антивирус и базовая защита от рекламных баннеров",
  "Office или другой офисный пакет — по вашей лицензии",
  "перенос документов и фото со старого диска",
];

const STEPS: {
  Icon: typeof Cpu;
  title: string;
  text: string;
}[] = [
  {
    Icon: Download,
    title: "Система",
    text: "Чистая установка Windows без «сборок» с сюрпризами. Лицензия — ваша или подскажем, как оформить.",
  },
  {
    Icon: Cpu,
    title: "Драйверы",
    text: "Чтобы работали звук, Wi-Fi, камера, видеокарта и принтер, а не «часть железа почему-то молчит».",
  },
  {
    Icon: ShieldCheck,
    title: "Защита",
    text: "Антивирус, удаление вирусов и всплывающей рекламы, нормальные настройки браузера.",
  },
  {
    Icon: AppWindow,
    title: "Программы",
    text: "Office, браузеры, PDF, архивы, программы для работы и учёбы — ставим и настраиваем под вас.",
  },
];

const PRICES: [string, string][] = [
  ["Windows, драйверы и базовые программы", `от ${formatMoney(1500)}`],
  ["Удаление вирусов и настройка", `от ${formatMoney(1200)}`],
  ["Перенос данных со старого диска", formatMoney(1000)],
  ["Помощь с лицензией и выбором версии", "по телефону"],
];

export default function WindowsSoftware() {
  return (
    <section id="windows" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
          <div>
            <SectionHead
              chapter="03"
              kicker="Система и программы"
              title={
                <>
                  Windows, драйверы и всё,
                  <span className="block">что нужно для работы</span>
                </>
              }
              lead={
                <p>
                  Работа, которая окупается сразу: компьютер снова включается,
                  всё открывается, ничего не висит и не сыплет рекламой. Ставим
                  систему с нуля, подключаем железо и программы — и объясняем,
                  что и зачем появилось на рабочем столе.
                </p>
              }
              hand="самая благодарная работа — компьютер оживает на глазах"
            />

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="flex h-full gap-4 rounded-3xl border-2 border-ink/10 bg-cream p-5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/20">
                      <s.Icon className="h-5.5 w-5.5 text-branddark" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold">{s.title}</h3>
                      <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink3">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-6 rounded-3xl border-2 border-dashed border-branddark/45 bg-brand/10 p-5 sm:p-6">
                <p className="flex items-start gap-3 leading-relaxed">
                  <Wrench className="mt-0.5 h-6 w-6 shrink-0 text-branddark" />
                  <span>
                    <strong>Компьютер совсем не включается?</strong> Сначала
                    диагностика — {formatMoney(500)}, и она бесплатна, если вы
                    соглашаетесь на ремонт. Мастер скажет причину и цену до
                    начала работы, а не после.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* карточка «под ключ» */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-[28px] bg-ink p-6 text-cream shadow-[10px_10px_0_0_rgba(34,27,18,0.18)] sm:p-8">
              <p className="font-mono text-xs font-bold tracking-[0.18em] text-brandsoft uppercase">
                Установка «под ключ»
              </p>
              <p className="font-display mt-3 flex flex-wrap items-baseline gap-x-2 text-3xl leading-tight font-black">
                <span className="font-sans text-base font-semibold text-paper/60">от</span>
                {formatMoney(1500)}
              </p>
              <p className="mt-1 text-[15px] text-paper/70">
                система, драйверы и базовый набор программ
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-cream/15 pt-6">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-3 text-[15.5px] leading-snug">
                    <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brandsoft" />
                    <span className="text-paper/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-cream/15 pt-5">
                <p className="font-mono text-xs font-bold tracking-[0.18em] text-brandsoft uppercase">
                  Прайс
                </p>
                <ul className="mt-3 space-y-2">
                  {PRICES.map(([name, price]) => (
                    <li key={name} className="flex items-baseline justify-between gap-3 text-[15px]">
                      <span className="text-paper/85">{name}</span>
                      <span className="shrink-0 font-mono font-bold whitespace-nowrap text-cream">
                        {price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <CallButton className="w-full" />
                <a
                  href={PHONE_MOBILE_HREF}
                  className="mt-3 flex items-center justify-center gap-2 font-mono text-sm text-paper/60 transition hover:text-brandsoft"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_MOBILE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-3xl border-2 border-ink/10 bg-cream px-6 py-5">
            <span className="inline-flex items-center gap-2.5 font-bold">
              <HardDrive className="h-5.5 w-5.5 text-branddark" />
              Данные со старого диска
            </span>
            <span className="text-ink3">
              Перенесём документы, фото и рабочие файлы — ничего не потеряется
              при переустановке.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
