# Loka Cover Builder

A self-serve tool for generating on-brand blog cover images. Pick a template,
edit it, export a 2000×1000 PNG.

## Run it

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. `npm run build` produces static files in `dist/`
you can host anywhere (Vercel, Netlify, S3, an internal server).

## How it's structured

```
src/
  main.jsx                 entry point
  App.jsx                  view switch: gallery ↔ editor
  theme.js                 ALL design tokens (colors, dimensions, layouts)

  hooks/
    useNoiseTile.js        generates the grain noise texture
    useCoverExport.js      DOM node → PNG download

  components/
    Atmosphere.jsx         dark shell + dot wave + shared hover/animation CSS
    DotWave.jsx            animated canvas dot-grid background
    PlaceholderBackground.jsx   no-photo cover backdrop
    ScaledCover.jsx        renders a cover scaled to fill any box
    ui/index.jsx           Toggle, Segmented, Swatches, panel/input styles

  templates/
    registry.js            ← the one place to register templates
    PhotoHero/
      renderer.jsx         how this cover draws
      fields.js            which controls it exposes + default/preview state
    CenteredLogo/
      renderer.jsx
      fields.js

  gallery/Gallery.jsx      template picker grid
  editor/
    Editor.jsx             orb rail + panel + preview + export
    sections.jsx           rail icons + field→section grouping
    SectionBody.jsx        renders controls based on a template's fields

  storage/index.js         persistence seam (localStorage today; see below)

  assets/                  real image files (demo photo, etc.)
```

## Adding a new template

1. Make a folder under `src/templates/`, e.g. `DiagramField/`.
2. Add `renderer.jsx` (a component taking `{ state, innerRef, noiseUrl }`) and
   `fields.js` (exporting `fields`, `defaults`, `preview`).
3. Add one entry to `src/templates/registry.js`.

That's it — the gallery, editor rail, controls, and export all adapt from the
registry. The `fields` array controls which editor sections and controls appear.

Available field keys: `layout`, `title`, `textColor`, `photo`, `grain`,
`elements`, `logo`, `caption`, `mode`, `accent`.

## Saving / resume (not built yet)

`src/storage/index.js` is the seam for it. It exposes `listCovers`,
`saveCover`, `loadCover`, `deleteCover`, backed by `localStorage` (same-browser
drafts). To add cross-device saving later, reimplement those four functions
against an API — nothing else in the app calls storage directly, so that's the
only file that changes. See ROADMAP.md.
```
# loka-cover-builder
