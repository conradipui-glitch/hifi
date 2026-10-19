/* ------------------------------------------------------------------ */
/*  Контакты мастерской «Хай-Фай»                                     */
/* ------------------------------------------------------------------ */

export const PHONE_MOBILE_DISPLAY = "+7 905 822-01-35";
export const PHONE_MOBILE_HREF = "tel:+79058220135";
export const ADDRESS = "г. Тобольск, 8-й микрорайон, дом 16, 1 этаж, вход со двора";
export const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/?text=" +
  encodeURIComponent("Тобольск, 8-й микрорайон, 16");

export const WORK_HOURS_SHORT = "Пн–Пт · 9:00–18:00";
export const WORK_HOURS_NOTE = "приём по звонку";
export const WORK_HOURS_LONG =
  "По будням с 9:00 до 18:00, суббота и воскресенье — выходные.";

/* ------------------------------------------------------------------ */
/*  Прайс (единый источник правды для сайта и калькулятора)           */
/* ------------------------------------------------------------------ */

export type TapeKind =
  | "minidvShort"
  | "minidvLong"
  | "digital8Short"
  | "digital8Long";

export const TAPE_KINDS: Record<
  TapeKind,
  { title: string; hint: string; price: number; hours: number }
> = {
  minidvShort: {
    title: "MiniDV до 60 минут",
    hint: "кассета из видеокамеры, запись SP",
    price: 600,
    hours: 1,
  },
  minidvLong: {
    title: "MiniDV 60–90 минут",
    hint: "режим LP и длинные записи",
    price: 800,
    hours: 1.5,
  },
  digital8Short: {
    title: "Digital8 до 60 минут",
    hint: "кассета размером с аудио, запись SP",
    price: 700,
    hours: 1,
  },
  digital8Long: {
    title: "Digital8 60–90 минут",
    hint: "режим LP и длинные записи",
    price: 900,
    hours: 1.5,
  },
};

export const PRICE = {
  minOrder: 600,
  noisePerTape: 250,
  editPerTapeFrom: 500,
  usb64: 600,
  dvdPerDisc: 200,
  urgentMultiplier: 1.5,
  damagedTapeFrom: 500,
  damagedTapeTo: 1500,
};

/** Скидка за объём — с каждой кассеты, по общему количеству кассет в заказе. */
export function volumeDiscountPerTape(totalTapes: number): number {
  if (totalTapes >= 20) return 200;
  if (totalTapes >= 10) return 150;
  if (totalTapes >= 5) return 100;
  return 0;
}

export function nextDiscountStep(
  totalTapes: number,
): { need: number; discount: number } | null {
  if (totalTapes < 5) return { need: 5 - totalTapes, discount: 100 };
  if (totalTapes < 10) return { need: 10 - totalTapes, discount: 150 };
  if (totalTapes < 20) return { need: 20 - totalTapes, discount: 200 };
  return null;
}

export function formatMoney(n: number): string {
  return n.toLocaleString("ru-RU") + "\u00A0₽";
}

export function plural(n: number, forms: [string, string, string]): string {
  const mod100 = Math.abs(n) % 100;
  const mod10 = Math.abs(n) % 10;
  if (mod100 > 10 && mod100 < 20) return forms[2];
  if (mod10 > 1 && mod10 < 5) return forms[1];
  if (mod10 === 1) return forms[0];
  return forms[2];
}

/* ------------------------------------------------------------------ */
/*  Режим работы и живой статус «открыто / закрыто»                   */
/*  Время считается по Тобольску (Asia/Yekaterinburg, UTC+5)          */
/* ------------------------------------------------------------------ */

export type StatusState = "open" | "closed";

export interface OpenStatus {
  state: StatusState;
  label: string;
  detail: string;
}

export function getTobolskNow(date = new Date()): {
  weekday: number; // 0 = воскресенье
  hour: number;
  minute: number;
} {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Yekaterinburg",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) parts[p.type] = p.value;
  const wdMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    weekday: wdMap[parts.weekday] ?? 1,
    hour: parseInt(parts.hour, 10) % 24,
    minute: parseInt(parts.minute, 10),
  };
}

export function getOpenStatus(date = new Date()): OpenStatus {
  const { weekday, hour, minute } = getTobolskNow(date);
  const t = hour * 60 + minute;
  const workday = weekday >= 1 && weekday <= 5;

  if (!workday)
    return {
      state: "closed",
      label: "Сейчас выходной",
      detail:
        "Мастерская работает по будням с 9:00 до 18:00. Позвоните в понедельник.",
    };
  if (t >= 540 && t < 1080)
    return {
      state: "open",
      label: "Сейчас открыто",
      detail: "Работаем до 18:00. Приём по звонку — позвоните перед визитом.",
    };
  return {
    state: "closed",
    label: "Сейчас закрыто",
    detail:
      t < 540
        ? "Мастерская откроется сегодня в 9:00."
        : "Рабочий день окончен. Позвоните завтра с 9:00.",
  };
}
