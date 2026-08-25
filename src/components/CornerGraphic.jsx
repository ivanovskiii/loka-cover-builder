import { findGraphic } from "../data/iconLookup.js";

// Native size of every GRAPHICS/LOGOS entry's outer <svg> (see data/graphics.js, data/logos.js).
const NATIVE_SIZE = 64;

// One of the design system's isometric spot illustrations (or a company
// logo), pinned to a corner of the cover. Scaled up via CSS transform since
// the source SVGs carry fixed width/height attributes.
export function CornerGraphic({ graphicId, color, size = 128, inset = 44 }) {
  const graphic = findGraphic(graphicId);
  if (!graphic) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: inset,
        left: inset,
        width: NATIVE_SIZE,
        height: NATIVE_SIZE,
        transform: `scale(${size / NATIVE_SIZE})`,
        transformOrigin: "top left",
        color,
        zIndex: 3,
        pointerEvents: "none",
      }}
      dangerouslySetInnerHTML={{ __html: graphic.svg }}
    />
  );
}
