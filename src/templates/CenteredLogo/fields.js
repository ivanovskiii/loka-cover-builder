import { TOKENS } from "../../theme.js";

export const fields = ["mode", "logo", "caption", "graphic", "pattern", "accent"];

export const defaults = {
  mode: "dark",
  userImage: null,
  logoText: "Add Title",
  caption: "",
  accent: TOKENS.navyBorder,
  graphicId: null,
  backgroundPattern: "dots",
};

export const preview = {
  mode: "dark",
  userImage: null,
  logoText: "SAGEMAKER",
  caption: "Build, train & deploy ML models",
  accent: TOKENS.navyBorder,
  graphicId: "AI & Agentic",
  backgroundPattern: "dots",
};
