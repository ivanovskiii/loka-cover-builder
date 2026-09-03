import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["mode", "pattern", "graph", "accent"];

// Clean state the editor opens with. A random seed here means each new
// cover starts with a different node graph instead of always the same one.
export const defaults = {
  mode: "dark",
  accent: TOKENS.navy,
  backgroundPattern: "dots",
  graphSeed: Math.floor(Math.random() * 1e9),
  nodeCount: 10,
  lineWidth: 5,
};

// Finished-looking state shown in the gallery thumbnail. Fixed seed so the
// thumbnail itself stays stable between renders.
export const preview = {
  mode: "dark",
  accent: TOKENS.navy,
  backgroundPattern: "dots",
  graphSeed: 1,
  nodeCount: 10,
  lineWidth: 5,
};
