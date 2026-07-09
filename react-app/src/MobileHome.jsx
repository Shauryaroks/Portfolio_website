import React, { useContext } from "react";
import { WindowManagerContext } from "./WindowManagerContext";
import { apps } from "./appIcons";
import terminal from "./content/terminal.json";
import about from "./content/about.json";

const ext = (u) => (u.startsWith("http") ? u : `https://${u}`);

export default function MobileHome() {
  const { openWindow, focusWindow } = useContext(WindowManagerContext);
  const open = (id) => { openWindow(id); focusWindow(id); };

  return (
    <div className="min-h-full w-full p-4 flex flex-col gap-4">
      {/* Identity header */}
      <div className="bg-black/70 backdrop-blur-sm border-2 border-black rounded-lg p-4 text-white font-mono">
        <div className="text-lg font-bold">{terminal.name}</div>
        <div className="text-xs text-gray-300 mt-0.5">
          {terminal.role} · <span className="text-green-400">● {terminal.status}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <button onClick={() => open("resume")} className="border-2 border-white px-3 py-1.5 text-xs hover:bg-white hover:text-black active:bg-white active:text-black">Resume</button>
          <a href={ext(about.contact.github)} target="_blank" rel="noreferrer" className="border-2 border-white px-3 py-1.5 text-xs hover:bg-white hover:text-black active:bg-white active:text-black">GitHub</a>
          <a href={ext(about.contact.linkedin)} target="_blank" rel="noreferrer" className="border-2 border-white px-3 py-1.5 text-xs hover:bg-white hover:text-black active:bg-white active:text-black">LinkedIn</a>
        </div>
      </div>

      {/* App grid */}
      <div className="grid grid-cols-3 gap-4">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => open(app.id)}
            className="flex flex-col items-center gap-1 p-2 focus:outline-none active:scale-95 transition-transform"
          >
            {/* icons hardcode width/height=32; the child-svg classes override that on phone */}
            <div className="w-16 h-16 flex items-center justify-center [&>svg]:w-11 [&>svg]:h-11">{app.icon}</div>
            <span className="text-xs font-mono text-white text-center drop-shadow-md">{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
