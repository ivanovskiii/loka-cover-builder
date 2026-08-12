import { useState, useCallback } from "react";
import * as htmlToImage from "html-to-image";
import { COVER_W, COVER_H } from "../theme.js";

// html-to-image only waits on <img> loads it fetches itself — it assumes a
// `data:` src (e.g. our freshly-uploaded photos/logos) is already decoded,
// which isn't true the instant React sets it. Wait for every image in the
// node to finish decoding before snapshotting, or the export can come back
// with the image missing.
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Export timed out after ${ms}ms`)), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); }
    );
  });
}

async function waitForImages(node) {
  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    })
  );
  // Loaded isn't the same as painted: html-to-image rasterizes via an SVG
  // foreignObject, and a freshly-decoded image can still produce a blank
  // frame if snapshotted the instant it loads. A short settle delay avoids
  // that without depending on requestAnimationFrame (some embedded/headless
  // contexts only paint on demand and never fire it on a free-running timer).
  await new Promise((resolve) => setTimeout(resolve, 150));
}

// Exports the given node ref to a full-resolution PNG download.
// Returns { busy, download } — busy drives the button's loading state.
export function useCoverExport(nodeRef, filenameFrom) {
  const [busy, setBusy] = useState(false);

  const download = useCallback(async () => {
    if (!nodeRef.current) return;
    setBusy(true);
    try {
      await waitForImages(nodeRef.current);
      // html-to-image rasterizes via an <img>+canvas step that can hang
      // instead of erroring for pathological inputs — never let that wedge
      // the UI in a permanent "busy" state.
      const dataUrl = await withTimeout(
        htmlToImage.toPng(nodeRef.current, {
          width: COVER_W,
          height: COVER_H,
          pixelRatio: 1,
          cacheBust: true,
        }),
        20000
      );
      const a = document.createElement("a");
      const raw = (filenameFrom && filenameFrom()) || "loka-cover";
      const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);
      a.download = `${slug || "loka-cover"}.png`;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed — see console.");
    } finally {
      setBusy(false);
    }
  }, [nodeRef, filenameFrom]);

  return { busy, download };
}
