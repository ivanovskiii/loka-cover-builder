import { PLACEHOLDER_MODES } from "../theme.js";

// The cover's no-photo backdrop: solid brand color with a faint dot grid, or
// a traditional ruled grid of lines, depending on `pattern`. `size` is the
// tile/cell size in px — pass one that evenly divides any element you want
// the pattern to line up with (e.g. a centered card's position and size),
// so the grid lines land exactly on its edges instead of cutting across it.
export function PlaceholderBackground({ mode, pattern = "dots", size }) {
  const preset = PLACEHOLDER_MODES[mode] || PLACEHOLDER_MODES.dark;
  const tile = size || (pattern === "grid" ? 80 : 34);
  const overlayStyle = pattern === "grid"
    ? {
        backgroundImage: `linear-gradient(${preset.dot} 1px, transparent 1px), linear-gradient(90deg, ${preset.dot} 1px, transparent 1px)`,
        backgroundSize: `${tile}px ${tile}px`,
      }
    : {
        backgroundImage: `radial-gradient(${preset.dot} 1.5px, transparent 1.5px)`,
        backgroundSize: `${tile}px ${tile}px`,
      };
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, background: preset.base }}>
      <div style={{ position: "absolute", inset: 0, ...overlayStyle }} />
    </div>
  );
}
