# Roadmap

Rough order, easiest/highest-value first. None of these require restructuring —
the architecture was set up to absorb them.

## Near term

- **Real brand assets.** Loka font via `@font-face`, real Loka logo SVG in the
  centered-logo template. This is the biggest fidelity jump vs. the samples.
- **Save / resume drafts (Level 1).** Wire `storage/index.js` into the editor:
  autosave the current state, add a "My drafts" strip to the gallery that
  reopens a saved cover. Same-browser only; no backend. The seam is already in
  place.
- **Third template: Diagram field.** The node-mesh / circle-sweep / flow
  backgrounds from the original samples — generated geometry + optional small
  title. New folder + one registry line.

## Medium term

- **Focal point for photos.** Click-to-set crop focus so off-center photos
  don't lose their subject to center-crop. Biggest quality lever for arbitrary
  uploads.
- **More layouts / split compositions.** Photo on one side, title on the other.
- **Preset accents / more frame colors.** Currently five swatches.
- **Export options.** JPG vs PNG, 2× resolution, other aspect ratios
  (LinkedIn, OG image sizes).

## Longer term (needs a backend — would justify Next.js or a separate API)

- **Cross-device saving (Level 2).** Accounts; drafts follow you anywhere.
  Reimplement `storage/index.js` against an API. Real file storage for uploaded
  photos instead of base64.
- **Shared team library (Level 3).** Approved covers, shared drafts, roles.
- **Brand-locked mode.** Restrict which controls users can change so covers
  stay on-rails for non-designers.

## Known rough edges to revisit

- `mix-blend-mode` on the grain shader: verify it exports identically across
  browsers; if not, composite grain onto the image via canvas at export time.
- Centered-logo text wordmark renders typed casing with wide letter-spacing —
  fine as placeholder, but real usage wants uploaded logo art.
- DotWave runs a continuous rAF loop; consider pausing when the tab is hidden.
