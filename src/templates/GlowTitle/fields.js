import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["title", "glow", "accent"];

// Clean state the editor opens with.
export const defaults = {
  title: "Add Title",
  subtitle: "Add Subtitle",
  toggles: { subtitle: false },
  accent: TOKENS.navy,
  titleScale: 1,
  glowX: 42,
  glowY: 28,
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  title: "Running Six Open-Source\nCofolding Models on AWS",
  subtitle: "",
  toggles: { subtitle: false },
  accent: TOKENS.navy,
  titleScale: 1,
  glowX: 42,
  glowY: 28,
};
