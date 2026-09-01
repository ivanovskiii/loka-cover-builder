import { useState, useRef, useEffect } from "react";
import { COVER_W, COVER_H, INK, HAIRLINE, PANEL_INK_2, SYS_FONT } from "../theme.js";
import { Atmosphere } from "../components/Atmosphere.jsx";
import { useNoiseTile } from "../hooks/useNoiseTile.js";
import { useCoverExport } from "../hooks/useCoverExport.js";
import { panelStyle } from "../components/ui/index.jsx";
import { RAIL_ICON, sectionsFor } from "./sections.jsx";
import { SectionBody } from "./SectionBody.jsx";
import { downscaleImage } from "../utils/downscaleImage.js";

export function Editor({ template, onBack }) {
  const [state, setState] = useState({ ...template.defaults, grainLevel: template.defaults.grainLevel || "medium" });
  const [openSection, setOpenSection] = useState(() => sectionsFor(template.fields)[0]?.id ?? null);
  const [scale, setScale] = useState(0.5);
  const [uploadingImage, setUploadingImage] = useState(false);
  const previewRef = useRef(null);
  const exportRef = useRef(null);
  const noiseUrl = useNoiseTile([255, 255, 255]);
  const { busy, download } = useCoverExport(exportRef, () => state.title || state.logoText || template.name);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight || window.innerHeight - 56;
      setScale(Math.min(w / COVER_W, h / COVER_H, 0.9));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, []);

  const set = (patch) => setState((s) => ({ ...s, ...patch }));
  const setToggle = (k, v) => setState((s) => ({ ...s, toggles: { ...s.toggles, [k]: v } }));
  const onUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    downscaleImage(file)
      .then((dataUrl) => set({ userImage: dataUrl }))
      .finally(() => setUploadingImage(false));
  };

  const sections = sectionsFor(template.fields);
  const Renderer = template.Renderer;
  const panelOpen = openSection !== null;

  const orb = (extra) => ({
    width: 52, height: 52, borderRadius: "50%", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    ...extra,
  });

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", color: INK, fontFamily: SYS_FONT }}>
      <Atmosphere />
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 20, padding: "24px 40px", minHeight: "100vh", boxSizing: "border-box", alignItems: "stretch" }}>
        {/* rail — floating orbs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0, alignItems: "center" }}>
          <button onClick={onBack} title="Back to templates" className="loka-orb loka-btn loka-btn--outline-dark" style={orb({ border: `1px solid ${HAIRLINE}`, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" })}>
            <span className="halo" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          {sections.map((s) => {
            const active = openSection === s.id;
            return (
              <button key={s.id} title={s.name} onClick={() => setOpenSection((cur) => (cur === s.id ? null : s.id))} className={`loka-orb${active ? " active" : " loka-btn loka-btn--outline-dark"}`} style={orb({ background: active ? "rgba(25,87,244,0.28)" : undefined, border: `1px solid ${active ? "rgba(25,87,244,0.5)" : HAIRLINE}`, color: active ? "#dbe6ff" : undefined, boxShadow: active ? `0 8px 22px rgba(25,87,244,0.4)` : "0 8px 24px rgba(0,0,0,0.4)" })}>
                <span className="halo" />
                {RAIL_ICON[s.icon]}
              </button>
            );
          })}
          <div style={{ height: 4 }} />
          <button onClick={download} disabled={busy || uploadingImage} title={uploadingImage ? "Processing image…" : "Download PNG"} className="loka-orb loka-btn loka-btn--primary" style={orb({ width: 64, height: 64, padding: 0, border: "none", opacity: busy || uploadingImage ? 0.6 : 1, boxShadow: `0 10px 28px rgba(25,87,244,0.4)`, cursor: busy || uploadingImage ? "default" : "pointer" })}>
            <span className="halo" />
            {busy || uploadingImage ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" /></path></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></svg>
            )}
          </button>
        </div>

        {/* panel */}
        {panelOpen && (
          <div key={openSection} className="loka-panel loka-scroll" style={{ width: 320, maxWidth: "calc(100vw - 144px)", flexShrink: 1, minWidth: 0, ...panelStyle, overflowY: "auto", maxHeight: "calc(100vh - 48px)" }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: PANEL_INK_2, fontWeight: 500, marginBottom: 16 }}>
              {sections.find((s) => s.id === openSection)?.name}
            </div>
            <SectionBody section={openSection} fields={template.fields} state={state} set={set} setToggle={setToggle} onUpload={onUpload} uploadingImage={uploadingImage} />
          </div>
        )}

        {/* preview */}
        <div ref={previewRef} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minWidth: 0 }}>
          <div style={{ width: COVER_W * scale, height: COVER_H * scale, boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 8px 30px rgba(0,0,0,0.4)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: COVER_W, height: COVER_H }}>
              <Renderer state={state} noiseUrl={noiseUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* hidden full-res node for export */}
      <div style={{ position: "fixed", left: -99999, top: 0, pointerEvents: "none" }} aria-hidden>
        <Renderer state={state} innerRef={exportRef} noiseUrl={noiseUrl} />
      </div>
    </div>
  );
}
