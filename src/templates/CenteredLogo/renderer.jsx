import { TOKENS, COVER_W, COVER_H, SYS_FONT } from "../../theme.js";
import { PlaceholderBackground } from "../../components/PlaceholderBackground.jsx";
import { GRAPHICS } from "../../data/graphics.js";
import { findGraphic } from "../../data/iconLookup.js";

// A dark centered card, floating on the field, holding a mark + wordmark
// lifted off the card by a soft glow behind it.
export function CenteredLogoCover({ state, innerRef }) {
  const { mode, logoText, caption, accent, graphicId, backgroundPattern } = state;
  const isLight = mode === "light";
  const ink = isLight ? "#0A1A2F" : TOKENS.greyBlue;
  const capInk = isLight ? "rgba(10,26,47,0.55)" : "rgba(124,146,174,0.7)";
  const cardBg = isLight ? "#F2F4F8" : TOKENS.cardDark;
  // 80px grid cells divide evenly into the card's position and size, so grid
  // lines land exactly on the card's edges — the grid reads as forming the
  // rectangle rather than just sitting behind it.
  const gridSize = 80;
  const cardW = 800;
  const cardH = 480;
  const graphic = findGraphic(graphicId) || GRAPHICS[0];

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: isLight ? TOKENS.light : TOKENS.black, overflow: "hidden", fontFamily: SYS_FONT }}>
      <PlaceholderBackground mode={mode} pattern={backgroundPattern} size={backgroundPattern === "grid" ? gridSize : undefined} />

      {/* soft field-wide glow the card sits inside */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: isLight
        ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0%, transparent 55%)"
        : "radial-gradient(circle at 50% 50%, rgba(27,79,232,0.22) 0%, transparent 55%)" }} />

      {/* centered card */}
      <div
        style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          width: cardW, height: cardH, zIndex: 2, background: cardBg,
          border: `1px solid ${isLight ? "rgba(10,26,47,0.08)" : "rgba(255,255,255,0.06)"}`,
          boxShadow: isLight ? "0 20px 60px rgba(10,26,47,0.12)" : `0 0 60px ${accent}55, 0 0 120px rgba(27,79,232,0.15)`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, overflow: "hidden",
        }}
      >
        {state.userImage ? (
          <img src={state.userImage} alt="" crossOrigin="anonymous" style={{ maxWidth: "42%", maxHeight: "42%", objectFit: "contain", zIndex: 1 }} />
        ) : (
          <div style={{ width: 88, height: 88, zIndex: 1, position: "relative" }}>
            <div
              style={{ width: 64, height: 64, color: ink, transform: "scale(1.375)", transformOrigin: "top left" }}
              dangerouslySetInnerHTML={{ __html: graphic.svg }}
            />
          </div>
        )}
        <div style={{ color: ink, fontSize: 42, fontWeight: 600, letterSpacing: "0.06em", zIndex: 1 }}>{logoText}</div>
        {caption && (
          <div style={{ color: capInk, fontSize: 20, fontWeight: 500, letterSpacing: "0.04em", zIndex: 1 }}>{caption}</div>
        )}
      </div>
    </div>
  );
}
