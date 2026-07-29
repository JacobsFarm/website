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
│   ├── +layout.svelte             Navbar, Footer, Lightbox, language modal
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
│   ├── actions/reveal.js          Scroll-reveal animation action
│   ├── stores/lightbox.svelte.js  Lightbox state ($state rune)
│   ├── config/
│   │   ├── languages.js           The 10 locales — single source of truth
│   │   └── projects.js            The 3 projects — used by home and navbar
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
--bg-color  --card-bg  --border-soft  --surface-tint
--radius  --radius-sm  --font-heading  --font-body
```

Global classes worth knowing: `.page-container`, `.card-grid`, `.info-section`, `.custom-card`, `.doc-page`, `.doc-section`, `.project-page`, `.official-links`, and the `.btn` family (`.btn--solid`, `.btn--outline`, `.btn--amber`, `.btn--ink`, `.btn--lg`, `.btn--block`).

**Never hard-code a colour.** If a value isn't in the tokens, add it there.

### Animation must be optional

Scroll reveals come from the `reveal` action:

```svelte
<section use:reveal>…</section>                        <!-- this element -->
<div class="card-grid" use:reveal={{ stagger: 100 }}>   <!-- children, in sequence -->
<div class="project-page" use:reveal={{ each: true }}>  <!-- each child on its own trigger -->
```

It sets its classes from JavaScript only, so content stays visible without JS, and it returns early under `prefers-reduced-motion`. Any new animation must honour that media query too — there is a global rule in `app.css`, but component-level `transform` on `:hover` needs its own opt-out.

### Images that can be enlarged

Use a `<button>`, never a clickable `<div>`, so keyboard and screen-reader users can reach it:

```svelte
<script>
  import { openLightbox } from '$lib/stores/lightbox.svelte.js';
</script>

<button class="zoomable" onclick={() => openLightbox(src, alt)} aria-label="Enlarge …">
  <img {src} {alt} />
</button>
```

The `<Lightbox />` itself lives once in `+layout.svelte`.

---

## Components

| Component | Use it for |
|---|---|
| `ProjectHero` | Hero header on a project page (logo, title, subtitle) |
| `InfoWithImage` | Text beside an image carousel — crossfade, arrows, dots, click to zoom |
| `HighlightBlock` | Callout block; pass `size="large"` and `actions` for a CTA |
| `FeatureCard` | Small feature tile in a grid |
| `ProjectCard` | Linked card with logo, used on home and download pages |
| `MediaCard` | Base layout for `MediaCardPicture` and `MediaCardGif` |
| `CarouselDots` | Dot navigation — shared by every carousel |
| `HardwareSection` | Hardware option list with accordion and buy links |
| `Lightbox` | Full-screen image viewer (mounted once in the layout) |
| `FeaturedIn` | Press logo carousel |

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

- **No per-page `<title>` or meta description** on most routes — only `about-us` sets one
- **All ten locales share one URL**, and only English is prerendered, so translated content is invisible to search engines and to the retrieval layer behind AI assistants
- **`<html lang>` is hard-coded** in `app.html` and does not follow the selected locale
- **No JSON-LD** structured data
- **No favicon**
- **Press logos are hotlinked** from a third-party CDN and will break if it moves
- **mdsvex is configured but unused** — long documentation pages could be written as `.svx` Markdown instead of Svelte markup
