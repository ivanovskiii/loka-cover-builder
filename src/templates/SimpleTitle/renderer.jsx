import { TOKENS, COVER_W, COVER_H, SYS_FONT, PLACEHOLDER_MODES } from "../../theme.js";

// A flat, no-card title cover: soft glow blobs behind big centered type, over
// a grid pattern confined to the lower half of the field.
export function SimpleTitleCover({ state, innerRef }) {
  const { title, subtitle, titleScale, accent, mode } = state;
  const isLight = mode === "light";
  const framePad = 14;
  const t = state.toggles;
  const ink = isLight ? TOKENS.navy : "#FFFFFF";
  const subInk = isLight ? "rgba(10,26,47,0.7)" : "rgba(255,255,255,0.75)";
  const preset = PLACEHOLDER_MODES[mode] || PLACEHOLDER_MODES.dark;

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: isLight ? TOKENS.light : TOKENS.black, overflow: "hidden", fontFamily: SYS_FONT }}>
      {/* grid pattern, confined to the lower half */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(${preset.dot} 1px, transparent 1px), linear-gradient(90deg, ${preset.dot} 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 50%, #000 50%, #000 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, transparent 50%, #000 50%, #000 100%)",
        }}
      />

      {/* soft blurred glow blobs behind the title */}
      <div style={{ position: "absolute", inset: -160, zIndex: 1, filter: "blur(90px)" }}>
        <div style={{ position: "absolute", left: "32%", top: "30%", width: 420, height: 420, borderRadius: "50%", background: isLight ? "rgba(27,79,232,0.18)" : "rgba(27,79,232,0.45)", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", left: "58%", top: "55%", width: 320, height: 320, borderRadius: "50%", background: isLight ? "rgba(124,146,174,0.16)" : "rgba(124,146,174,0.35)", transform: "translate(-50%,-50%)" }} />
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", border: `${framePad}px solid ${accent}` }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 100px" }}>
        <div style={{ color: ink, fontSize: 90 * titleScale, lineHeight: 1.1, fontWeight: 500, letterSpacing: "-0.01em", whiteSpace: "pre-wrap", textShadow: isLight ? "none" : "0 0 10px rgba(0,0,0,0.25)" }}>
          {title}
        </div>
        {t.subtitle && subtitle && (
          <div style={{ color: subInk, fontSize: 28 * titleScale, fontWeight: 500, marginTop: 18, letterSpacing: "0.01em" }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
