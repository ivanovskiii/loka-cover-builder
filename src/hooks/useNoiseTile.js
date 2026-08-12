import { useMemo } from "react";

// Builds a tileable noise PNG once. Stable across preview + export so the grain
// looks identical in the downloaded image and on screen.
export function useNoiseTile(rgb, size = 140) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = rgb[0];
      img.data[i + 1] = rgb[1];
      img.data[i + 2] = rgb[2];
      img.data[i + 3] = v; // alpha carries the noise
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL("image/png");
  }, [rgb[0], rgb[1], rgb[2], size]);
}
