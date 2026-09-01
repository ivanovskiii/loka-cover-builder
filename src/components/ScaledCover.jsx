import { useEffect, useRef, useState } from "react";
import { COVER_W, COVER_H } from "../theme.js";

// Renders a cover scaled to fill its parent box (any size), keeping 16:9.
// Used by gallery thumbnails and the editor preview.
export function ScaledCover({ Renderer, state, noiseUrl }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    // Round and dedupe: ResizeObserver can fire repeatedly with near-identical
    // sub-pixel widths (e.g. from a hover-triggered style recalc), and each
    // fire re-renders the scaled content — for templates with fine
    // dot/grid/hairline patterns, that reads as the pattern visibly jittering.
    const fit = () => {
      const next = Math.round((el.clientWidth / COVER_W) * 10000) / 10000;
      setScale((prev) => (Math.abs(prev - next) < 0.0005 ? prev : next));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} style={{ position: "absolute", inset: 0 }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: COVER_W, height: COVER_H, position: "absolute", top: 0, left: 0, willChange: "transform", backfaceVisibility: "hidden" }}>
        <Renderer state={state} noiseUrl={noiseUrl} />
      </div>
    </div>
  );
}
