import { Phone } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Wizard from "./components/Wizard";
import Digitize from "./components/Digitize";
import WindowsSoftware from "./components/WindowsSoftware";
import Calculator from "./components/Calculator";
import Services, { Limits } from "./components/Services";
import About, { Visit } from "./components/About";
import Contacts, { Footer } from "./components/Contacts";
import { PHONE_MOBILE_DISPLAY, PHONE_MOBILE_HREF } from "./lib/data";

const MARQUEE = [
  "Оцифровка MiniDV и Digital8",
  "Установка Windows и программ",
  "Ремонт ноутбуков и компьютеров",
  "Роботы-пылесосы и увлажнители",
  "Магнитолы и музыкальные центры",
  "Автомобильные усилители и акустика",
  "Сборка ПК под ваш бюджет",
  "Восстановление данных",
  "Тобольск · 8-й мкр, дом 16 · вход со двора",
];

function Marquee() {
  const line = [...MARQUEE, ...MARQUEE];
  return (
    <div className="filmstrip overflow-hidden" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-0 py-7 whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {line.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center font-mono text-[13px] font-bold tracking-[0.18em] text-cream/85 uppercase"
              >
                <span className="px-6">{item}</span>
                <span className="text-brand">▶</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Плавающая кнопка звонка на мобильных — главное действие всегда под рукой. */
function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-cream/15 bg-ink/95 backdrop-blur-md lg:hidden">
      <div
        className="flex gap-2.5 px-4 pt-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={PHONE_MOBILE_HREF}
          className="flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-brand px-4 py-2.5 text-ink shadow-[0_4px_0_0_var(--color-branddark)] active:translate-y-0.5 active:shadow-none"
        >
          <Phone className="h-5.5 w-5.5 shrink-0" />
          <span className="leading-tight">
            <span className="block text-[16px] font-extrabold">Позвонить мастеру</span>
            <span className="block font-mono text-[13px] font-bold">
              {PHONE_MOBILE_DISPLAY}
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Wizard />
        <Digitize />
        <WindowsSoftware />
        <Calculator />
        <Services />
        <Limits />
        <About />
        <Visit />
        <Contacts />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
