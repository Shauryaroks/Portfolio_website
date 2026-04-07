import React, { useContext } from "react";
import { WindowManagerContext } from "./WindowManagerContext";

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="2" y="3" width="20" height="18" fill="#1a1a1a" />
    <rect x="4" y="8" width="2" height="2" fill="#22c55e" />
    <rect x="7" y="8" width="2" height="2" fill="#22c55e" />
    <rect x="10" y="8" width="4" height="2" fill="#22c55e" />
    <rect x="4" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="7" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="10" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="4" y="16" width="6" height="2" fill="#22c55e" />
  </svg>
);

const ExplorerIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <path d="M2 8 L10 8 L12 4 L22 4 L22 20 L2 20 Z" fill="#f59e0b" />
    <rect x="2" y="8" width="8" height="12" fill="#fbbf24" />
    <rect x="12" y="4" width="10" height="4" fill="#fbbf24" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#dc2626" />
    <rect x="2" y="4" width="20" height="3" rx="1" fill="#ef4444" />
    <polygon points="2,7 12,15 22,7" fill="#991b1b" />
    <rect x="4" y="14" width="16" height="6" rx="1" fill="#fecaca" />
    <rect x="8" y="16" width="8" height="2" rx="1" fill="#dc2626" />
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="20" rx="2" fill="#3b82f6" />
    <rect x="6" y="4" width="12" height="2" rx="1" fill="#1d4ed8" />
    <rect x="6" y="8" width="10" height="2" rx="1" fill="#60a5fa" />
    <rect x="6" y="12" width="8" height="2" rx="1" fill="#60a5fa" />
    <rect x="6" y="16" width="6" height="2" rx="1" fill="#60a5fa" />
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="20" rx="2" fill="#8b5cf6" />
    <rect x="6" y="4" width="12" height="2" rx="1" fill="#7c3aed" />
    <rect x="6" y="8" width="4" height="2" rx="1" fill="#c4b5fd" />
    <rect x="6" y="12" width="8" height="2" rx="1" fill="#c4b5fd" />
    <rect x="6" y="16" width="6" height="2" rx="1" fill="#c4b5fd" />
    <rect x="10" y="20" width="4" height="2" rx="1" fill="#7c3aed" />
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#06b6d4" />
    <rect x="8" y="5" width="8" height="8" fill="white" />
    <rect x="6" y="6" width="2" height="2" fill="#06b6d4" />
    <rect x="16" y="6" width="2" height="2" fill="#06b6d4" />
    <rect x="10" y="9" width="4" height="2" fill="#06b6d4" />
    <rect x="4" y="14" width="4" height="2" fill="white" />
    <rect x="10" y="14" width="4" height="2" fill="white" />
    <rect x="16" y="14" width="4" height="2" fill="white" />
    <rect x="4" y="17" width="4" height="2" fill="white" />
    <rect x="10" y="17" width="4" height="2" fill="white" />
    <rect x="16" y="17" width="4" height="2" fill="white" />
  </svg>
);

const shortcuts = [
  { id: 'terminal', icon: <TerminalIcon />, label: 'Terminal' },
  { id: 'explorer', icon: <ExplorerIcon />, label: 'Explorer' },
  { id: 'blog', icon: <BlogIcon />, label: 'Blog' },
  { id: 'mail', icon: <MailIcon />, label: 'Mail' },
  { id: 'resume', icon: <ResumeIcon />, label: 'Resume' },
  { id: 'about', icon: <AboutIcon />, label: 'About' },
];

export default function DesktopShortcuts() {
  const { openWindow, focusWindow } = useContext(WindowManagerContext);
  
  const columns = [];
  for (let i = 0; i < shortcuts.length; i += 5) {
    columns.push(shortcuts.slice(i, i + 5));
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
