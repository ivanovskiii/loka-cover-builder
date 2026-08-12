import { GRAPHICS } from "../data/graphics.js";

// Native size of every GRAPHICS entry's outer <svg> (see data/graphics.js).
const NATIVE_SIZE = 64;

// One of the design system's isometric spot illustrations, pinned to a
// corner of the cover. Scaled up via CSS transform since the source SVGs
// carry fixed width/height attributes.
export function CornerGraphic({ graphicId, color, size = 128, inset = 44 }) {
  const graphic = GRAPHICS.find((g) => g.label === graphicId);
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
