import { TOKENS, COVER_W, COVER_H } from "../../theme.js";
import { PlaceholderBackground } from "../../components/PlaceholderBackground.jsx";
import { networkGraphicSvg, NETWORK_NATIVE_W, NETWORK_NATIVE_H } from "../../data/networkGraphic.js";

// Figma's illustration sits in a 2000x1000 frame — same 2:1 ratio as our
// canvas — so it scales onto COVER_W/COVER_H with a single uniform factor
// and no distortion.
const FIGMA_CANVAS_W = 2000;
const SCALE = COVER_W / FIGMA_CANVAS_W;
const GRAPHIC_LEFT = 245 * SCALE;
const GRAPHIC_TOP = 175 * SCALE;
const GRAPHIC_W = NETWORK_NATIVE_W * SCALE;
const GRAPHIC_H = NETWORK_NATIVE_H * SCALE;

// A network of connected nodes with two "spotlight" panels, evoking a
// system/architecture diagram. Graphic-only, no text — matches the source design.
export function NetworkGraphCover({ state, innerRef }) {
  const { mode, backgroundPattern, graphSeed, nodeCount, lineWidth } = state;
  const isLight = mode === "light";
  const framePad = 14;

  const graphicSvg = networkGraphicSvg(
    isLight
      ? { lineColor: TOKENS.navy, panelFill: "rgba(10,26,47,0.06)", panelStroke: "rgba(10,26,47,0.25)", seed: graphSeed, nodeCount, lineWidth }
      : { lineColor: TOKENS.greyBlue, panelFill: "rgba(255,255,255,0.1)", panelStroke: "rgba(255,255,255,0.4)", seed: graphSeed, nodeCount, lineWidth }
  );

  return (
    <div ref={innerRef} style={{ position: "relative", width: COVER_W, height: COVER_H, background: isLight ? TOKENS.light : TOKENS.black, overflow: "hidden", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      <PlaceholderBackground mode={mode} pattern={backgroundPattern} />

      <div
        style={{ position: "absolute", left: GRAPHIC_LEFT, top: GRAPHIC_TOP, width: GRAPHIC_W, height: GRAPHIC_H, zIndex: 1 }}
        dangerouslySetInnerHTML={{ __html: graphicSvg }}
      />

      <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", border: `${framePad}px solid ${state.accent}` }} />
    </div>
  );
}
