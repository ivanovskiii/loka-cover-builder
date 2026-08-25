import { useState } from "react";
import { LAYOUTS } from "../theme.js";
import { labelStyle, dropzoneStyle, Button, Toggle, Segmented, TabItem, Swatches } from "../components/ui/index.jsx";
import { GRAPHICS } from "../data/graphics.js";
import { LOGOS } from "../data/logos.js";

// Renders the controls for one rail section, given the template's fields and
// the current editor state. `has(field)` gates each control.
export function SectionBody({ section, fields, state, set, setToggle, onUpload, uploadingImage }) {
  const has = (x) => fields.includes(x);
  // The panel this belongs to remounts (keyed by section) each time the rail
  // switches sections, so this is safe to compute once per visit — reopening
  // the graphic picker lands on whichever pool the current selection is in.
  const [graphicPool, setGraphicPool] = useState(() =>
    LOGOS.some((g) => g.label === state.graphicId) ? "logos" : "illustrations"
  );

  if (section === "content") {
    return (
      <>
        {has("layout") && (
          <>
            <label style={labelStyle}>Title position</label>
            <div className="loka-tab-list" style={{ marginBottom: 18 }}>
              {LAYOUTS.map((l) => (
                <TabItem key={l.id} label={l.name} active={state.layoutId === l.id} onClick={() => set({ layoutId: l.id })} />
              ))}
            </div>
          </>
        )}
        {has("title") && (
          <>
            <label className="loka-field-label">Title</label>
            <div style={{ height: 6 }} />
            <textarea value={state.title} onChange={(e) => set({ title: e.target.value })} rows={2} className="loka-field-control loka-field-control--textarea" />
            <div style={{ height: 16 }} />
            <Toggle on={state.toggles.subtitle} onChange={(v) => setToggle("subtitle", v)}>Show subtitle</Toggle>
            {state.toggles.subtitle && (
              <>
                <div style={{ height: 12 }} />
                <label className="loka-field-label">Subtitle</label>
                <div style={{ height: 6 }} />
                <input value={state.subtitle} onChange={(e) => set({ subtitle: e.target.value })} className="loka-field-control" />
              </>
            )}
            <div style={{ height: 18 }} />
            <label style={labelStyle}>Title size</label>
            <input type="range" min="0.7" max="1.4" step="0.05" value={state.titleScale} onChange={(e) => set({ titleScale: parseFloat(e.target.value) })} style={{ width: "100%" }} />
            {has("textColor") && (
              <>
                <div style={{ height: 18 }} />
                <label style={labelStyle}>Text color</label>
                <Segmented options={[["light", "Light"], ["dark", "Dark"]]} value={state.textColor} onChange={(v) => set({ textColor: v })} />
              </>
            )}
          </>
        )}
        {has("logo") && (
          <>
            <label className="loka-field-label">Logo wordmark</label>
            <div style={{ height: 6 }} />
            <input value={state.logoText} onChange={(e) => set({ logoText: e.target.value })} className="loka-field-control" placeholder="LOKA" />
            <div style={{ height: 10 }} />
            <label style={dropzoneStyle(!!state.userImage)}>
              {uploadingImage ? "Processing image…" : state.userImage ? "Logo image added · replace" : "Or upload a logo image…"}
              <input type="file" accept="image/*" onChange={onUpload} disabled={uploadingImage} style={{ display: "none" }} />
            </label>
            {state.userImage && (
              <>
                <div style={{ height: 8 }} />
                <Button variant="outline-light" size="sm" block disabled={uploadingImage} onClick={() => set({ userImage: null })}>Remove logo image</Button>
              </>
            )}
          </>
        )}
        {has("caption") && (
          <>
            <div style={{ height: 18 }} />
            <label className="loka-field-label">Caption</label>
            <div style={{ height: 6 }} />
            <input value={state.caption} onChange={(e) => set({ caption: e.target.value })} className="loka-field-control" placeholder="Optional caption" />
          </>
        )}
      </>
    );
  }

  if (section === "photo") {
    return (
      <>
        <label style={labelStyle}>Photo</label>
        <label style={dropzoneStyle(!!state.userImage)}>
          {uploadingImage ? "Processing image…" : state.userImage ? "Photo added · click to replace" : "Choose image…"}
          <input type="file" accept="image/*" onChange={onUpload} disabled={uploadingImage} style={{ display: "none" }} />
        </label>
        {state.userImage && (
          <>
            <div style={{ height: 8 }} />
            <Button variant="outline-light" size="sm" block disabled={uploadingImage} onClick={() => set({ userImage: null })}>Remove photo</Button>
          </>
        )}
        {has("grain") && (
          <>
            <div style={{ height: 18 }} />
            <label style={{ ...labelStyle, opacity: state.userImage ? 1 : 0.5 }}>Photo grain</label>
            <div style={{ opacity: state.userImage ? 1 : 0.5, pointerEvents: state.userImage ? "auto" : "none" }}>
              <Segmented options={[["light", "Light"], ["medium", "Medium"], ["heavy", "Heavy"]]} value={state.grainLevel} onChange={(v) => set({ grainLevel: v })} />
            </div>
            {!state.userImage && <div style={{ color: "#8ea0b6", fontSize: 11, marginTop: 8, opacity: 0.8 }}>Applies once you upload a photo.</div>}
          </>
        )}
      </>
    );
  }

  if (section === "graphic") {
    const pool = graphicPool === "logos" ? LOGOS : GRAPHICS;
    return (
      <>
        <label style={labelStyle}>Corner graphic</label>
        <Segmented
          options={[["illustrations", "Illustrations"], ["logos", "Company logos"]]}
          value={graphicPool}
          onChange={setGraphicPool}
        />
        <div style={{ height: 12 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(68px, 1fr))", gap: 6 }}>
          <button className="loka-gfx-tile" data-active={!state.graphicId} onClick={() => set({ graphicId: null })} style={{ fontSize: 10, fontFamily: "inherit" }}>
            None
          </button>
          {pool.map((g) => (
            <button key={g.label} title={g.label} className="loka-gfx-tile" data-active={state.graphicId === g.label} onClick={() => set({ graphicId: g.label })}>
              <span className="loka-gfx-tile-icon" dangerouslySetInnerHTML={{ __html: g.svg }} />
            </button>
          ))}
        </div>
      </>
    );
  }

  if (section === "style") {
    return (
      <>
        {has("elements") && (
          <>
            <label style={labelStyle}>Elements</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Toggle on={state.toggles.dotgrid} onChange={(v) => setToggle("dotgrid", v)}>Dot-grid overlay</Toggle>
              <Toggle on={state.toggles.scrim} onChange={(v) => setToggle("scrim", v)}>Legibility scrim (photo)</Toggle>
            </div>
            <div style={{ height: 18 }} />
          </>
        )}
        {has("mode") && (
          <>
            <label style={labelStyle}>Background</label>
            <Segmented options={[["dark", "Dark"], ["light", "Light"]]} value={state.mode} onChange={(v) => set({ mode: v })} />
            <div style={{ height: 18 }} />
          </>
        )}
        {has("pattern") && (
          <>
            <label style={labelStyle}>Background pattern</label>
            <Segmented options={[["dots", "Dot grid"], ["grid", "Grid"]]} value={state.backgroundPattern} onChange={(v) => set({ backgroundPattern: v })} />
            <div style={{ height: 18 }} />
          </>
        )}
        {has("glow") && (
          <>
            <label style={labelStyle}>Background</label>
            <Button
              variant="outline-light"
              size="sm"
              block
              onClick={() =>
                set({
                  glowX: Math.round(15 + Math.random() * 70),
                  glowY: Math.round(12 + Math.random() * 55),
                })
              }
            >
              Shuffle gradient background
            </Button>
            <div style={{ height: 18 }} />
          </>
        )}
        {has("accent") && (
          <>
            <label style={labelStyle}>Frame accent</label>
            <Swatches value={state.accent} onChange={(v) => set({ accent: v })} />
          </>
        )}
      </>
    );
  }

  return null;
}
