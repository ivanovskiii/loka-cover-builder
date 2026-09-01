import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["mode", "logo", "graphic", "accent"];

// Clean state the editor opens with.
export const defaults = {
  mode: "dark",
  userImage: null,
  logoText: "Add Title",
  graphicId: null,
  accent: TOKENS.navy,
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  mode: "light",
  userImage: null,
  logoText: "LOKA",
  graphicId: null,
  accent: TOKENS.blue,
};
