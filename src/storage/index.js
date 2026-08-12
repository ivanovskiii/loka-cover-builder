// Persistence seam. Everything that saves/loads covers goes through here.
//
// Today: Level 1 — localStorage, same browser only.
// Later: to get cross-device (Level 2), reimplement these four functions
// against an API/backend. Nothing else in the app should call localStorage
// directly, so that swap stays contained to this file.

const KEY = "loka-cover-drafts";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Draft save failed:", err);
  }
}

// { id, templateId, state, name, updatedAt }
export function listCovers() {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function saveCover({ id, templateId, state, name }) {
  const list = readAll();
  const now = Date.now();
  const draftId = id || `draft_${now}`;
  const existing = list.findIndex((d) => d.id === draftId);
  const draft = { id: draftId, templateId, state, name: name || "Untitled", updatedAt: now };
  if (existing >= 0) list[existing] = draft;
  else list.push(draft);
  writeAll(list);
  return draftId;
}

export function loadCover(id) {
  return readAll().find((d) => d.id === id) || null;
}

export function deleteCover(id) {
  writeAll(readAll().filter((d) => d.id !== id));
}
