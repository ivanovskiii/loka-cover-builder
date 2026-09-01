import { TOKENS } from "../../theme.js";

// Which editor controls this template exposes. Note: "title" (not "logo")
// for the wordmark input — the "logo" field's dropzone binds to the same
// userImage key as the "photo" field, which would collide with the
// background photo upload here.
export const fields = ["photo", "grain", "title", "graphic", "accent"];

// Clean state the editor opens with.
export const defaults = {
  userImage: null,
  title: "LOKA",
  toggles: {},
  titleScale: 1,
  graphicId: null,
  grainLevel: "medium",
  accent: TOKENS.navy,
};

// Finished-looking state shown in the gallery thumbnail.
export const preview = {
  userImage: null,
  title: "LOKA",
  toggles: {},
  titleScale: 1,
  graphicId: null,
  grainLevel: "medium",
  accent: TOKENS.navy,
};
