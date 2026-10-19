import type { ReactNode } from "react";
import {
  Building2,
  Cpu,
  Fan,
  HardDrive,
  Laptop,
  Phone,
  Speaker,
  X,
} from "lucide-react";
import { SectionHead, Reveal } from "./ui";
import { PHONE_MOBILE_DISPLAY, PHONE_MOBILE_HREF } from "../lib/data";

function PriceRow({ name, price }: { name: string; price: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3 py-2">
      <span className="text-[16px] leading-snug font-semibold">{name}</span>
      <span aria-hidden className="mx-0.5 flex-1 border-b border-dotted border-ink/25" />
      <span className="shrink-0 font-mono text-[15px] font-bold whitespace-nowrap">
        {price}
      </span>
    </li>
  );
}

function ServiceCard({
  Icon,
  title,
  intro,
  children,
  footnote,
  delay = 0,
}: {
  Icon: typeof Laptop;
  title: string;
  intro: string;
  children: ReactNode;
  footnote?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="flex h-full flex-col rounded-[28px] border-2 border-ink bg-cream p-6 shadow-[8px_8px_0_0_rgba(34,27,18,0.9)] sm:p-7">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-ink">
            <Icon className="h-7 w-7 text-brandsoft" />
          </span>
          <h3 className="font-display text-lg leading-tight font-bold sm:text-xl">
            {title}
          </h3>
        </div>
        <p className="mt-4 leading-relaxed text-ink3">{intro}</p>
        <ul className="mt-3 flex-1 divide-y divide-ink/[0.07]">{children}</ul>
        {footnote && (
          <p className="mt-4 border-t-2 border-dashed border-ink/15 pt-4 text-[15px] leading-relaxed text-ink3">
            {footnote}
          </p>
        )}
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHead
          chapter="05"
          kicker="Ремонт и техника"
          title="Ноутбуки, звук и домашняя техника"
          lead={
            <p>
              Правило везде одно: сначала осмотр, причина поломки и цена — потом
              ваше решение. Если чинить невыгодно, мастер скажет об этом прямо,
              а не выставит счёт за «попытку».
            </p>
          }
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          <ServiceCard
            Icon={Laptop}
            title="Ноутбуки и компьютеры"
            intro="Для тех, кто устал от «компьютерных мастеров по объявлению» с ценами-сюрпризами. Стоимость называется до работы, а причина поломки объясняется человеческими словами."
            footnote="Диагностика бесплатна, если вы соглашаетесь на ремонт. Выезда на дом нет: приносите технику в мастерскую — здесь инструменты, запчасти и спокойная обстановка для работы."
          >
            <PriceRow name="Диагностика ПК или ноутбука" price="500 ₽" />
            <PriceRow name="Чистка и термопаста: ноутбук" price="от 1 800 ₽" />
            <PriceRow name="Чистка и термопаста: системный блок" price="от 1 200 ₽" />
            <PriceRow name="Апгрейд: работа по замене комплектующих" price="от 800 ₽" />
            <PriceRow name="Ремонт после диагностики" price="по факту поломки" />
          </ServiceCard>

          <ServiceCard
            Icon={HardDrive}
            title="Восстановление и перенос данных"
            intro="Спасаем фотографии, документы и семейные архивы со старых дисков, флешек и неработающих компьютеров — если сбой программный или логический: удалённые файлы, повреждённые разделы, «умершие» флешки."
            delay={90}
            footnote="Честно: результат зависит от состояния носителя, и гарантировать его заранее нельзя. Гермоблок диска физически не вскрываем — это работа для чистой комнаты. Совет: если файлы пропали, ничего больше не записывайте на этот носитель."
          >
            <PriceRow name="Диагностика носителя" price="500 ₽" />
            <PriceRow name="Восстановление при успешном извлечении" price="2 000–5 000 ₽" />
            <PriceRow name="Перенос данных на новый компьютер или диск" price="1 000 ₽" />
          </ServiceCard>

          <ServiceCard
            Icon={Cpu}
            title="Сборка и покупка компьютера"
            intro="Мастер много лет сам собирал и продавал компьютеры в Тобольске — эту кухню знает изнутри. Соберёт машину ровно под вашу задачу: для дома, офиса или игр, без магазинных накруток и «обязательных» лишних деталей."
            footnote="Подбор конфигурации (1 500 ₽) при заказе сборки входит в её стоимость — отдельно за него доплачивать не придётся."
          >
            <PriceRow name="Проверка б/у компьютера перед покупкой" price="1 000 ₽" />
            <PriceRow name="Подбор конфигурации под бюджет" price="1 500 ₽" />
            <PriceRow name="Сборка из ваших деталей: домашний / офисный" price="3 500 ₽" />
            <PriceRow name="Сборка из ваших деталей: игровой" price="4 500 ₽" />
            <PriceRow name="Подбор комплектующих + сборка: домашний / офисный" price="5 000 ₽" />
            <PriceRow name="Подбор комплектующих + сборка: игровой" price="6 000 ₽" />
          </ServiceCard>

          <ServiceCard
            Icon={Speaker}
            title="Аудиотехника"
            intro="Та самая «хай-файная» часть мастерской. Автомобильные усилители, активная акустика, музыкальные центры и домашние усилители, которые жалко выбрасывать, здесь получают вторую жизнь."
            delay={90}
            footnote="Сначала диагностика и честный вердикт: ремонт имеет смысл или дешевле заменить. Часть современной техники сделана одноразовой — об этом мастер скажет после осмотра."
          >
            <PriceRow name="Усилитель: диагностика" price="300 ₽" />
            <PriceRow name="Усилитель: ремонт" price="от 1 500 ₽" />
            <PriceRow name="Активная акустика и колонки: ремонт" price="от 1 200 ₽" />
            <PriceRow name="Музыкальный центр: диагностика и ремонт" price="от 1 000 ₽" />
            <PriceRow name="Запись ваших данных на CD/DVD" price="200 ₽" />
          </ServiceCard>

          <ServiceCard
            Icon={Fan}
            title="Бытовая техника и приборы"
            intro="Магнитолы, роботы-пылесосы, увлажнители — техника, которая ещё послужит, если найти причину поломки. Берём то, что в принципе ремонтопригодно, и не берём деньги за безнадёжный случай."
            footnote="Сначала позвоните и опишите прибор — мастер сразу скажет, есть ли смысл везти. Это экономит поездку через город."
          >
            <PriceRow name="Магнитола: диагностика" price="300 ₽" />
            <PriceRow name="Магнитола: ремонт" price="от 1 000 ₽" />
            <PriceRow name="Робот-пылесос: диагностика и ремонт" price="от 1 000 ₽" />
            <PriceRow name="Увлажнитель: диагностика и ремонт" price="от 1 000 ₽" />
          </ServiceCard>

          <ServiceCard
            Icon={Cpu}
            title="Windows и программы"
            intro="Установка системы, драйверы, антивирус, Office и другие программы — отдельная глава сайта, потому что это самая частая работа после оцифровки."
            delay={90}
          >
            <PriceRow name="Windows, драйверы и базовые программы" price="от 1 500 ₽" />
            <PriceRow name="Удаление вирусов и настройка" price="от 1 200 ₽" />
            <PriceRow name="Перенос данных со старого диска" price="1 000 ₽" />
            <li className="pt-3">
              <a
                href="#windows"
                className="inline-flex min-h-11 items-center font-bold text-branddark underline decoration-2 underline-offset-4 transition hover:text-ink"
              >
                Подробнее о системе и программах →
              </a>
            </li>
          </ServiceCard>
        </div>

        {/* офисное обслуживание */}
        <Reveal delay={100}>
          <div className="mt-7 flex flex-col items-start gap-5 rounded-[28px] bg-ink px-6 py-7 text-cream sm:px-8 lg:flex-row lg:items-center">
            <span className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-ink2">
              <Building2 className="h-7 w-7 text-brandsoft" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-bold sm:text-xl">
                Небольшим офисам Тобольска
              </h3>
              <p className="mt-2 leading-relaxed text-paper/85">
                Абонементное обслуживание компьютеров:{" "}
                <strong className="text-brandsoft">базовое — 3 000 ₽/мес</strong>,{" "}
                <strong className="text-brandsoft">расширенное — 5 500 ₽/мес</strong>.
                Что именно войдёт в ваш абонемент, обсуждается лично с мастером по
                телефону — под ваши машины и задачи.
              </p>
            </div>
            <a
              href={PHONE_MOBILE_HREF}
              className="inline-flex min-h-13 shrink-0 items-center gap-2.5 rounded-2xl border-2 border-cream/30 px-6 py-3 font-mono text-[15px] font-bold transition hover:border-brandsoft hover:text-brandsoft"
            >
              <Phone className="h-5 w-5" />
              {PHONE_MOBILE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Честные границы                                                    */
/* ------------------------------------------------------------------ */

const LIMITS: { title: string; text: string }[] = [
  {
    title: "Смартфоны и планшеты",
    text: "не ремонтируем совсем — с этим лучше сразу в специализированный сервис",
  },
  {
    title: "Сложную микропайку (BGA)",
    text: "не делаем: для неё нужно другое оборудование и другой профиль работ",
  },
  {
    title: "Жёсткие диски физически не вскрываем",
    text: "гермоблок открывается только в чистой комнате лаборатории",
  },
  {
    title: "На дом и в офисы не выезжаем",
    text: "вся работа делается в мастерской, где инструменты, стенды и запчасти",
  },
  {
    title: "Аудиокассеты, бобины и киноплёнку не оцифровываем",
    text: "только видеокассеты MiniDV и Digital8 — зато делаем это хорошо",
  },
];

export function Limits() {
  return (
    <section className="bg-paper2/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHead
            chapter="05.5"
            kicker="Честные границы"
            title="Чего мы не делаем — и почему это хорошо"
            lead={
              <>
                <p>
                  Мастерская не берётся за всё подряд. Специализация вместо
                  «чиним всё за час» означает простую вещь: если мастер взялся за
                  вашу задачу, он умеет её делать и сделает как следует.
                </p>
                <p className="mt-4">
                  А если задача не наша — вы узнаете об этом по телефону за минуту
                  и не потратите время на дорогу через город.
                </p>
              </>
            }
            hand="лучше честное «нет», чем плохой ремонт"
          />

          <Reveal delay={120}>
            <ul className="space-y-3.5">
              {LIMITS.map((l) => (
                <li
                  key={l.title}
                  className="flex gap-4 rounded-2xl border-2 border-ink/10 bg-cream px-5 py-4"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rec/12">
                    <X className="h-5 w-5 text-rec" />
                  </span>
                  <p className="leading-relaxed">
                    <strong className="font-extrabold">{l.title}</strong>
                    <span className="text-ink3"> — {l.text}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-ink2">
              Сомневаетесь, ваш ли это случай?{" "}
              <a
                href={PHONE_MOBILE_HREF}
                className="font-extrabold text-branddark underline decoration-2 underline-offset-4 hover:text-ink"
              >
                Позвоните {PHONE_MOBILE_DISPLAY}
              </a>{" "}
              и просто опишите ситуацию своими словами — мастер честно ответит,
              возьмётся или нет.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
