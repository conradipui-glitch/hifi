import { readFile, writeFile } from "node:fs/promises";
import { render } from "../dist-ssr/prerender.mjs";

const file = "dist/index.html";
const marker = '<div id="root"></div>';

const appHtml = render();
if (!appHtml.includes("<h1")) {
  throw new Error("prerender: в разметке нет <h1>");
}

const html = await readFile(file, "utf8");
if (!html.includes(marker)) {
  throw new Error("prerender: не найден пустой контейнер #root");
}

await writeFile(file, html.replace(marker, `<div id="root">${appHtml}</div>`));
console.log(`prerender: ${appHtml.length} символов разметки добавлены в ${file}`);
