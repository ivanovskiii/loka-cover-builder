import { TOKENS, COVER_W, COVER_H } from "../../theme.js";
import { findGraphic } from "../../data/iconLookup.js";
import { GRAPHICS } from "../../data/graphics.js";

// Two overlapping "badge" circles, each ringed with cardinal markers and
// holding a centered icon — a Venn-style pairing motif.
const R = 180;
const GAP = 130; // half-distance between the two circle centers

function markers(cx, cy) {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i;
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  });
}

export function IconDuoCover({ state, innerRef }) {
  const { mode, graphicId, accent } = state;
  const isLight = mode === "light";
  const framePad = 14;
  const ink = isLight ? TOKENS.navy : "#FFFFFF";
  const lineColor = isLight ? "rgba(10,26,47,0.4)" : "rgba(255,255,255,0.4)";
  // The frame accent swatches (navy/off-white) are too low-contrast for
  // small markers on a dark field, so the markers use a fixed brand blue
  // instead of following `accent` (which is reserved for the frame border).
  const markerColor = TOKENS.blue;
  const graphic = findGraphic(graphicId) || GRAPHICS[0];
  const cy = COVER_H / 2;
  const cx1 = COVER_W / 2 - GAP;
  const cx2 = COVER_W / 2 + GAP;

  const badge = (cx) => (
    <>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={lineColor} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={R * 0.58} fill="none" stroke={lineColor} strokeWidth="1" />
      {markers(cx, cy).map((m, i) => (
        <rect key={i} x={m.x - 4} y={m.y - 4} width="8" height="8" fill={markerColor} />
      ))}
    </>
  );

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: isLight ? TOKENS.light : TOKENS.black, overflow: "hidden", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: isLight
        ? "radial-gradient(circle at 50% 50%, rgba(27,79,232,0.1) 0%, transparent 60%)"
        : "radial-gradient(circle at 50% 50%, rgba(27,79,232,0.22) 0%, transparent 60%)" }} />

      <svg width={COVER_W} height={COVER_H} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {badge(cx1)}
        {badge(cx2)}
      </svg>

      <div style={{ position: "absolute", left: cx1 - 32, top: cy - 32, width: 64, height: 64, zIndex: 2, color: ink }} dangerouslySetInnerHTML={{ __html: graphic.svg }} />
      <div style={{ position: "absolute", left: cx2 - 32, top: cy - 32, width: 64, height: 64, zIndex: 2, color: ink }} dangerouslySetInnerHTML={{ __html: graphic.svg }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />
    </div>
  );
}
