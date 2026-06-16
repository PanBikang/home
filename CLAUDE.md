# CLAUDE.md

Project-specific guidance for Claude Code when working in this repo.

## What this is

Pan Bikang's (潘比康) personal academic homepage, served at
**`https://panbikang.github.io/home/`**. A single-page static site built with
**Astro 5**. There is no backend, no CMS — every change is built locally and
pushed to `main`, where GitHub Pages serves the built output.

The site was ported from the `boyugou.github.io` Astro template and restyled
with Pan Bikang's content (Embodied AI / world action models / RL
post-training focus).

## Hard constraints (do not violate)

- **No GitHub Actions / no remote build.** The deploy is always
  `npm run build` locally → commit `docs/` → push. If you find yourself
  reaching for `.github/workflows/*`, stop.
- **Deploy via `main` branch, `/docs` folder.** Do not change the output
  directory in `astro.config.mjs` (`outDir: './docs'`) unless the user
  explicitly wants to switch deploy strategies.
- **Deploy sub-path is `/home/`.** `astro.config.mjs` sets `base: '/home'`.
  Static asset path strings (avatar, favicon from YAML) must be prefixed
  with the base path manually — see the note in `Base.astro` /
  `Sidebar.astro`. Do not remove the `withBase()` helper, or images break
  under the sub-path deploy.
- **Single page only.** Everything visible on one scrollable page. Do not
  add a router, sub-pages, or `[slug].astro` routes.
- **No CV.** The user does not want a CV link or PDF. Do not add a `cv` /
  `cv_link` field or stage a placeholder PDF.
- **English everywhere.** All code, comments, commit messages, and docs are
  English unless explicitly told otherwise — even when the user writes in
  Chinese.

## Repo layout

```
src/
  data/                  ← Edit YAML to update content (see below)
  components/            Sidebar.astro, Publication.astro, SectionHead.astro
  layouts/Base.astro     <head>, font / icon CDN links, theme toggle, global CSS import
  pages/index.astro      The single page; orchestrates all sections
  styles/global.css      All styles, plain CSS, design-token-driven (--bg, --text, --accent, ...)
public/                  Copied verbatim into the build root
  .nojekyll              Tells GitHub Pages not to run Jekyll on /docs
  assets/img/            Profile picture (panbk.jpg, avatar.jpg) + favicon.svg
docs/                    Build output, committed to main, served by GH Pages
astro.config.mjs         outDir: './docs', base: '/home', @rollup/plugin-yaml so .yml imports work
```

## Legacy files (to be cleaned up after the new site is live)

The old static-HTML site is still in the repo for reference:
`index.html` (root), `assets/` (css/js/sass/webfonts), `images/`,
`googleddb794b9571afaf0.html`, `LICENSE.txt`, `README.txt`. Once the new
Astro build is confirmed serving correctly from `/docs`, those can be
deleted.

## Content data files (`src/data/*.yml`)

All content the user is likely to edit lives here. HTML is allowed in
string fields (rendered with `set:html`).

| File | Used in section | Notes |
|---|---|---|
| `site.yml` | Sidebar + `<head>` | name, position, email, social icons; `contact.enabled: false` hides the collab callout |
| `bio.yml` | About | array of paragraphs (HTML strings) |
| `news.yml` | News | newest first; each item has `date`, `html`, optional `tags` (`tone: accept` = green, `tone: oral` = red) |
| `publications.yml` | Selected Publications | newest first; fields: title, authors (HTML, wrap name in `<strong>`), venue, year, pdf, code, page, optional `highlights[]` (amber chips) |
| `projects.yml` | Projects | optional `repo: "owner/name"` adds a live ★ count fetched at runtime |
| `services.yml` | Honors & Services | label + html rows |
| `education.yml` | Education | institution, country, degree, period |
| `teaching.yml` | Teaching | optional `intro`, then `courses[]` |

### Publications note (no teaser images)

Unlike the upstream template, this site does **not** use per-paper teaser
images. `Publication.astro` renders a **venue-badge column** (venue + year)
instead of a 150px image. So `publications.yml` has no `image:` field —
just `venue` and `year`. If you ever want images back, restore the `<img>`
in `Publication.astro` and the `.pub` grid column from the upstream repo.

## Build & deploy commands

```bash
npm install         # first time only
npm run dev         # http://localhost:4321 with hot reload
npm run build       # writes ./docs (committed)
git add -A && git commit -m "..." && git push
```

The user runs the deploy themselves. Don't auto-commit or auto-push without
explicit instruction.

### Environment note: npm `omit` config

The user's global npm config has `omit = dev`, so `devDependencies` are
NOT installed by `npm install`. That's why `@rollup/plugin-yaml` is in
**`dependencies`** (not `devDependencies`) in `package.json` — if you move
it back, the build breaks with "Cannot find module '@rollup/plugin-yaml'".

### One-time GitHub Pages setting

After the first deploy, switch the Pages source so it serves the built
`/docs` folder instead of the old Jekyll `gh-pages` branch:

> Repo Settings → Pages →
> **Source:** Deploy from a branch
> **Branch:** `main` / **Folder:** `/docs`

The `.nojekyll` file inside `docs/` tells Pages to skip Jekyll processing
and serve the files as-is.

## Star count fetching

`src/pages/index.astro` includes an inline `<script is:inline>` that
queries `https://api.github.com/repos/{owner}/{name}` at page load for
each project with a `repo:` field. It silently removes the badge on
failure (rate limit, network). Don't replace this with shields.io without
a reason.

## Theme switching

Light/dark toggle in the top-right (`Base.astro`). An inline script in
`<head>` applies the stored / system theme before paint (no FOUC). The
toggle persists to `localStorage` and follows system preference when no
choice is stored. All colors are CSS variables under `:root` and
`:root[data-theme="dark"]` in `global.css`.

## Style philosophy

"Modern Minimal" — Vercel/Linear-adjacent. Off-white bg, Inter for body +
JetBrains Mono for accents/dates + Newsreader serif for bio, single accent
indigo `#4f46e5`. Spacing follows a soft grid. When tweaking styles,
preserve these decisions unless the user specifically wants a redirection.
CSS variables at the top of `global.css` are the single source of truth.

## When making changes

- For content edits: just touch `src/data/*.yml` and rebuild. No need to
  touch components.
- For visual changes: edit `src/styles/global.css`. CSS variables at the
  top of that file are the single source of truth for colors and spacing.
- For new sections: add a YAML data file under `src/data/`, render it in
  `src/pages/index.astro` between existing `<section>` blocks, style in
  `global.css`. Avoid one-off `<style>` blocks inside components.
- After any change, run `npm run build` and verify `docs/index.html`
  looks right (e.g., grep for the changed string) before reporting done.
  Don't assume the build will work — verify.
