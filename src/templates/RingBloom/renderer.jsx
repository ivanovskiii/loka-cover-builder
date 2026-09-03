import { TOKENS, COVER_W, COVER_H, SYS_FONT } from "../../theme.js";
import { PlaceholderBackground } from "../../components/PlaceholderBackground.jsx";

// Six overlapping circle outlines arranged in a ring (a flower-of-life
// petal), with one circle filled as a soft "moon" — a quiet decorative
// graphic-only cover.
const RADIUS = 92;
const FILLED_INDEX = 4; // which petal renders as a solid sphere

function petals(cx, cy) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return { x: cx + RADIUS * Math.cos(angle), y: cy + RADIUS * Math.sin(angle) };
  });
}

export function RingBloomCover({ state, innerRef }) {
  const { mode, accent, backgroundPattern } = state;
  const isLight = mode === "light";
  const framePad = 14;
  const lineColor = isLight ? "rgba(10,26,47,0.45)" : "rgba(255,255,255,0.55)";
  const cx = COVER_W / 2;
  const cy = COVER_H / 2;
  const circles = petals(cx, cy);

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: isLight ? TOKENS.light : TOKENS.black, overflow: "hidden", fontFamily: SYS_FONT }}>
      <PlaceholderBackground mode={mode} pattern={backgroundPattern} />

      <svg width={COVER_W} height={COVER_H} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <defs>
          <radialGradient id="ringBloomMoon" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={isLight ? "#c9d3f2" : "#8fa4c9"} />
            <stop offset="100%" stopColor={isLight ? "#7d8fc2" : "#2c3c5c"} />
          </radialGradient>
        </defs>
        {circles.map((p, i) =>
          i === FILLED_INDEX ? (
            <circle key={i} cx={p.x} cy={p.y} r={RADIUS} fill="url(#ringBloomMoon)" stroke={lineColor} strokeWidth="1.5" />
          ) : (
            <circle key={i} cx={p.x} cy={p.y} r={RADIUS} fill="none" stroke={lineColor} strokeWidth="1.5" />
          )
        )}
      </svg>

      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />
    </div>
  );
}
