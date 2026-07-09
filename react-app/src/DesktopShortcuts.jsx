import React, { useContext } from "react";
import { WindowManagerContext } from "./WindowManagerContext";
import { apps } from "./appIcons";

export default function DesktopShortcuts() {
  const { openWindow, focusWindow } = useContext(WindowManagerContext);
  
  const columns = [];
  for (let i = 0; i < apps.length; i += 5) {
    columns.push(apps.slice(i, i + 5));
  }

  return (
    <div className="flex flex-row flex-wrap content-start pt-12 pl-4 h-full w-20 overflow-auto">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col mr-2">
          {col.map((sc) => (
            <button
              key={sc.id}
              className="flex flex-col items-center group focus:outline-none mb-3"
              onClick={() => { openWindow(sc.id); focusWindow(sc.id); }}
            >
              <div className="w-14 h-14 flex items-center justify-center">
                {sc.icon}
              </div>
              <span className="text-xs font-mono mt-1 text-white text-center leading-tight drop-shadow-md">{sc.label}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
