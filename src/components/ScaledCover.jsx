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
    const fit = () => setScale(el.clientWidth / COVER_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} style={{ position: "absolute", inset: 0 }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: COVER_W, height: COVER_H, position: "absolute", top: 0, left: 0 }}>
        <Renderer state={state} noiseUrl={noiseUrl} />
      </div>
    </div>
  );
}
