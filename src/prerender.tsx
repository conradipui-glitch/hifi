import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Точка входа для пререндера: отдаёт статическую разметку страницы,
 * чтобы поисковые и ИИ-краулеры видели текст без выполнения JS.
 */
export function render(): string {
  return renderToString(<App />);
}
