import { TOKENS, COVER_W, COVER_H, GRAIN_LEVELS, LAYOUTS } from "../../theme.js";
import { PlaceholderBackground } from "../../components/PlaceholderBackground.jsx";
import { CornerGraphic } from "../../components/CornerGraphic.jsx";

// Full-bleed photo (or placeholder) with a title over an optional scrim.
export function PhotoHeroCover({ state, innerRef, noiseUrl }) {
  const { titleScale, mode, textColor } = state;
  const layout = LAYOUTS.find((l) => l.id === state.layoutId) || LAYOUTS[0];
  const bgImg = state.userImage;
  const framePad = 14; // frame always present
  const isLightText = textColor !== "dark";
  const titleInk = isLightText ? "#FFFFFF" : "#0A1A2F";
  const subInk = isLightText ? "rgba(255,255,255,0.82)" : "rgba(10,26,47,0.72)";
  const t = state.toggles;

  const posStyles = {
    "bottom-left": { left: framePad, bottom: framePad + 40, textAlign: "left", padding: "0 64px", maxWidth: "88%" },
    "bottom-center": { left: 0, right: 0, bottom: framePad + 40, textAlign: "center", margin: "0 auto", padding: "0 80px" },
    "top-left": { left: framePad, top: framePad + 40, textAlign: "left", padding: "0 64px", maxWidth: "88%" },
    center: { left: 0, right: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 100px" },
  };

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: TOKENS.navy, overflow: "hidden", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      {bgImg ? (
        <img src={bgImg} alt="" crossOrigin="anonymous" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      ) : (
        <PlaceholderBackground mode={mode} />
      )}

      {bgImg && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: `url(${noiseUrl})`, backgroundRepeat: "repeat", opacity: GRAIN_LEVELS[state.grainLevel] ?? GRAIN_LEVELS.medium, mixBlendMode: "overlay", pointerEvents: "none" }} />
      )}

      {t.scrim && bgImg && (() => {
        const isCenter = layout.titlePos === "center";
        const top = layout.titlePos === "top-left";
        const scrimGrad = isCenter
          ? "radial-gradient(circle at 50% 50%, rgba(6,15,28,0.72) 0%, rgba(6,15,28,0.35) 45%, rgba(6,15,28,0) 75%)"
          : top
          ? "linear-gradient(180deg, rgba(6,15,28,0.55) 0%, rgba(6,15,28,0) 55%)"
          : "linear-gradient(0deg, rgba(6,15,28,0.72) 0%, rgba(6,15,28,0) 55%)";
        const dotMask = isCenter
          ? "radial-gradient(circle at 50% 50%, #000 0%, #000 45%, transparent 75%)"
          : top
          ? "linear-gradient(180deg, #000 0%, #000 30%, transparent 55%)"
          : "linear-gradient(0deg, #000 0%, #000 30%, transparent 55%)";
        return (
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <div style={{ position: "absolute", inset: 0, background: scrimGrad }} />
            <div style={{ position: "absolute", inset: 0, opacity: 0.55, backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1.5px, transparent 1.5px)", backgroundSize: "34px 34px", WebkitMaskImage: dotMask, maskImage: dotMask }} />
          </div>
        );
      })()}

      {t.dotgrid && (
        <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: mode === "light" ? 0.35 : 0.5, backgroundImage: `radial-gradient(${mode === "light" ? "rgba(20,30,50,0.3)" : "rgba(255,255,255,0.28)"} 1.5px, transparent 1.5px)`, backgroundSize: "34px 34px" }} />
      )}

      <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", border: `${framePad}px solid ${state.accent}` }} />

      {state.graphicId && (
        <CornerGraphic graphicId={state.graphicId} color={isLightText ? "rgba(255,255,255,0.85)" : "rgba(10,26,47,0.75)"} />
      )}

      <div style={{ position: "absolute", zIndex: 3, ...posStyles[layout.titlePos] }}>
        <div style={{ color: titleInk, fontSize: 104 * titleScale, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.02em", whiteSpace: "pre-wrap", textShadow: isLightText && !(t.scrim && bgImg) ? "0 2px 24px rgba(0,0,0,0.4)" : "none" }}>
          {state.title}
        </div>
        {t.subtitle && state.subtitle && (
          <div style={{ color: subInk, fontSize: 30 * titleScale, fontWeight: 500, marginTop: 18, letterSpacing: "0.01em" }}>
            {state.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
