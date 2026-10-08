# Developer guide

Everything you need to work on the CowCatcherAI website. For what the project *is*, see [README.md](README.md).

---

## Stack

| | |
|---|---|
| Framework | [SvelteKit 2](https://kit.svelte.dev) with Svelte 5 runes |
| Adapter | `@sveltejs/adapter-static` — fully prerendered, no server at runtime |
| i18n | [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) (10 locales) |
| Markdown | [mdsvex](https://mdsvex.pngwn.io) — configured, `.svx` pages are allowed |
| Styling | Plain CSS with design tokens in `src/app.css`. No framework |
| Hosting | GitHub Pages, deployed by `.github/workflows/deploy.yml` on push to `main` |

---

## Getting started

Requires Node 20+.

```bash
git clone https://github.com/JacobsFarm/website.git
cd website
npm install
npm run dev
```

The dev server runs on [localhost:5173](http://localhost:5173). To reach it from a phone on the same network:

```bash
npm run dev -- --host
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Merge messages, then start the dev server |
| `npm run build` | Merge messages, generate the sitemap, build to `build/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | `svelte-check` — type and template errors |
| `npm run lint` | Prettier + ESLint |
| `npm run format` | Rewrite files with Prettier |
| `npm run sitemap` | Regenerate `static/sitemap.xml` on its own |

Run `npm run check` before opening a PR.

---

## Project structure

```
src/
├── routes/                        Pages — the folder name is the URL
│   ├── +layout.svelte             Navbar, Footer, language modal, skip link
│   ├── +error.svelte              404 / error page
│   ├── +layout.ts                 prerender = true, trailingSlash = 'always'
│   ├── +page.svelte               Home
│   ├── about-us/
│   ├── installation/
│   │   ├── download/              Windows / macOS / docker subpages
│   │   ├── hardware/
│   │   └── options/               Config reference (data-driven)
│   └── projects/                  cowcatcher / calvingcatcher / ai-detector
├── lib/
│   ├── components/                Reusable components (see below)
│   ├── components/hero/           The animated barn camera + phone on the homepage
│   ├── actions/reveal.js          Scroll-reveal animation action
│   ├── utils/text.js              Helpers to reuse existing translations cleanly
│   ├── config/
│   │   ├── languages.js           The 10 locales — single source of truth
│   │   ├── projects.js            The 3 projects — used by home, navbar and footer
│   │   ├── links.js               External links (GitHub, Telegram, Hugging Face, …)
│   │   └── videos.js              Explainer video per language (Dutch vs. the rest)
│   └── assets/                    Images, imported so Vite fingerprints them
├── app.css                        Design tokens + global utility classes
└── app.html                       HTML shell, font preconnect

messages/<locale>/*.json           Translation sources (edit these)
merge-messages.js                  Bundles them into one file per locale
generate-sitemap.js                Writes static/sitemap.xml from the routes
```

---

## Conventions

### Svelte 5 only

Everything uses runes. No `export let`, no `$:`, no `on:click`.

```svelte
<script>
  let { title = '', items = [] } = $props();
  let index = $state(0);
  let current = $derived(items[index]);
</script>

<button onclick={() => index++}>…</button>
```

### Styling goes through the design system

`src/app.css` holds the tokens and the shared utility classes. Reach for those before writing new CSS.

```css
--primary  --accent-amber  --accent-teal  --text-main  --text-muted
--bg-color  --bg-sunken  --card-bg  --surface-tint  --primary-soft  --amber-soft
--forest  --on-dark  --on-dark-muted  --line  --line-strong  --line-dark
--radius-sm  --radius  --radius-lg  --radius-xl  --radius-pill
--shadow-sm  --shadow-md  --shadow-lg  --ease-out  --ease-spring
--font-heading  --font-body  --font-mono
```

Global classes worth knowing: `.container`, `.section`, `.section-head`, `.eyebrow`, `.h-display`, `.h-section`, `.lead`, `.bezel` / `.bezel__inner`, `.surface`, `.chip`, `.prose` (install guides), `.setup-steps`, `.check-list`, `.note`, `.tip-box`, `.table-container`, and the `.btn` family (`.btn--solid`, `.btn--ghost`, `.btn--amber`, `.btn--ink`, `.btn--light`, `.btn--ghost-dark`, `.btn--sm`, `.btn--lg`, `.btn--block`). A trailing arrow goes in its own circle: `<span class="btn__icon"><Icon name="arrow-right" /></span>`.

Icons come from `Icon.svelte` (one line set, same stroke everywhere) — add a new `name` there rather than pasting SVGs into pages.

**Never hard-code a colour.** If a value isn't in the tokens, add it there.

### Animation must be optional

Scroll reveals come from the `reveal` action:

```svelte
<section use:reveal>…</section>                        <!-- this element -->
<div class="card-grid" use:reveal={{ stagger: 100 }}>   <!-- children, in sequence -->
```

It sets its classes from JavaScript only, so content stays visible without JS, skips anything already on screen at load, and returns early under `prefers-reduced-motion`. Any new animation must honour that media query too — there is a global rule in `app.css`, but component-level `transform` on `:hover` needs its own opt-out.

### Images that can be enlarged

Use `ZoomableImage` — it is a `<button>`, so keyboard and screen-reader users can reach it, and it opens its own lightbox (Escape or click to close):

```svelte
<ZoomableImage src={screenshot} alt="Add stream screen of the web interface" />
```

### The homepage animation

`components/hero/` draws the barn camera in SVG: `Cow` and `LyingCow` are the animals, `BarnScene` is the camera image with the AI box, `PhoneMock` is the Telegram message, and `HeroAnimation` runs the timeline (phases 0–5 per scene). It only plays while it is on screen, has a pause button, and shows the final frame without motion under `prefers-reduced-motion`. Its texts are in `messages/<locale>/site.json` (`home_anim_*`).

### The explainer video

Set the YouTube IDs in `src/lib/config/videos.js`: `nl` for Dutch visitors, `default` for every other language. The iframe (youtube-nocookie.com) is only inserted once the visitor scrolls near it.

---

## Components

| Component | Use it for |
|---|---|
| `PageHeader` | Top of every subpage: breadcrumbs, eyebrow, title, lead, optional `actions` / `aside` snippets |
| `Seo` | `<title>` and meta description for a page |
| `InstallProgress` | The 1-2-3 step bar on the installation pages |
| `DocLayout` | Install guide layout with a sticky table of contents |
| `InstallStep` | One numbered step in a guide (gets `id="step-N"` for the table of contents) |
| `InstallCommonSteps` | Steps 4–8, shared by the Windows and macOS guides |
| `DownloadCard` | "Download via GitHub Releases" card in the guide headers |
| `PagerNav` | Previous / next links at the bottom of a page |
| `ProjectDetail` | Full CowCatcher / CalvingCatcher page, driven by the message prefix |
| `HardwareSection` | Hardware category with option cards, "more info" and buy links |
| `Gallery` | Crossfading image carousel with arrows and dots |
| `ZoomableImage` | Image that opens in a lightbox |
| `VideoEmbed` | Lazy-loaded YouTube video, chosen per language |
| `FeaturedIn` | Press logo marquee |
| `RtspUrlFinder` | RTSP URL templates per camera brand, with copy buttons |
| `Navbar` / `Footer` / `Logo` / `LanguageSelect` / `LanguageModal` | Site chrome |
| `Icon` | All icons |

---

## Translations

Source files live in `messages/<locale>/<page>.json` as flat key/value pairs:

```json
{
  "hardware_title": "Hardware",
  "hardware_intro": "What you need before you start."
}
```

`merge-messages.js` combines them into `messages/<locale>.json`, which Paraglide compiles into `src/lib/paraglide/`. Both are generated — never edit them by hand.

### Adding a string

1. Add the key to `messages/en/<page>.json`
2. Add the same key to the other nine locales
3. Use it as `{m.my_key()}` in the component
4. `npm run dev` picks it up (it runs `merge-messages` first)

A key that is missing from a locale falls back to English, so a partial translation will not break the build — but `svelte-check` will not warn you either. Check the language switcher.

### Adding a locale

1. Copy an existing folder in `messages/` to the new ISO 639-1 code
2. Add the locale to `project.inlang/settings.json`
3. Add it to `src/lib/config/languages.js` (code, label, name, flag)
4. Add it to `TARGET_LANGS` in `split_messages.py` if you use that helper

Use real ISO 639-1 codes. Danish is `da`, not `dn`.

---

## Sitemap and robots

`generate-sitemap.js` runs as part of `npm run build`. It walks `src/routes`, writes `static/sitemap.xml`, and rewrites the `Sitemap:` line in `static/robots.txt`. Adding a page needs no manual step.

The public base URL defaults to the GitHub Pages address. Override it per build:

```bash
SITE_URL="https://cowcatcherai.com" npm run build
```

Moving to a custom domain means changing three things together, or links will break:

1. `SITE_URL` for the sitemap
2. `paths.base` in `svelte.config.js` — empty it, since the site would no longer sit under `/website`
3. A `CNAME` file in `static/` containing the domain

---

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `build/` to GitHub Pages. There is no staging environment — check locally with `npm run preview` before merging.

Because `paths.base` is `/website` in production but empty in development, **always build internal links with the `base` helper**:

```svelte
<script>
  import { base } from '$app/paths';
</script>

<a href="{base}/installation">…</a>
```

A link written as `/installation` works in dev and 404s in production. This is the most common mistake in this repo.

---

## Contributing

Issues and pull requests are welcome — [open an issue](https://github.com/JacobsFarm/website/issues) for bugs, wording, broken links or ideas.

**Fixing a translation** needs no local setup: edit the JSON file directly on GitHub and open a PR with the locale in the title, e.g. `nl: fix typo on hardware page`.

**Code changes:**

1. Branch off `main`
2. Make the change; keep it scoped to one thing
3. `npm run check` and `npm run lint`
4. Open a PR describing what changed and why

Two things reviewers will look for: internal links use `base`, and new colours come from the tokens rather than hex values.

---

## Known gaps

Worth picking up if you are looking for something to do:

- **All ten locales share one URL**, and only English is prerendered, so translated content is invisible to search engines and to the retrieval layer behind AI assistants
- **`<html lang>` is only corrected in the browser** — the prerendered HTML says `nl`, the layout sets the real locale after load
- **No JSON-LD** structured data
- **Press logos are hotlinked** from a third-party CDN and will break if it moves
- **mdsvex is configured but unused** — long documentation pages could be written as `.svx` Markdown instead of Svelte markup
