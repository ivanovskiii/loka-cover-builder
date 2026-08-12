import { PANEL_BG_SOFT, PANEL_INK_2, PANEL_INK_3, PANEL_LINE, SYS_FONT, SWATCHES } from "../../theme.js";

// The floating editor panel — the system's light card surface.
export const panelStyle = {
  background: PANEL_BG_SOFT,
  border: `1px solid ${PANEL_LINE}`,
  borderRadius: 20,
  padding: 22,
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
};

export const labelStyle = {
  color: PANEL_INK_2,
  fontFamily: SYS_FONT,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  marginBottom: 12,
  display: "block",
  fontWeight: 500,
};

// The upload dropzone isn't a documented field — it borrows the family's box
// and colors but keeps a dashed border to read as "drop something here".
export function dropzoneStyle(hasValue) {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    padding: "0 16px",
    fontFamily: SYS_FONT,
    fontSize: 13,
    background: PANEL_BG_SOFT,
    border: `1px dashed ${hasValue ? PANEL_LINE : "#CCD4E0"}`,
    borderRadius: 12,
    color: hasValue ? "#010812" : PANEL_INK_3,
    cursor: "pointer",
    boxSizing: "border-box",
  };
}

// Loka Figma "Button" — Primary / Secondary / Outline light / Outline dark.
export function Button({ variant = "secondary", size, block, className = "", ...rest }) {
  const cls = [
    "loka-btn",
    `loka-btn--${variant}`,
    size === "sm" ? "loka-btn--sm" : "",
    block ? "loka-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <button type="button" className={cls} {...rest} />;
}

// Loka Figma "Checkbox / 40" — reused as the panel's on/off control.
export function Toggle({ on, onChange, children }) {
  return (
    <button
      type="button"
      className="loka-checkbox"
      data-checked={on}
      aria-pressed={on}
      onClick={() => onChange(!on)}
    >
      <span className="loka-checkbox-box">
        {on && (
          <svg viewBox="6 6 12 12" width="12" height="12" aria-hidden="true">
            <path
              d="M10.4969 15.3333L7 12.1733L7.87423 11.3832L10.4969 13.7533L16.1258 8.66667L17 9.45669L10.4969 15.3333Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}

// Loka Figma "service-icon-item" (Tabs) — one selectable item: a hairline
// marker that fills solid blue when active, blue ring + dot on hover.
export function TabItem({ label, active, onClick }) {
  return (
    <button type="button" className="loka-tab-item" data-active={active} onClick={onClick}>
      <span className="loka-tab-mark" aria-hidden />
      <span className="loka-tab-label">{label}</span>
    </button>
  );
}

// The Tabs bar — an equal-share row of TabItems, used wherever the editor
// previously showed a segmented control.
export function Segmented({ options, value, onChange }) {
  return (
    <div className="loka-tab-bar">
      {options.map(([val, name]) => (
        <TabItem key={val} label={name} active={value === val} onClick={() => onChange(val)} />
      ))}
    </div>
  );
}

export function Swatches({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {SWATCHES.map((c) => (
        <button
          key={c}
          className="loka-swatch"
          data-active={value === c}
          onClick={() => onChange(c)}
          style={{ background: c }}
        />
      ))}
    </div>
  );
}
