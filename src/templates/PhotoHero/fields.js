import { TOKENS } from "../../theme.js";
import demoGovernance from "../../assets/demo-governance.jpg";

// Which editor controls this template exposes.
export const fields = ["layout", "title", "photo", "grain", "elements", "graphic", "textColor", "accent"];

// Clean state the editor opens with.
export const defaults = {
  layoutId: "hero-bl",
  mode: "dark",
  userImage: null,
  title: "Add Title",
  subtitle: "Add Subtitle",
  toggles: { dotgrid: true, subtitle: false, scrim: true },
  grainLevel: "medium",
  accent: TOKENS.navyBorder,
  textColor: "light",
  titleScale: 1,
  graphicId: null,
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  layoutId: "hero-bl",
  mode: "dark",
  userImage: demoGovernance,
  title: "Data Governance\nin practice",
  subtitle: "Loka Engineering",
  toggles: { dotgrid: true, subtitle: true, scrim: true },
  grainLevel: "medium",
  accent: TOKENS.navyBorder,
  textColor: "light",
  titleScale: 0.92,
  graphicId: "Data & Analytics",
};
