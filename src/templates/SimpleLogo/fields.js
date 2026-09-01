import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["mode", "logo", "graphic", "pattern", "accent"];

// Clean state the editor opens with.
export const defaults = {
  mode: "dark",
  userImage: null,
  logoText: "Add Title",
  accent: TOKENS.navy,
  graphicId: null,
  backgroundPattern: "dots",
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  mode: "dark",
  userImage: null,
  logoText: "LOKA",
  accent: TOKENS.navy,
  graphicId: null,
  backgroundPattern: "dots",
};
