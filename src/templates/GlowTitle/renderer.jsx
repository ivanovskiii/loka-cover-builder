import { TOKENS, COVER_W, COVER_H, SYS_FONT } from "../../theme.js";
import { GLOW_BLUE } from "../../data/glowPalettes.js";

// A soft radial blue glow with a centered frosted-glass title card —
// matches the Figma "glow title" cover concept.
export function GlowTitleCover({ state, innerRef }) {
  const { title, subtitle, titleScale, accent } = state;
  const framePad = 14;
  const t = state.toggles;

  const glowX = state.glowX ?? 42;
  const glowY = state.glowY ?? 28;
  const stopPositions = [0, 5, 10, 30, 40, 50, 60, 70, 80, 100];
  const stops = GLOW_BLUE.map((c, i) => `${c} ${stopPositions[i]}%`).join(", ");

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: TOKENS.cardDark, overflow: "hidden", fontFamily: SYS_FONT }}>
      {/* soft radial glow — oversized and blurred so the gradient bands
          feather into each other instead of showing hard rings, with the
          blur bleed room sitting safely outside the visible canvas */}
      <div
        style={{
          position: "absolute", inset: -10, zIndex: 0,
          background: `radial-gradient(circle farthest-side at ${glowX}% ${glowY}%, ${stops})`,
          filter: "blur(100px)",
        }}
      />

      {/* frosted glass title card */}
      <div
        style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          zIndex: 1, width: 1134, maxWidth: "88%", padding: 56,
          borderRadius: 34, background: "rgba(255,255,255,0.1)",
          border: "3px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
          boxSizing: "border-box",
        }}
      >
        <div style={{ color: "#FFFFFF", fontSize: 80 * titleScale, lineHeight: 1.25, fontWeight: 500, textAlign: "center", whiteSpace: "pre-wrap", textShadow: "0 0 10px rgba(0,0,0,0.25)" }}>
          {title}
        </div>
        {t.subtitle && subtitle && (
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 28 * titleScale, fontWeight: 500, textAlign: "center", letterSpacing: "0.01em" }}>
            {subtitle}
          </div>
        )}
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />
    </div>
  );
}
