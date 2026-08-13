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

export const TEMPLATES = [
  {
    id: "photo-hero",
    name: "Photo hero",
    Renderer: PhotoHeroCover,
    fields: photoHero.fields,
    defaults: photoHero.defaults,
    preview: photoHero.preview,
  },
  {
    id: "centered-logo",
    name: "Centered logo",
    Renderer: CenteredLogoCover,
    fields: centeredLogo.fields,
    defaults: centeredLogo.defaults,
    preview: centeredLogo.preview,
  },
  {
    id: "network-graph",
    name: "Network graph",
    Renderer: NetworkGraphCover,
    fields: networkGraph.fields,
    defaults: networkGraph.defaults,
    preview: networkGraph.preview,
  },
  {
    id: "glow-title",
    name: "Glow title",
    Renderer: GlowTitleCover,
    fields: glowTitle.fields,
    defaults: glowTitle.defaults,
    preview: glowTitle.preview,
  },
];
