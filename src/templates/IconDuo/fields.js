import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["mode", "graphic", "accent"];

// Clean state the editor opens with.
export const defaults = {
  mode: "dark",
  graphicId: "AI & Agentic",
  accent: TOKENS.navy,
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  mode: "light",
  graphicId: "Data & Analytics",
  accent: TOKENS.blue,
};
