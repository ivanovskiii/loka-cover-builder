import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes.
export const fields = ["title", "mode", "accent"];

// Clean state the editor opens with.
export const defaults = {
  title: "Add Title",
  subtitle: "Add Subtitle",
  toggles: { subtitle: false },
  mode: "dark",
  accent: TOKENS.navy,
  titleScale: 1,
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  title: "The Agent\nassembly line",
  subtitle: "",
  toggles: { subtitle: false },
  mode: "dark",
  accent: TOKENS.navy,
  titleScale: 1,
};
