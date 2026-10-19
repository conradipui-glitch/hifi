# Мастерская «Хай-Фай» — сайт

Одностраничный сайт мастерской в Тобольске: оцифровка кассет MiniDV и Digital8.
Старые компоненты других услуг не подключены и не входят в сборку.
Материалы в `research/` — архив исследования, а не актуальное предложение сайта.

- Стек: React 19, Vite 7, Tailwind CSS 4, сборка в один `index.html`.
- Единый источник контактов и цен: `src/lib/data.ts`.
- Деплой: GitHub Pages через `.github/workflows/deploy.yml`.

## Локально

```bash
npm install
npm run dev
npm run build
```
