import React, { useContext, useState } from "react";
import { WindowManagerContext } from "./WindowManagerContext";

export default function TerminalWindow() {
  const { openWindow, focusWindow } = useContext(WindowManagerContext);
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
        <p><span className="text-green-400">NAME:</span> Shaurya</p>
        <p><span className="text-green-400">AGE:</span> 24</p>
        <p><span className="text-green-400">ROLE:</span> Full Stack Developer</p>
        <p><span className="text-green-400">STATUS:</span> ● Available for Work</p>
      </div>
      
      <div className="mt-4 border-t border-white pt-2">
        <p className="text-green-400">━━━ EDUCATION ━━━</p>
        <p>• B.Tech in Computer Science (2024)</p>
        <p>• Indian Institute of Technology</p>
        <p>• Focus: Software Engineering, Distributed Systems</p>
      </div>

      <div className="mt-4 border-t border-white pt-2">
        <p className="text-green-400">━━━ SKILLS ━━━</p>
        <p>• Languages: JavaScript, TypeScript, Python, Go</p>
        <p>• Frontend: React, Vue, Tailwind CSS</p>
        <p>• Backend: Node.js, Express, PostgreSQL, Redis</p>
        <p>• Tools: Git, Docker, AWS, Linux</p>
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
            <button className="block text-left w-full hover:bg-white hover:text-black py-1 px-2 mt-1 border border-transparent hover:border-white">
              <span className="text-green-400">→</span> SETTINGS
              <span className="text-gray-400 ml-2">- System preferences</span>
            </button>
            <button className="block text-left w-full hover:bg-white hover:text-black py-1 px-2 mt-1 border border-transparent hover:border-white">
              <span className="text-green-400">→</span> GIT
              <span className="text-gray-400 ml-2">- Version control</span>
            </button>
          </>
        )}
      </div>
      
      <div className="mt-4 border-t border-white pt-2">
        <p className="text-green-400">━━━ PROJECTS ━━━</p>
        <p>• Portfolio OS - Interactive desktop portfolio</p>
        <p>• CloudSync - Real-time file synchronization</p>
        <p>• DataPipe - ETL pipeline framework</p>
      </div>
      
      <div className="mt-6">
        <p className="text-green-400">shaurya@dev:~$ <span className="animate-pulse">_</span></p>
      </div>
    </div>
  );
}
