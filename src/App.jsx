import { useState } from "react";
import { useNoiseTile } from "./hooks/useNoiseTile.js";
import { TEMPLATES } from "./templates/registry.js";
import { Gallery } from "./gallery/Gallery.jsx";
import { Editor } from "./editor/Editor.jsx";

export default function App() {
  const [picked, setPicked] = useState(null);
  const noiseUrl = useNoiseTile([255, 255, 255]);
  const template = TEMPLATES.find((t) => t.id === picked);

  if (!template) return <Gallery onPick={setPicked} noiseUrl={noiseUrl} />;
  return <Editor template={template} onBack={() => setPicked(null)} />;
}
