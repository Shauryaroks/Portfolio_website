import React, { useContext, useState } from "react";
import { WindowManagerContext } from "./WindowManagerContext";
import data from "./content/terminal.json";

export default function TerminalWindow() {
  const { openWindow, focusWindow, openBlogPost } = useContext(WindowManagerContext);
  const [showAll, setShowAll] = useState(false);

  const projects = [
    { name: "explorer", label: "EXPLORER", desc: "File browser & project viewer" },
    { name: "blog", label: "BLOG", desc: "Technical articles & thoughts" },
    { name: "mail", label: "MAIL", desc: "Email client" },
  ];

  return (
    <div className="w-full h-full bg-black text-white p-4 font-mono text-sm overflow-auto">
      <pre className="text-xs leading-tight mb-4">
{`
    ██████╗ ███████╗ █████╗ ██████╗     ██████╗ ███████╗ █████╗ ██████╗ 
   ██╔════╝ ██╔════╝██╔══██╗██╔══██╗    ██╔══██╗ ██╔════╝██╔══██╗██╔══██╗
   ██║  ███╗█████╗  ███████║██████╔╝    ██████╔╝ █████╗  ███████║██████╔╝
   ██║   ██║██╔══╝  ██╔══██║██╔══██╗    ██╔══██╗ ██╔══╝  ██╔══██║██╔══██╗
   ╚██████╔╝███████╗██║  ██║██║  ██║    ██║  ██║███████╗██║  ██║██║  ██║
    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
      </pre>
      
      <div className="border-t border-white pt-2 mt-2">
        <p><span className="text-green-400">NAME:</span> {data.name}</p>
        <p><span className="text-green-400">AGE:</span> {data.age}</p>
        <p><span className="text-green-400">ROLE:</span> {data.role}</p>
        <p><span className="text-green-400">STATUS:</span> ● {data.status}</p>
      </div>

      <div className="mt-4 border-t border-white pt-2">
        <p className="text-green-400">━━━ EDUCATION ━━━</p>
        {data.education.map((line, i) => <p key={i}>• {line}</p>)}
      </div>

      {data.experience?.length > 0 && (
        <div className="mt-4 border-t border-white pt-2">
          <p className="text-green-400">━━━ EXPERIENCE ━━━</p>
          {data.experience.map((job, i) => (
            <div key={i} className="mt-1">
              <p>{job.role} @ {job.company} <span className="text-gray-400">— {job.period}</span></p>
              {job.points.map((pt, j) => <p key={j} className="ml-3">• {pt}</p>)}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 border-t border-white pt-2">
        <p className="text-green-400">━━━ SKILLS ━━━</p>
        {data.skills.map((line, i) => <p key={i}>• {line}</p>)}
      </div>

      <div className="mt-4 border-t border-white pt-2">
        <div className="flex items-center justify-between">
          <p className="text-green-400">━━━ APPS ━━━</p>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-green-400 hover:underline"
          >
            [{showAll ? "LESS" : "MORE"}]
          </button>
        </div>
        {projects.map((proj) => (
          <button
            key={proj.name}
            onClick={() => { openWindow(proj.name); focusWindow(proj.name); }}
            className="block text-left w-full hover:bg-white hover:text-black py-1 px-2 mt-1 border border-transparent hover:border-white"
          >
            <span className="text-green-400">→</span> {proj.label}
            <span className="text-gray-400 ml-2">- {proj.desc}</span>
          </button>
        ))}
        {showAll && (
          <>
            <button
              onClick={() => { openWindow('resume'); focusWindow('resume'); }}
              className="block text-left w-full hover:bg-white hover:text-black py-1 px-2 mt-1 border border-transparent hover:border-white"
            >
              <span className="text-green-400">→</span> RESUME
              <span className="text-gray-400 ml-2">- CV & experience</span>
            </button>
            <button
              onClick={() => { openWindow('about'); focusWindow('about'); }}
              className="block text-left w-full hover:bg-white hover:text-black py-1 px-2 mt-1 border border-transparent hover:border-white"
            >
              <span className="text-green-400">→</span> ABOUT
              <span className="text-gray-400 ml-2">- Who I am</span>
            </button>
          </>
        )}
      </div>

      <div className="mt-4 border-t border-white pt-2">
        <p className="text-green-400">━━━ PROJECTS ━━━ <span className="text-gray-500 text-xs">(click to read)</span></p>
        {data.projects.map((proj, i) => (
          <button
            key={i}
            onClick={() => openBlogPost(proj.slug)}
            className="block text-left w-full hover:bg-white hover:text-black py-1 px-2 border border-transparent hover:border-white"
          >
            <span className="text-green-400">→</span> {proj.label}
          </button>
        ))}
      </div>

      {data.achievements?.length > 0 && (
        <div className="mt-4 border-t border-white pt-2">
          <p className="text-green-400">━━━ ACHIEVEMENTS ━━━</p>
          {data.achievements.map((line, i) => <p key={i}>• {line}</p>)}
        </div>
      )}

      <div className="mt-6">
        <p className="text-green-400">shaurya@dev:~$ <span className="animate-pulse">_</span></p>
      </div>
    </div>
  );
}
