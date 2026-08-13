import { INK, INK_SOFT, HAIRLINE, GLASS, SYS_FONT, COVER_W, COVER_H } from "../theme.js";
import { Atmosphere } from "../components/Atmosphere.jsx";
import { ScaledCover } from "../components/ScaledCover.jsx";
import { TEMPLATES } from "../templates/registry.js";
import lokaLogo from "../assets/loka-logo-white.png";

export function Gallery({ onPick, noiseUrl }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", color: INK, fontFamily: SYS_FONT }}>
      <Atmosphere />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "24px 32px 48px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={lokaLogo} alt="Loka" style={{ height: 32, width: "auto" }} />
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>|</div>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>Cover Canvas</div>
          </div>
          <div style={{ color: INK_SOFT, fontSize: 15, marginTop: 32 }}>Pick a template to start</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24, marginTop: 24 }}>
          {TEMPLATES.map((tpl) => {
            const base = tpl.preview || tpl.defaults;
            const previewState = { ...base, grainLevel: base.grainLevel || "medium" };
            return (
              <button
                key={tpl.id}
                onClick={() => onPick(tpl.id)}
                className="loka-card"
                style={{ position: "relative", background: GLASS, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${HAIRLINE}`, borderRadius: 22, padding: 16, cursor: "pointer", textAlign: "left", boxShadow: "0 10px 34px rgba(0,0,0,0.45)" }}
              >
                <span className="halo" />
                <div style={{ width: "100%", aspectRatio: `${COVER_W}/${COVER_H}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", position: "relative" }}>
                  <ScaledCover Renderer={tpl.Renderer} state={previewState} noiseUrl={noiseUrl} />
                </div>
                <div style={{ padding: "16px 6px 6px" }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: INK }}>{tpl.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
