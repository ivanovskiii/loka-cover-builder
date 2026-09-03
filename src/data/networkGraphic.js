// The "network / node graph" decorative illustration from the Figma cover
// design — a cluster of connected nodes with two spotlight panels behind
// parts of the graph. Sourced as exact geometry from Figma (viewBox
// 0 0 1515 650) so it can be recolored per mode instead of baking in fixed
// colors like a flat exported asset would. Node/edge layout can also be
// regenerated from a seed so the graph isn't always identical.
const NATIVE_W = 1515;
const NATIVE_H = 650;
const NODE_SIZE = 35;

const PANELS = [
  { x: 0, y: 325, w: 540, h: 325 },
  { x: 755, y: 0, w: 760, h: 540 },
];

// Deterministic PRNG so a given seed always reproduces the same layout
// (needed for stable gallery thumbnails / exports).
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dist2(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function shuffle(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Builds a randomized node graph that always has an Euler circuit: a single
// connected component where every node has even degree (Euler's theorem).
// Achieved by laying a Hamiltonian cycle through every node — which alone
// gives everyone degree 2 and is itself a valid circuit — then optionally
// stitching extra cycles through random subsets of nodes on top. Any cycle
// adds exactly 2 to the degree of each node it touches, so degree parity
// (even) is preserved no matter how many extra cycles are layered in.
// Scatters nodes across a jittered grid (cell count sized to `count`, aspect
// matched to the canvas) instead of pure random placement — pure-random
// placement is prone to clumping several nodes into the same corner while
// leaving the rest of the canvas empty, which reads as visual clutter.
function scatterNodes(rand, count) {
  const margin = 40;
  const usableW = NATIVE_W - margin * 2 - NODE_SIZE;
  const usableH = NATIVE_H - margin * 2 - NODE_SIZE;

  const cols = Math.max(1, Math.round(Math.sqrt((count * usableW) / usableH)));
  const rows = Math.max(1, Math.ceil(count / cols));
  const cellW = usableW / cols;
  const cellH = usableH / rows;

  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
  const chosen = shuffle(cells, rand).slice(0, count);

  // Jitter within each cell (kept away from the cell edges) so the grid
  // origin doesn't itself look mechanical.
  return chosen.map(([c, r]) => [
    margin + c * cellW + cellW * 0.2 + rand() * cellW * 0.6,
    margin + r * cellH + cellH * 0.2 + rand() * cellH * 0.6,
  ]);
}

function buildGraph(seed, count) {
  const rand = mulberry32(seed);
  const nodes = scatterNodes(rand, count);

  const edges = [];
  const addCycle = (order) => {
    for (let i = 0; i < order.length; i++) {
      edges.push([order[i], order[(i + 1) % order.length]]);
    }
  };

  // Base Hamiltonian cycle — visits every node once, closes the loop.
  addCycle(shuffle(nodes.map((_, i) => i), rand));

  // A few extra cycles through random subsets, for a denser, more
  // "network-like" look, without ever breaking the even-degree property.
  if (count >= 5) {
    const extraCycles = 1 + Math.floor(rand() * 2); // 1-2 extra cycles
    for (let c = 0; c < extraCycles; c++) {
      const subsetSize = 3 + Math.floor(rand() * Math.min(3, count - 3)); // 3-5 nodes
      const subset = shuffle(nodes.map((_, i) => i), rand).slice(0, subsetSize);
      addCycle(subset);
    }
  }

  return { nodes, edges };
}

export function networkGraphicSvg({ lineColor, panelFill, panelStroke, seed = 1, nodeCount = 10, lineWidth = 5 }) {
  const { nodes, edges } = buildGraph(seed, nodeCount);
  const cx = ([x, y]) => [x + NODE_SIZE / 2, y + NODE_SIZE / 2];

  const lines = edges
    .map(([i, j]) => {
      const [x1, y1] = cx(nodes[i]);
      const [x2, y2] = cx(nodes[j]);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${lineColor}" stroke-width="${lineWidth}"/>`;
    })
    .join("");

  const nodeRects = nodes
    .map(([x, y]) => `<rect x="${x}" y="${y}" width="${NODE_SIZE}" height="${NODE_SIZE}" fill="${lineColor}" stroke="${lineColor}" stroke-width="${lineWidth}"/>`)
    .join("");

  const panels = PANELS.map(
    (p) =>
      `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="${panelFill}"/>` +
      `<rect x="${p.x + 1.25}" y="${p.y + 1.25}" width="${p.w - 2.5}" height="${p.h - 2.5}" fill="none" stroke="${panelStroke}" stroke-width="2.5"/>`
  ).join("");

  return `<svg preserveAspectRatio="none" viewBox="0 0 ${NATIVE_W} ${NATIVE_H}" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${lines}
    ${nodeRects}
    ${panels}
  </svg>`;
}

export const NETWORK_NATIVE_W = NATIVE_W;
export const NETWORK_NATIVE_H = NATIVE_H;
