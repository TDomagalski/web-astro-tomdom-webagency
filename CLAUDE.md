# CLAUDE.md — TomDevWeb Agency

## Przegląd projektu

Strona internetowa agencji webowej **TomDevWeb** — freelancerski projekt wizytówkowy, budowany stopniowo. Zbudowany w najnowszej wersji Astro jako strona statyczna. Projekt będzie rozbudowywany etapami, oszczędzając tokeny — każda sesja powinna kończyć się w pełni działającym stanem.

## Stack technologiczny

- **Framework:** Astro (najnowsza stabilna wersja)
- **Styling:** Tailwind CSS z obsługą dark/light mode (class strategy)
- **Język:** TypeScript (strict mode)
- **Komponenty interaktywne:** Czyste Astro (`.astro`) jako domyślne; React tylko gdy niezbędna interaktywność po stronie klienta
- **Treści:** Astro Content Collections
- **Deployment:** Własny serwer (SSG — output: static)

## Struktura strony

Prosta strona wizytówkowa złożona z:

| Strona        | Ścieżka      | Zawartość                                      |
| ------------- | ------------ | ---------------------------------------------- |
| Strona główna | `/`          | Hero, O mnie (skrót), lista usług (skrót), CTA |
| Usługi        | `/uslugi`    | Jedna strona z listą usług                     |
| Portfolio     | `/portfolio` | Lista realizacji                               |
| O mnie        | `/o-mnie`    | Pełna podstrona o agencji                      |
| Kontakt       | `/kontakt`   | Dane kontaktowe (bez formularza)               |

### Przykładowe dane kontaktowe (placeholder)

```
Imię: Tomasz Domagalski
Firma: TomDevWeb
E-mail: kontakt@tomdevweb.pl
Telefon: +48 600 000 000
Lokalizacja: Polska (biuro lokalne - ul. Krakowska 62d, 32-090 Słomniki)
```

## Design i styl wizualny

- **Motyw:** Obsługa dark i light mode przez Tailwind (`darkMode: 'class'`)
- **Styl:** Techniczno-minimalistyczny — czysty, przestronny layout z elementami developerskiej estetyki (np. akcenty mono, subtelne gridy lub linie). Bez przesady — nie "terminal hacker", bardziej "senior dev portfolio"
- **Typografia:** Nowoczesny sans-serif ładowany przez `@fontsource` (lokalnie, bez requestu do Google) — preferowane: Inter lub Geist
- **Paleta:** Neutralne tła (biel / głęboka czerń/grafit), jeden wyraźny kolor akcentu (do ustalenia, propozycja: niebieski elektryczny lub cyjanowy)
- **Tone:** Profesjonalny, spokojny, kompetentny

## Konwencje kodu

### Nazewnictwo

- **Komponenty Astro:** PascalCase → `HeroSection.astro`, `NavBar.astro`
- **Pliki i foldery:** kebab-case → `hero-section.astro`, `src/content/portfolio/`
- **Zmienne i funkcje TS:** camelCase
- **Typy i interfejsy TS:** PascalCase

### Struktura folderów (standardowe Astro)

```
src/
├── components/     # Komponenty wielokrotnego użytku
├── layouts/        # Layouty stron
├── pages/          # Strony (routing)
├── content/        # Content Collections (portfolio, usługi)
├── styles/         # Globalne style (jeśli potrzebne poza Tailwind)
└── assets/         # Obrazy i inne zasoby statyczne
```

### Komentarze

- Komentarze w kodzie pisać **po polsku**
- Komentować tylko nieoczywiste decyzje (dlaczego, nie co)
- Nie komentować oczywistych rzeczy ani nie opisywać co robi kod

### TypeScript

- Używać `interface` zamiast `type` dla obiektów
- Definiować typy dla wszystkich Content Collections (przez `defineCollection` i `z` z Zod)
- Nie używać `any`

## Podejście do implementacji — etapy

Projekt budujemy stopniowo, każdy etap kończy się działającym stanem aplikacji:

1. **Etap 1 — Fundament:** Inicjalizacja projektu Astro, konfiguracja Tailwind z dark mode, layout bazowy, nawigacja, stopka
2. **Etap 2 — Strona główna:** Sekcje Hero, O mnie (skrót), CTA
3. **Etap 3 — Podstrony:** Usługi, O mnie (pełna), Kontakt
4. **Etap 4 — Portfolio:** Content Collection dla realizacji, strona portfolio
5. **Etap 5+ — Rozbudowa:** Blog, formularz kontaktowy, animacje, optymalizacje

**Zasada:** Na początku każdej sesji pytaj, od którego etapu zaczynamy lub co kontynuujemy.

## SEO

### Ogólne zasady

- Każda podstrona ma **własny, unikalny** `<title>`, `<meta name="description">` i Open Graph tags (`og:title`, `og:description`, `og:image`)
- Meta tagi zarządzane przez komponent `SEO.astro` (lub Astro `<head>` w layoucie) z przekazywanymi propsami
- Canonical URL ustawiony dla każdej strony (po ustaleniu domeny docelowej)
- Sitemap generowany automatycznie przez `@astrojs/sitemap`
- `robots.txt` generowany automatycznie

### Wielojęzyczność (i18n)

- Projekt planuje obsługę wielu języków (startujemy od polskiego, później angielski i inne)
- Przygotować strukturę pod i18n od początku — używać Astro i18n routing (`/pl/`, `/en/`)
- Każda wersja językowa ma własne meta tagi w odpowiednim języku
- Dodawać `hreflang` dla wersji językowych

### Dane strukturalne (Schema.org)

- Dodać JSON-LD z typem `ProfessionalService` na stronie głównej i kontaktowej
- Zawiera: nazwa firmy, opis, dane kontaktowe, obszar działania

### Analityka

- **Google Analytics 4** — skrypt dodawany przez Astro (dopiero po uzyskaniu domeny i GA4 Property ID)
- **Google Search Console** — weryfikacja przez meta tag lub plik HTML (po uzyskaniu domeny)
- Skrypty analityczne ładować tylko w środowisku produkcyjnym (`import.meta.env.PROD`)

### Obrazy i wydajność

- Zawsze używać komponentu `<Image />` z Astro (`astro:assets`) — automatyczny WebP, lazy loading, `srcset`
- Nigdy nie używać zwykłego `<img>` dla obrazów treściowych (wyjątek: dekoracyjne SVG inline)
- Atrybuty `alt` obowiązkowe na każdym obrazie

### Favicon

- Tylko standardowy favicon (`.ico` + `.png` 32x32 i 180x180)
- Bez PWA manifest i apple-touch-icon na tym etapie

## Git i GitHub

### Repozytorium

- Publiczne repozytorium na GitHubie
- Główna gałąź: `main`
- Brak blokady bezpośrednich pushów na `main`

### Strategia branchowania

Prosta struktura — dwie rodzaje gałęzi:

```
main                  # produkcja (własny serwer)
└── feature/<nazwa>   # nowe funkcje, np. feature/navbar
└── fix/<nazwa>       # poprawki, np. fix/dark-mode
└── chore/<nazwa>     # konfiguracja, zależności, np. chore/tailwind-setup
```

Każda zmiana trafia przez **Pull Request** — nawet gdy pracujesz sam. To dobra praktyka i pozwala Vercelowi generować podglądy (preview deployments).

### Konwencja commitów (Conventional Commits)

Format: `typ(zakres): opis` — opis po polsku, typ i zakres po angielsku.

```
feat(navbar): dodaj przełącznik dark/light mode
fix(seo): popraw canonical URL na stronie kontaktowej
chore(deps): dodaj @fontsource/inter
style(hero): popraw responsywność sekcji hero
refactor(layout): wydziel komponent SEO z layoutu
docs(claude): zaktualizuj sekcję git
```

Typy: `feat` | `fix` | `chore` | `style` | `refactor` | `docs` | `perf` | `test`

### Deployment — dwa środowiska

| Środowisko        | Hosting            | Trigger                      |
| ----------------- | ------------------ | ---------------------------- |
| **Produkcja**     | Własny serwer      | Ręczny deploy z `main`       |
| **Podgląd (dev)** | Vercel (free tier) | Automatycznie przy każdym PR |

Vercel połączony z GitHubem automatycznie generuje unikalny URL podglądu dla każdego Pull Requesta — pozwala zobaczyć zmiany przed mergem na `main`.

### Zmienne środowiskowe

- Sekrety (klucze GA4, GSC) trzymać w pliku `.env` — nigdy nie commitować go do repozytorium
- `.env` jest w `.gitignore` (domyślnie w Astro)
- Tworzyć plik `.env.example` z nazwami zmiennych (bez wartości) jako dokumentację
- Na Vercelu zmienne konfigurować ręcznie w panelu projektu (Settings → Environment Variables)

```bash
# .env.example
PUBLIC_GA4_MEASUREMENT_ID=
GOOGLE_SEARCH_CONSOLE_VERIFICATION=
```

- Zmienne publiczne (dostępne w przeglądarce) poprzedzać prefiksem `PUBLIC_`
- Zmienne prywatne (tylko serwer) bez prefiksu

### .gitignore

Standardowy `.gitignore` generowany przez Astro — nie modyfikować bez potrzeby.

## Styl kodu i linting

### Narzędzia

| Narzędzie | Rola |
|-----------|------|
| **ESLint** (najnowszy stabilny) | Sprawdzanie jakości i poprawności kodu |
| **Prettier** | Automatyczne formatowanie kodu |

ESLint i Prettier działają razem — ESLint pilnuje jakości kodu, Prettier pilnuje wyglądu.

### Konfiguracja Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro"]
}
```

### Pluginy ESLint

- **`@typescript-eslint`** — reguły dla TypeScript (poziom: `recommended`)
- **`eslint-plugin-astro`** — reguły dla plików `.astro` (poziom: `recommended`) + wbudowane reguły a11y dla Astro
- **`eslint-plugin-jsx-a11y`** — reguły dostępności dla komponentów React (gotowość na przyszłość)
- **`eslint-plugin-simple-import-sort`** — automatyczne sortowanie importów

### Reguły formatowania

- **Średniki:** nie (`semi: false`)
- **Cudzysłowy:** pojedyncze (`singleQuote: true`)
- **Wcięcia:** 2 spacje (`tabWidth: 2`)
- **Maksymalna długość linii:** 100 znaków

### Kolejność importów (simple-import-sort)

Porządek importów w każdym pliku:
1. Importy z Astro (`astro`, `astro:*`)
2. Importy zewnętrznych pakietów
3. Importy wewnętrzne (`@/`, `~/`, `../`, `./`)
4. Importy typów

### Skrypty w package.json

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Zasady pracy z linterem

- Przed każdym commitem uruchomić `npm run lint` — kod nie powinien trafiać do repozytorium z błędami ESLint
- Prettier formatuje automatycznie — nie poprawiać formatowania ręcznie
- Nie wyłączać reguł ESLint przez `// eslint-disable` bez uzasadnienia w komentarzu

## Śledzenie postępu

Szczegółowy dziennik implementacji prowadzony w **`docs/progress.md`**:
- aktualny etap i jego status
- lista ukończonych zadań z każdego etapu
- lista zadań do zrobienia w następnym etapie
- notatki techniczne (decyzje, workarounds, gotchas)

**Na początku każdej sesji przeczytaj `docs/progress.md`** żeby wiedzieć, gdzie projekt jest i co dalej.

### Automatyczna aktualizacja po ukończeniu etapu

Po zakończeniu każdego etapu **obowiązkowo zaktualizuj `docs/progress.md`**:

1. Zmień status ukończonego etapu z `⏳ Do zrobienia` na `✅ Ukończony` w tabeli etapów
2. Odblokuj następny etap — zmień `🔒 Zablokowany` na `⏳ Do zrobienia`
3. Dodaj nową sekcję z opisem ukończonego etapu (co zrobiono, jakie pliki, notatki techniczne)
4. Zaktualizuj sekcję następnego etapu — przepisz checklistę zadań do zrobienia
5. Zaktualizuj nagłówek `## Aktualny etap` na górze pliku

Aktualizacja `docs/progress.md` jest **ostatnim krokiem każdego etapu** — przed przejściem dalej.

### Obsługa błędów i gotchas

Nie prowadzimy osobnego pliku błędów. Zamiast tego:

**Błędy specyficzne dla projektu** (konflikty wersji, nieoczywista konfiguracja, workaroundy) — zapisuj w sekcji `### Notatki techniczne` aktualnego etapu w `docs/progress.md`. Format:

```
> ⚠️ [nazwa pakietu / obszar]: opis problemu i zastosowane rozwiązanie
```

**Poważne lub powtarzalne błędy** (takie, które mogą wrócić w przyszłych sesjach lub innych projektach) — zapisuj do systemu memory. Nie pytaj o zgodę, rób to automatycznie gdy napotkasz istotny gotcha.

**Kryterium zapisu:** zapisuj błąd jeśli spełnia choć jeden warunek:
- rozwiązanie było nieoczywiste i zajęło więcej niż chwilę
- błąd wynika z konfliktu wersji pakietów
- jest to zachowanie odbiegające od oficjalnej dokumentacji
- może się powtórzyć przy kolejnych etapach lub sesjach

## Mobile-first

Strona projektowana i kodowana w podejściu **mobile-first** — bezpośredni wpływ na SEO (Google indeksuje wersję mobilną jako główną).

### Zasada ogólna

Styl bazowy = mobile. Breakpointy Tailwinda rozszerzają go na większe ekrany. Nigdy odwrotnie.

```html
<!-- ✅ poprawnie: mobile base, desktop override -->
<p class="text-base md:text-lg lg:text-xl">...</p>
<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">...</ul>

<!-- ❌ niepoprawnie: desktop base, mobile override -->
<p class="text-xl max-sm:text-base">...</p>
```

### Breakpointy (domyślne Tailwind)

| Breakpoint | Szerokość | Cel |
|------------|-----------|-----|
| *(brak)*   | 0–639px   | Telefony — baza projektu |
| `sm:`      | 640px+    | Duże telefony / małe tablety |
| `md:`      | 768px+    | Tablety |
| `lg:`      | 1024px+   | Laptopy / desktop |
| `xl:`      | 1280px+   | Szerokie monitory |

Docelowe urządzenie priorytetowe: **standardowy telefon ~390px** (iPhone 14, Pixel 8). Desktop minimum 1280px.

### Typografia — skalowanie między mobile a desktop

Zawsze skalować rozmiary nagłówków i kluczowych tekstów:

```html
<h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">...</h1>
<h2 class="text-xl sm:text-2xl lg:text-3xl">...</h2>
<p class="text-base lg:text-lg">...</p>
```

Nie używać stałych rozmiarów dla nagłówków bez responsywnych odpowiedników.

### Układy — różne kolumny na różnych ekranach

Każdy układ siatkowy musi mieć wariant mobilny (1 kolumna) i desktopowy:

```html
<!-- Siatka kart (np. portfolio, usługi) -->
<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

<!-- Layout dwukolumnowy (np. O mnie) -->
<div class="grid grid-cols-1 lg:grid-cols-3">

<!-- Flex — pionowo na mobile, poziomo na desktop -->
<div class="flex flex-col sm:flex-row">
```

### Elementy interaktywne — standard Apple/Google (44×44px)

Każdy element klikalny (przycisk, link, toggle) musi mieć minimalny obszar dotyku 44×44px:

- Przyciski: `min-h-[44px] px-4` lub `h-11` (44px = `h-11` w Tailwindzie)
- Linki nawigacyjne: dodawać `py-3` na mobile jeśli są w liście
- Ikony-przyciski: opakować w `div` lub `button` z `h-11 w-11`
- Przełączniki (dark mode, hamburger): minimum `h-9 w-9` — sprawdzać czy wystarczy w kontekście

### Kolejność treści w HTML a SEO

Kolejność elementów w HTML = kolejność odczytu przez Google i czytniki ekranowe. Zasady:

- Najważniejsza treść strony zawsze **wyżej w HTML** — niezależnie od tego gdzie pojawia się wizualnie
- Nagłówek `<h1>` zawsze przed resztą treści strony
- Na mobile układ pionowy musi być logiczny bez CSS (sprawdzać przez DevTools → Responsive)
- Nie używać `order-` w Flexbox/Grid do odwracania kolejności ważnych treści — to myli Google

### Checklist mobile przed każdym commitem

Przed każdym nowym komponentem lub stroną sprawdzić:
- [ ] Style bazowe działają na 390px bez poziomego scrolla
- [ ] Nagłówki mają responsywne rozmiary (`text-Xpx sm:text-Ypx`)
- [ ] Siatki mają wariant 1-kolumnowy na mobile
- [ ] Elementy interaktywne mają min. 44px obszaru dotyku
- [ ] Kolejność HTML jest logiczna bez CSS

## Ważne zasady pracy

- Zawsze pisać **czysty, semantyczny HTML** (odpowiednie tagi: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
- Zachować przyjazną pod SEO hierarchie nagłówków `<h1>`-`<h6>`
- Dostępność (a11y): atrybuty `alt`, `aria-label` tam gdzie potrzebne
- Responsywność: **mobile-first** — style bazowe dla mobile, breakpointy rozszerzają na desktop
- Nie dodawać niepotrzebnych zależności — jeśli można zrobić w czystym Astro/Tailwind, robimy tak
- Nie implementować funkcji nieplanowanych w bieżącym etapie
- Kod pisać po angielsku (nazwy zmiennych, komponentów), treści i komentarze po polsku
