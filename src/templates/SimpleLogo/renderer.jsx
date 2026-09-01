import { TOKENS, COVER_W, COVER_H } from "../../theme.js";
import { PlaceholderBackground } from "../../components/PlaceholderBackground.jsx";
import { findGraphic } from "../../data/iconLookup.js";

// A flat, no-card cover: a centered mark over a dot/grid field. With no
// graphic picked, it's just a big text wordmark; picking a graphic switches
// to an icon-over-wordmark combo (an uploaded image always wins outright).
export function SimpleLogoCover({ state, innerRef }) {
  const { mode, logoText, accent, graphicId, backgroundPattern, userImage } = state;
  const isLight = mode === "light";
  const framePad = 14;
  const ink = isLight ? TOKENS.navy : "#FFFFFF";
  const graphic = graphicId ? findGraphic(graphicId) : null;

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: isLight ? TOKENS.light : TOKENS.black, overflow: "hidden", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      <PlaceholderBackground mode={mode} pattern={backgroundPattern} />

      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 120px" }}>
        {userImage ? (
          <img src={userImage} alt="" crossOrigin="anonymous" style={{ maxWidth: "48%", maxHeight: "42%", objectFit: "contain" }} />
        ) : graphic ? (
          <>
            <div style={{ width: 84, height: 84, position: "relative" }}>
              <div
                style={{ width: 64, height: 64, color: ink, transform: "scale(1.3125)", transformOrigin: "top left" }}
                dangerouslySetInnerHTML={{ __html: graphic.svg }}
              />
            </div>
            <div style={{ color: ink, fontSize: 44, fontWeight: 600, letterSpacing: "0.06em", textAlign: "center", whiteSpace: "pre-wrap" }}>{logoText}</div>
          </>
        ) : (
          <div style={{ color: ink, fontSize: 100, fontWeight: 700, letterSpacing: "0.08em", textAlign: "center", whiteSpace: "pre-wrap" }}>{logoText}</div>
        )}
      </div>
    </div>
  );
}
