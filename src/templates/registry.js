// The one place templates are registered. To add a new template:
//   1. make a folder under templates/ with renderer.jsx + fields.js
//   2. add one entry here.
// Nothing else in the app needs to change — gallery, editor, rail, and export
// all read from this list.

import { PhotoHeroCover } from "./PhotoHero/renderer.jsx";
import * as photoHero from "./PhotoHero/fields.js";

import { CenteredLogoCover } from "./CenteredLogo/renderer.jsx";
import * as centeredLogo from "./CenteredLogo/fields.js";

import { NetworkGraphCover } from "./NetworkGraph/renderer.jsx";
import * as networkGraph from "./NetworkGraph/fields.js";

import { GlowTitleCover } from "./GlowTitle/renderer.jsx";
import * as glowTitle from "./GlowTitle/fields.js";

import { SimpleTitleCover } from "./SimpleTitle/renderer.jsx";
import * as simpleTitle from "./SimpleTitle/fields.js";

import { SimpleLogoCover } from "./SimpleLogo/renderer.jsx";
import * as simpleLogo from "./SimpleLogo/fields.js";

import { PhotoLogoCover } from "./PhotoLogo/renderer.jsx";
import * as photoLogo from "./PhotoLogo/fields.js";

import { RingBloomCover } from "./RingBloom/renderer.jsx";
import * as ringBloom from "./RingBloom/fields.js";

import { HorizonGlowCover } from "./HorizonGlow/renderer.jsx";
import * as horizonGlow from "./HorizonGlow/fields.js";

import { RaysLogoCover } from "./RaysLogo/renderer.jsx";
import * as raysLogo from "./RaysLogo/fields.js";

import { IconDuoCover } from "./IconDuo/renderer.jsx";
import * as iconDuo from "./IconDuo/fields.js";

// Category display order mirrors the source Figma file's own sections
// ("Covers" board), so the gallery reads the same way the design file does.
export const CATEGORIES = [
  "Graphical",
  "Graphical + Logo",
  "Image / Image + Logo",
  "Logo",
  "Text Heavy",
  "Image + text",
];

export const TEMPLATES = [
  {
    id: "photo-hero",
    name: "Photo hero",
    category: "Image + text",
    Renderer: PhotoHeroCover,
    fields: photoHero.fields,
    defaults: photoHero.defaults,
    preview: photoHero.preview,
  },
  {
    id: "centered-logo",
    name: "Centered logo",
    category: "Logo",
    Renderer: CenteredLogoCover,
    fields: centeredLogo.fields,
    defaults: centeredLogo.defaults,
    preview: centeredLogo.preview,
  },
  {
    id: "network-graph",
    name: "Network graph",
    category: "Graphical",
    Renderer: NetworkGraphCover,
    fields: networkGraph.fields,
    defaults: networkGraph.defaults,
    preview: networkGraph.preview,
  },
  {
    id: "glow-title",
    name: "Glow title",
    category: "Text Heavy",
    Renderer: GlowTitleCover,
    fields: glowTitle.fields,
    defaults: glowTitle.defaults,
    preview: glowTitle.preview,
  },
  {
    id: "simple-title",
    name: "Simple title",
    category: "Text Heavy",
    Renderer: SimpleTitleCover,
    fields: simpleTitle.fields,
    defaults: simpleTitle.defaults,
    preview: simpleTitle.preview,
  },
  {
    id: "simple-logo",
    name: "Simple logo",
    category: "Logo",
    Renderer: SimpleLogoCover,
    fields: simpleLogo.fields,
    defaults: simpleLogo.defaults,
    preview: simpleLogo.preview,
  },
  {
    id: "photo-logo",
    name: "Photo + logo",
    category: "Image / Image + Logo",
    Renderer: PhotoLogoCover,
    fields: photoLogo.fields,
    defaults: photoLogo.defaults,
    preview: photoLogo.preview,
  },
  {
    id: "ring-bloom",
    name: "Ring bloom",
    category: "Graphical",
    Renderer: RingBloomCover,
    fields: ringBloom.fields,
    defaults: ringBloom.defaults,
    preview: ringBloom.preview,
  },
  {
    id: "horizon-glow",
    name: "Horizon glow",
    category: "Graphical",
    Renderer: HorizonGlowCover,
    fields: horizonGlow.fields,
    defaults: horizonGlow.defaults,
    preview: horizonGlow.preview,
  },
  {
    id: "rays-logo",
    name: "Rays + logo",
    category: "Graphical + Logo",
    Renderer: RaysLogoCover,
    fields: raysLogo.fields,
    defaults: raysLogo.defaults,
    preview: raysLogo.preview,
  },
  {
    id: "icon-duo",
    name: "Icon duo",
    category: "Graphical + Logo",
    Renderer: IconDuoCover,
    fields: iconDuo.fields,
    defaults: iconDuo.defaults,
    preview: iconDuo.preview,
  },
];
