import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["glow", "accent"];

// Clean state the editor opens with.
export const defaults = {
  accent: TOKENS.navy,
  glowX: 50,
  glowY: 20,
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  accent: TOKENS.navy,
  glowX: 50,
  glowY: 20,
};
