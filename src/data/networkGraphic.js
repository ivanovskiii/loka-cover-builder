// The "network / node graph" decorative illustration from the Figma cover
// design — a cluster of connected nodes with two spotlight panels behind
// parts of the graph. Sourced as exact path/rect geometry from Figma
// (viewBox 0 0 1515 650) so it can be recolored per mode instead of baking
// in fixed colors like a flat exported asset would.
const NATIVE_W = 1515;
const NATIVE_H = 650;

const LINE_PATH =
  "M550 510L22.5 607.5L197.5 145L890 232.5M22.5 607.5L280 415M197.5 145L280 415M197.5 145L550 510M280 415L550 510M890 232.5L1230 52.5L1495 240L1235 602.5L550 510M550 510L802.5 415M890 232.5L802.5 415M890 232.5L1235 602.5M890 232.5L1060 327.5M1230 52.5L1235 602.5M1230 52.5L1060 327.5M1495 240L1060 327.5M1235 602.5L802.5 415M1235 602.5L1060 327.5M802.5 415L1060 327.5";

const NODES = [
  [177.5, 127.5], [262.5, 397.5], [2.5, 582.5], [1217.5, 582.5], [522.5, 487.5],
  [782.5, 397.5], [872.5, 212.5], [1042.5, 307.5], [1217.5, 32.5], [1472.5, 212.5],
];

const PANELS = [
  { x: 0, y: 325, w: 540, h: 325 },
  { x: 755, y: 0, w: 760, h: 540 },
];

export function networkGraphicSvg({ lineColor, panelFill, panelStroke }) {
  const nodes = NODES.map(
    ([x, y]) => `<rect x="${x}" y="${y}" width="35" height="35" fill="${lineColor}" stroke="${lineColor}" stroke-width="5"/>`
  ).join("");
  const panels = PANELS.map(
    (p) =>
      `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="${panelFill}"/>` +
      `<rect x="${p.x + 1.25}" y="${p.y + 1.25}" width="${p.w - 2.5}" height="${p.h - 2.5}" fill="none" stroke="${panelStroke}" stroke-width="2.5"/>`
  ).join("");
  return `<svg preserveAspectRatio="none" viewBox="0 0 ${NATIVE_W} ${NATIVE_H}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${LINE_PATH}" stroke="${lineColor}" stroke-width="5"/>
    ${nodes}
    ${panels}
  </svg>`;
}

export const NETWORK_NATIVE_W = NATIVE_W;
export const NETWORK_NATIVE_H = NATIVE_H;
