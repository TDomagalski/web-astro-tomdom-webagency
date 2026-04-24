# TomDevWeb — postęp implementacji

## Aktualny etap: ✅ Etap 4 + i18n ukończone / ⏳ Etap 5 do zrobienia

---

## Etapy projektu

| Etap | Nazwa | Status |
|------|-------|--------|
| 1 | Fundament (setup, layout, nawigacja) | ✅ Ukończony |
| 2 | Strona główna (Hero, O mnie, CTA) | ✅ Ukończony |
| 3 | Podstrony (Usługi, O mnie pełna, Kontakt) | ✅ Ukończony |
| 4 | Portfolio (Content Collection, strona) | ✅ Ukończony |
| 5+ | Rozbudowa (Blog, formularz, animacje) | ⏳ Do zrobienia |

---

## Etap 1 — Fundament ✅

### Konfiguracja projektu
- `package.json` — nazwa `tomdevweb`, skrypty: `dev`, `build`, `preview`, `lint`, `lint:fix`, `format`, `format:check`
- `astro.config.mjs` — Astro 6 + Tailwind v4 (Vite plugin) + `@astrojs/sitemap` + i18n (pl/en, default: pl bez prefiksu)
- `tsconfig.json` — TypeScript strict
- `.env.example` — szablony zmiennych `PUBLIC_GA4_MEASUREMENT_ID` i `GOOGLE_SEARCH_CONSOLE_VERIFICATION`
- `.gitignore` — standardowy Astro

### Linting i formatowanie
- `eslint.config.mjs` — ESLint 10 + `@typescript-eslint` + `eslint-plugin-astro` + `eslint-plugin-jsx-a11y` + `eslint-plugin-simple-import-sort`
- `prettier.config.mjs` — bez średników, pojedyncze cudzysłowy, 2 spacje, `prettier-plugin-astro`

### Style
- `src/styles/global.css` — `@fontsource-variable/inter`, Tailwind v4, dark mode, `@plugin '@tailwindcss/typography'`, `--color-accent` (#3b82f6), `--color-accent-hover` (#2563eb)

### Komponenty i layout
- `src/components/SEO.astro`, `NavBar.astro`, `Footer.astro`
- `src/layouts/BaseLayout.astro` — anty-FOUC dark mode, `<html lang="pl">`

---

## Etap 2 — Strona główna ✅

- `src/components/HeroSection.astro` — etykieta `<web developer />`, h1 z akcentem, dwa CTA
- `src/components/AboutPreview.astro` — numerowany nagłówek, highlights z lewą ramką akcentu
- `src/components/CTASection.astro` — karta z etykietą `// następny krok`
- `src/pages/index.astro` — złożona strona główna

---

## Etap 3 — Podstrony ✅

- `src/components/PageHeader.astro` — wspólny nagłówek podstron (label mono + h1 + opis)
- `src/pages/uslugi.astro` — 4 usługi w siatce 2-kolumnowej z tagami
- `src/pages/o-mnie.astro` — layout 2/3 + 1/3: historia, wartości, stack, lokalizacja
- `src/pages/kontakt.astro` — dane kontaktowe (mailto:/tel:), 4-krokowy proces, karta dostępności

---

## Etap 4 — Portfolio ✅

### Co zostało zrobione

- `src/content.config.ts` — Content Collection `portfolio` z nowym Content Layer API (Astro 5+), `glob` loader, Zod schema: `title`, `description`, `tags`, `image?`, `url?`, `date`, `featured`
- `src/content/portfolio/strona-firmowa-budmax.md` — projekt featured, tagi: Astro/TypeScript/Tailwind/SEO
- `src/content/portfolio/sklep-internetowy-zielono.md` — projekt featured, tagi: Astro/React/WooCommerce/Stripe
- `src/content/portfolio/portfolio-fotograficzne-anna-k.md` — projekt nie-featured, tagi: Astro/TypeScript/Tailwind/Optymalizacja
- `src/pages/portfolio.astro` — siatka 3-kolumnowa kart z sortowaniem po dacie (najnowsze pierwsze), badge "wyróżniony", placeholder grafiki `</>`, tagi, link "Czytaj więcej →", CTA
- `src/pages/portfolio/[slug].astro` — strona szczegółowa: nagłówek z datą i tagami, link "Zobacz stronę" (jeśli url), treść Markdown przez `<Content />`, nawigacja powrotna

### Decyzje techniczne
- `slug` generowany z `project.id.replace(/\.md$/, '')` — nowe Content Layer API używa `id` zamiast `slug`
- `@tailwindcss/typography` zainstalowany i zarejestrowany przez `@plugin` w `global.css` — styl `prose` dla treści Markdown
- Projekty sortowane po `data.date` malejąco (najnowszy pierwszy)

---

## Etap 5+ — Rozbudowa ⏳

Możliwe kierunki rozbudowy (kolejność do ustalenia):

- [ ] **Blog** — nowa Content Collection `blog`, listing + strony wpisów
- [ ] **Formularz kontaktowy** — integracja z usługą (np. Resend, Formspree) lub endpoint Astro SSR
- [ ] **Animacje** — subtelne transitions (np. View Transitions API Astro)
- [ ] **GA4** — podpięcie skryptu po uzyskaniu domeny i Property ID
- [ ] **i18n** — wersja angielska stron (struktury już przygotowane)
- [ ] **Obrazy portfolio** — zastąpienie placeholderów prawdziwymi screenshotami projektów
- [ ] **Favicon** — docelowy favicon po ustaleniu logotypu

---

## Notatki techniczne

### Dark mode
Tailwind v4 używa `@custom-variant dark (&:where(.dark, .dark *))`. Klasa `dark` na `<html>`, stan w `localStorage['theme']`.

### Tailwind v4 — kolory i pluginy
Kolory w `@theme` → auto-generowane klasy (`bg-accent`, `text-accent`). Pluginy rejestrowane przez `@plugin` w CSS (nie przez `tailwind.config.js`).

### Content Layer API (Astro 5+)
Config w `src/content.config.ts` (nie w `src/content/config.ts`). Używa `glob` loadera z `astro/loaders`. `entry.id` zawiera rozszerzenie pliku — slug generować przez `id.replace(/\.md$/, '')`. `render()` importowany z `astro:content`.

### i18n
`prefixDefaultLocale: false` — polska wersja pod `/`, angielska pod `/en/`. Struktura gotowa, treści tylko po polsku.

### i18n — wersja angielska ✅
`src/i18n/index.ts` — type `Locale`, `navLinks` (pl/en), `ui` (footer + langToggle strings). BaseLayout przyjmuje `locale` i `alternateHref`. NavBar renderuje przełącznik języka (PL/EN) gdy `alternateHref` jest podane. Footer tłumaczony przez `ui[locale].footer`. Angielskie strony w `src/pages/en/`: `index`, `services`, `about`, `contact`, `portfolio`, `portfolio/[slug]`. Wszystkie polskie strony zaktualizowane o `locale="pl"` i `alternateHref`.

> ⚠️ Apostrofy w atrybutach Astro: `'I\'m...'` nie działa — używać template literals: `` {`I'm...`} ``

### ESLint + peer deps
> ⚠️ `eslint-plugin-jsx-a11y@6`: peer dep na ESLint ≤9, działa z ESLint 10. Zawsze instalować z `--legacy-peer-deps`. Dodano `.npmrc` z `legacy-peer-deps=true` — rozwiązuje ten sam problem na Vercelu i innych CI/CD które nie używają tej flagi domyślnie.

### Hamburger menu — pominięte przy pierwszej implementacji
> ⚠️ `NavBar.astro`: hamburger menu nie zostało zaimplementowane w Etapie 1 — linki `hidden md:flex` były widoczne tylko na desktop, na mobile nie było żadnego menu. Naprawione po zgłoszeniu przez użytkownika. Przy kolejnych nawigacjach zawsze sprawdzać czy mobile menu jest zaimplementowane.
