import { Phone } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Digitize from "./components/Digitize";
import Calculator from "./components/Calculator";
import About, { Visit } from "./components/About";
import Faq from "./components/Faq";
import Contacts, { Footer } from "./components/Contacts";
import { PHONE_MOBILE_DISPLAY, PHONE_MOBILE_HREF } from "./lib/data";

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
            <span className="block text-[16px] font-extrabold">Позвонить</span>
            <span className="block font-sans text-[13.5px] font-extrabold tabular-nums">
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
        <Digitize />
        <Calculator />
        <About />
        <Visit />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
