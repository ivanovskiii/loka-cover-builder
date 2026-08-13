// Loka brand + app theme tokens. One place to retune the whole look.

export const TOKENS = {
  navy: "#0A1A2F",
  navyBorder: "#0D2340",
  blue: "#1B4FE8",
  light: "#E8ECF4",
  white: "#FFFFFF",
  black: "#010812",
  cardDark: "#020F1F",
  greyBlue: "#7C92AE",
  offWhite: "#F5F2EA",
};

// Cover is authored at a fixed 2:1 canvas (matches how the blog platform
// crops link previews); preview/export scale from this.
export const COVER_W = 1600;
export const COVER_H = 800;

// Photo grain shader intensities (overlay opacity) for uploaded photos.
export const GRAIN_LEVELS = { light: 0.18, medium: 0.34, heavy: 0.55 };

// No-photo placeholder background per mode: solid brand color + faint dots.
export const PLACEHOLDER_MODES = {
  dark: { base: "#0A1A2F", dot: "rgba(255,255,255,0.06)" },
  light: { base: "#E7ECF6", dot: "rgba(20,30,50,0.16)" },
};

// App shell (dark UI chrome) tokens — the Loka Design System's own dark theme
// (loka-guidelines .app[data-theme="dark"]), reused verbatim.
export const INK = "#F4F6F9";
export const INK_SOFT = "#8E9AAE";
export const HAIRLINE = "rgba(255,255,255,0.10)";
export const GLASS = "rgba(255,255,255,0.1)";
export const SHELL_BG = "#0A0F17";

// The floating editor panel is the system's LIGHT surface — Button, Tabs,
// Checkbox and Input Field are all specced against a white card.
export const PANEL_BG = "#FFFFFF";
export const PANEL_BG_SOFT = "#FAFBFC";
export const PANEL_INK = "#010812";
export const PANEL_INK_2 = "#2E3F5A";
export const PANEL_INK_3 = "#5C6A82";
export const PANEL_INK_4 = "#828FA5";
export const PANEL_LINE = "#E7ECF2";

// Brand accent, from the Blue ramp (NewBlue / blue-100).
export const SYS_BLUE = "#1957F4";
export const SYS_BLUE_100 = "#186BF3";
export const SYS_BLUE_SOFT = "#EEF2FE";

export const SYS_FONT = "'Alliance No.2','Inter',-apple-system,system-ui,sans-serif";

// Frame accent swatches offered in the editor.
export const SWATCHES = [TOKENS.navy, TOKENS.offWhite];

// Title-position layouts for photo-hero.
export const LAYOUTS = [
  { id: "hero-bl", name: "Title bottom-left", titlePos: "bottom-left" },
  { id: "hero-bc", name: "Title bottom-center", titlePos: "bottom-center" },
  { id: "hero-tl", name: "Title top-left", titlePos: "top-left" },
  { id: "hero-c", name: "Title centered", titlePos: "center" },
];
