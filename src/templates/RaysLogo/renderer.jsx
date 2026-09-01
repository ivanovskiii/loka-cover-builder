import { TOKENS, COVER_W, COVER_H } from "../../theme.js";
import { findGraphic } from "../../data/iconLookup.js";

// Rays converge from a scattered cluster on the left into a centered logo,
// then diverge back out to a scattered cluster on the right — a "signal
// in, signal out" motif with the logo as the hinge.
const LEFT_POINTS = [
  [-520, -40], [-500, 20], [-470, 60], [-450, -70], [-430, 10],
];
const RIGHT_POINTS = [
  [430, -150], [470, -90], [500, -30], [520, 40], [500, 100], [460, 150], [420, 90],
];

export function RaysLogoCover({ state, innerRef }) {
  const { mode, logoText, graphicId, accent, userImage } = state;
  const isLight = mode === "light";
  const framePad = 14;
  const ink = isLight ? TOKENS.navy : "#FFFFFF";
  const leftColor = isLight ? "rgba(10,26,47,0.35)" : "rgba(255,255,255,0.35)";
  // Fixed brand blue for the "signal" side — the frame accent swatches
  // (navy/off-white) are reserved for the border and too low-contrast here.
  const rightColor = TOKENS.blue;
  const cx = COVER_W / 2;
  const cy = COVER_H / 2;
  const graphic = graphicId ? findGraphic(graphicId) : null;

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: isLight ? TOKENS.light : TOKENS.black, overflow: "hidden", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: isLight
        ? "radial-gradient(circle at 50% 50%, rgba(27,79,232,0.12) 0%, transparent 60%)"
        : "radial-gradient(circle at 50% 50%, rgba(27,79,232,0.28) 0%, transparent 60%)" }} />

      <svg width={COVER_W} height={COVER_H} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {LEFT_POINTS.map(([dx, dy], i) => (
          <line key={`l${i}`} x1={cx + dx} y1={cy + dy} x2={cx} y2={cy} stroke={leftColor} strokeWidth="1.5" />
        ))}
        {RIGHT_POINTS.map(([dx, dy], i) => (
          <line key={`r${i}`} x1={cx} y1={cy} x2={cx + dx} y2={cy + dy} stroke={rightColor} strokeOpacity="0.55" strokeWidth="1.5" />
        ))}
        {LEFT_POINTS.map(([dx, dy], i) => (
          <rect key={`ld${i}`} x={cx + dx - 6} y={cy + dy - 6} width="12" height="12" fill="none" stroke={leftColor} strokeWidth="1.5" transform={`rotate(45 ${cx + dx} ${cy + dy})`} />
        ))}
        {RIGHT_POINTS.map(([dx, dy], i) => (
          <rect key={`rd${i}`} x={cx + dx - 5} y={cy + dy - 5} width="10" height="10" fill={rightColor} />
        ))}
      </svg>

      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {userImage ? (
          <img src={userImage} alt="" crossOrigin="anonymous" style={{ maxWidth: "30%", maxHeight: "28%", objectFit: "contain" }} />
        ) : graphic ? (
          <div style={{ width: 110, height: 110, position: "relative" }}>
            <div style={{ width: 64, height: 64, color: ink, transform: "scale(1.72)", transformOrigin: "top left" }} dangerouslySetInnerHTML={{ __html: graphic.svg }} />
          </div>
        ) : (
          <div style={{ color: ink, fontSize: 72, fontWeight: 700, letterSpacing: "0.04em" }}>{logoText}</div>
        )}
      </div>
    </div>
  );
}
