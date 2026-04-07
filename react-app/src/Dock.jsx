import React, { useContext } from "react";
import { WindowManagerContext } from "./WindowManagerContext";

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="black" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="7 9 9.5 11.5 7 14" />
    <line x1="12" y1="14" x2="17" y2="14" />
  </svg>
);

const ExplorerIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="black" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="black" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="black" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const apps = [
  { id: 'terminal', icon: <TerminalIcon />, label: 'Terminal' },
  { id: 'explorer', icon: <ExplorerIcon />, label: 'Explorer' },
  { id: 'blog', icon: <BlogIcon />, label: 'Blog' },
  { id: 'mail', icon: <MailIcon />, label: 'Mail' },
];

export default function Dock() {
  const { openWindow, focusWindow } = useContext(WindowManagerContext);
  
  return (
    <div className="fixed left-0 top-10 bottom-8 w-16 bg-white/80 border-r-2 border-black z-40 flex flex-col items-center justify-center">
      <nav className="flex flex-col gap-4 justify-center">
        {apps.map((app) => (
          <button
            key={app.id}
            className="w-14 h-14 bg-white border-2 border-black rounded-2xl flex items-center justify-center shadow-brutalist-sm hover:shadow-brutalist-hover transition-all active:translate-x-1 active:translate-y-1 focus:outline-none"
            onClick={() => { openWindow(app.id); focusWindow(app.id); }}
            title={app.label}
          >
            {app.icon}
          </button>
        ))}
      </nav>
    </div>
  );
}
