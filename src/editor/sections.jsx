// Rail icons + how template fields group into rail sections.

export const RAIL_ICON = {
  content: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5h16v2" /><path d="M12 5v14" /><path d="M9 19h6" /></svg>
  ),
  photo: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
  ),
  style: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3v18" /><path d="M3 12h18" /></svg>
  ),
  graphic: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5l8 4.5 8-4.5" /><path d="M12 12v9" /></svg>
  ),
};

// Group a template's field list into the rail sections it should show.
export function sectionsFor(fields) {
  const s = [];
  if (fields.some((f) => ["title", "logo", "caption"].includes(f))) {
    s.push({ id: "content", name: "Content", icon: "content" });
  }
  if (fields.includes("photo")) {
    s.push({ id: "photo", name: "Photo", icon: "photo" });
  }
  if (fields.includes("graphic")) {
    s.push({ id: "graphic", name: "Graphic", icon: "graphic" });
  }
  if (fields.includes("graph")) {
    s.push({ id: "graphic", name: "Graphic", icon: "graphic" });
  }
  s.push({ id: "style", name: "Style", icon: "style" });
  return s;
}
