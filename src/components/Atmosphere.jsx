import { SHELL_BG } from "../theme.js";
import { DotWave } from "./DotWave.jsx";

// The app's living backdrop: pure-black shell + animated dot wave, plus all the
// shared keyframes/hover CSS (orbs, cards, panels). Rendered once per view.
export function Atmosphere() {
  return (
    <>
      <style>{`
        @keyframes lokaBreath{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.85;transform:scale(1.08)}}
        .loka-card{transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease}
        .loka-card:hover{transform:translateY(-8px) scale(1.02)}
        .loka-card .halo{position:absolute;inset:-2px;border-radius:22px;background:radial-gradient(circle at 50% 40%,rgba(61,107,255,.4) 0%,transparent 70%);opacity:0;transition:opacity .3s ease;pointer-events:none;filter:blur(10px);z-index:-1}
        .loka-card:hover .halo{opacity:1;animation:lokaBreath 3.2s ease-in-out infinite}
        .loka-orb{position:relative;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease,color .25s ease,background .25s ease}
        .loka-orb:hover{transform:translateY(-6px) scale(1.06)}
        .loka-orb .halo{position:absolute;inset:-8px;border-radius:50%;background:radial-gradient(circle,rgba(61,107,255,.55) 0%,transparent 70%);opacity:0;transition:opacity .3s ease;pointer-events:none;filter:blur(8px);z-index:-1}
        .loka-orb:hover .halo{opacity:1;animation:lokaBreath 3.2s ease-in-out infinite}
        .loka-orb.active .halo{opacity:.75}
        .loka-panel{animation:lokaPanelIn .28s cubic-bezier(.2,.8,.2,1)}
        @keyframes lokaPanelIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        .loka-scroll::-webkit-scrollbar{width:8px}
        .loka-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:8px}
        .loka-scroll::-webkit-scrollbar-track{background:transparent}
        input[type=range]{-webkit-appearance:none;appearance:none;height:5px;border-radius:5px;background:rgba(255,255,255,.12)}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.5);cursor:pointer;border:1px solid rgba(255,255,255,.2)}
        @media (prefers-reduced-motion:reduce){.loka-card,.loka-card:hover,.loka-card:hover .halo,.loka-orb,.loka-orb:hover,.loka-orb:hover .halo,.loka-panel{animation:none;transition:none}}
      `}</style>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: `radial-gradient(circle at 50% 0%, #0a0a0c 0%, ${SHELL_BG} 55%)` }} />
      <DotWave />
    </>
  );
}
