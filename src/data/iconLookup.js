import { GRAPHICS } from "./graphics.js";
import { LOGOS } from "./logos.js";

// Graphic pickers store just a label; this resolves it against both the
// isometric illustration set and the company-logo set so callers don't need
// to know which pool a given id came from.
export function findGraphic(graphicId) {
  return GRAPHICS.find((g) => g.label === graphicId) || LOGOS.find((g) => g.label === graphicId);
}
