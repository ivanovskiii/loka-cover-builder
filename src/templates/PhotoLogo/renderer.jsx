import { TOKENS, COVER_W, COVER_H, GRAIN_LEVELS } from "../../theme.js";
import { PlaceholderBackground } from "../../components/PlaceholderBackground.jsx";
import { findGraphic } from "../../data/iconLookup.js";

// Full-bleed black & white photo with a centered logo mark floating over it
// — no title, no card. A quieter alternative to Photo hero.
export function PhotoLogoCover({ state, innerRef, noiseUrl }) {
  const { userImage, title, titleScale, graphicId, accent } = state;
  const framePad = 14;
  const graphic = graphicId ? findGraphic(graphicId) : null;

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: TOKENS.black, overflow: "hidden", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      {userImage ? (
        <img
          src={userImage}
          alt=""
          crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05)", zIndex: 0 }}
        />
      ) : (
        <PlaceholderBackground mode="dark" />
      )}

      {/* dark scrim for logo legibility */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(1,8,18,0.38)" }} />

      {userImage && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: `url(${noiseUrl})`, backgroundRepeat: "repeat", opacity: GRAIN_LEVELS[state.grainLevel] ?? GRAIN_LEVELS.medium, mixBlendMode: "overlay", pointerEvents: "none" }} />
      )}

      {/* faint dot texture across the whole field */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.35, backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)", backgroundSize: "34px 34px" }} />

      {/* two small accent dots, bottom-left — a quiet decorative signature */}
      <div style={{ position: "absolute", left: 96, bottom: 96, zIndex: 2, display: "flex", gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {graphic ? (
          <div style={{ width: 120, height: 120, position: "relative" }}>
            <div style={{ width: 64, height: 64, color: "#FFFFFF", transform: "scale(1.875)", transformOrigin: "top left" }} dangerouslySetInnerHTML={{ __html: graphic.svg }} />
          </div>
        ) : (
          <div style={{ color: "#FFFFFF", fontSize: 84 * (titleScale || 1), fontWeight: 700, letterSpacing: "0.06em", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>{title}</div>
        )}
      </div>
    </div>
  );
}
