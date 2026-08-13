import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["mode", "pattern", "accent"];

// Clean state the editor opens with.
export const defaults = {
  mode: "dark",
  accent: TOKENS.navy,
  backgroundPattern: "dots",
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  mode: "dark",
  accent: TOKENS.navy,
  backgroundPattern: "dots",
};
