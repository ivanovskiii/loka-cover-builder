// Uploaded photos can be several MB straight off a phone/camera. Exporting
// embeds the image as a base64 data URI inside an SVG that a canvas has to
// rasterize — past a certain payload size that rasterization step can hang
// indefinitely in some browsers instead of erroring. Cap the longest edge and
// re-encode as JPEG so the embedded payload stays small.
const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.85;

export function downscaleImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.round(img.naturalWidth * scale);
        const h = Math.round(img.naturalHeight * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
