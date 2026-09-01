import { TOKENS, COVER_W, COVER_H } from "../../theme.js";
import { GLOW_BLUE } from "../../data/glowPalettes.js";

// A minimal "horizon" mark — a line with a node at each end and one at
// center — floating on the same feathered radial glow as Glow title, but
// with no card and no text. Purely atmospheric.
export function HorizonGlowCover({ state, innerRef }) {
  const { accent } = state;
  const framePad = 14;
  const glowX = state.glowX ?? 50;
  const glowY = state.glowY ?? 20;
  const stopPositions = [0, 10, 22, 36, 50, 64, 76, 86, 94, 100];
  const stops = GLOW_BLUE.map((c, i) => `${c} ${stopPositions[i]}%`).join(", ");

  const lineY = COVER_H * 0.5;
  const lineW = 520;
  const cx = COVER_W / 2;
  const x1 = cx - lineW / 2;
  const x2 = cx + lineW / 2;

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: TOKENS.cardDark, overflow: "hidden", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      <div
        style={{
          position: "absolute", inset: -140, zIndex: 0,
          background: `radial-gradient(circle farthest-side at ${glowX}% ${glowY}%, ${stops})`,
          filter: "blur(70px)",
        }}
      />

      <svg width={COVER_W} height={COVER_H} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <path d={`M ${x1} ${lineY} Q ${cx} ${lineY + 34}, ${x2} ${lineY}`} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
        <line x1={x1} y1={lineY} x2={x2} y2={lineY} stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
        <rect x={x1 - 8} y={lineY - 8} width="16" height="16" fill="none" stroke="#fff" strokeWidth="1.5" transform={`rotate(45 ${x1} ${lineY})`} />
        <rect x={x2 - 8} y={lineY - 8} width="16" height="16" fill="none" stroke="#fff" strokeWidth="1.5" transform={`rotate(45 ${x2} ${lineY})`} />
        <circle cx={cx} cy={lineY} r="9" fill={TOKENS.cardDark} stroke="#fff" strokeWidth="1.5" />
      </svg>

      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />
    </div>
  );
}
