import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
let failed = false;

function check(ok, message) {
  if (ok) {
    console.log(`PASS ${message}`);
  } else {
    console.error(`FAIL ${message}`);
    failed = true;
  }
}

function textOf(fragment) {
  return fragment
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "";
const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "";
const h1Text = textOf(h1);
const bodyText = textOf(html);

check(/видеокассет/i.test(title), "title содержит «видеокассет»");
check(/Тобольск/i.test(title), "title содержит «Тобольск»");
check(/видеокассет/i.test(h1Text), "H1 содержит «видеокассет»");
check(/Тобольск/i.test(h1Text), "H1 содержит «Тобольск»");
check(h1Text.length > 10, "H1 отрендерен в статический HTML");

const ldMatch = html.match(
  /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i,
);
check(Boolean(ldMatch), "JSON-LD присутствует");

let graph = [];
if (ldMatch) {
  try {
    const data = JSON.parse(ldMatch[1]);
    graph = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
    check(true, "JSON-LD парсится");
  } catch (error) {
    check(false, `JSON-LD парсится (${error.message})`);
  }
}

const types = new Set(graph.map((node) => node["@type"]));
check(types.has("LocalBusiness"), "JSON-LD содержит LocalBusiness");
check(types.has("Service"), "JSON-LD содержит Service");
check(types.has("FAQPage"), "JSON-LD содержит FAQPage");

const faq = graph.find((node) => node["@type"] === "FAQPage");
const questions = faq?.mainEntity || [];
check(questions.length === 7, `в FAQPage 7 вопросов (сейчас ${questions.length})`);
for (const question of questions) {
  check(
    bodyText.includes(question.name),
    `вопрос виден в HTML: «${question.name}»`,
  );
}

const service = graph.find((node) => node["@type"] === "Service");
const prices = (service?.offers || []).map((offer) => String(offer.price));
for (const price of ["600", "700", "800", "900"]) {
  check(prices.includes(price), `в Service есть цена ${price} ₽`);
}

check(/tel:\+7\d{10}/.test(html), "телефонная ссылка содержит 11 цифр");
check(
  /MiniDV — от 600 ₽/.test(bodyText),
  "на первом экране видна цена MiniDV",
);

const forbidden = [
  "Windows",
  "Office",
  "антивирус",
  "драйвер",
  "ноутбук",
  "восстановление данных",
  "сборка ПК",
  "ремонт аудио",
  "усилител",
  "пылесос",
  "увлажнитель",
];
for (const term of forbidden) {
  check(
    !new RegExp(term, "i").test(bodyText),
    `нет посторонней услуги: «${term}»`,
  );
}

if (failed) {
  console.error("SEO-проверка не пройдена");
  process.exit(1);
}
console.log("SEO-проверка пройдена");
