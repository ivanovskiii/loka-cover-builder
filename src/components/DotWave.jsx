import { useEffect, useRef } from "react";

// Animated dot-wave shell background: ripple (position) + shimmer (opacity),
// very subtle, monochrome cool-grey dots. Static grid under reduced-motion.
export function DotWave() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const GAP = 34, R = 1.5;
    const DOT = [120, 140, 175];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = i * GAP, y0 = j * GAP;
          const phase = (x0 + y0) * 0.012 - t * 0.0009;
          const dy = reduce ? 0 : Math.sin(phase) * 3.2;
          const dx = reduce ? 0 : Math.cos(phase * 0.8) * 2.1;
          const shimmer = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(phase * 1.3);
          const alpha = 0.08 + shimmer * 0.14;
          ctx.beginPath();
          ctx.arc(x0 + dx, y0 + dy, R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${DOT[0]},${DOT[1]},${DOT[2]},${alpha})`;
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw(0);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
