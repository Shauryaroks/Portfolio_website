import React, { useState, useEffect } from "react";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const EditorIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="2" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.33a2 2 0 0 1 0 2.66m-2.66 0a2 2 0 0 1 0-2.65" />
  </svg>
);

const LogIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export default function BlogWindow() {
  const posts = [
    { title: 'Designing in the Shell', date: '2024.10.12', category: 'UI_METHODOLOGY' },
    { title: 'Brutalist UI Principles', date: '2024.09.28', category: 'DESIGN' },
    { title: 'The Grid is Absolute', date: '2024.09.15', category: 'LAYOUT' },
  ];

  const [selectedPost, setSelectedPost] = useState(posts[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="w-full h-full bg-white font-mono text-sm flex flex-col text-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black text-white text-xs">
        <div className="flex gap-2 items-center">
          {isMobile && <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white mr-2">☰</button>}
          <span>TERMINAL</span>
          <span>SETTINGS</span>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex gap-4 px-4 py-2 bg-gray-100 border-b-2 border-black text-xs overflow-x-auto">
        <button className="flex items-center gap-1 hover:underline"><HomeIcon />Home</button>
        <button className="flex items-center gap-1 hover:underline"><FileIcon />FileSystem</button>
        <button className="flex items-center gap-1 hover:underline"><EditorIcon />Editor</button>
        <button className="flex items-center gap-1 hover:underline"><NetworkIcon />Network</button>
        <button className="flex items-center gap-1 hover:underline"><LogIcon />Log</button>
      </div>
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        {isMobile ? (
          <>
            <div className={`w-48 border-r-2 border-black p-2 flex flex-col gap-1 text-xs bg-gray-50 absolute left-0 top-0 bottom-0 transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="text-xs font-bold mb-2">Recent Artifacts</div>
              {posts.map((post, i) => (
                <button 
                  key={i}
                  className={`text-left p-1 hover:bg-gray-200 border border-transparent hover:border-black ${selectedPost?.title === post.title ? 'bg-gray-200 border-black' : ''}`}
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </button>
              ))}
            </div>
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-30"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        ) : (
          <div className="w-48 border-r-2 border-black p-2 flex flex-col gap-1 text-xs bg-gray-50">
            <div className="text-xs font-bold mb-2">Recent Artifacts</div>
            {posts.map((post, i) => (
              <button 
                key={i}
                className={`text-left p-1 hover:bg-gray-200 border border-transparent hover:border-black ${selectedPost?.title === post.title ? 'bg-gray-200 border-black' : ''}`}
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </button>
            ))}
          </div>
        )}
        
        {/* Content */}
        <div className={`flex-1 p-4 overflow-auto ${isMobile && sidebarOpen ? 'ml-48' : ''}`}>
          <h1 className="text-lg font-bold mb-4">{selectedPost?.title}</h1>
          <div className="text-xs text-gray-500 mb-4">Author: ARCHIVIST_ADMIN | Date: {selectedPost?.date} | Category: {selectedPost?.category}</div>
          
          <p className="text-sm mb-4">
            Modern UI has become a series of floating islands, soft shadows, and rounded pill-shapes that seek to hide the machinery of the digital world. The Shell Aesthetic rejects this comfort.
          </p>
          
          <blockquote className="border-l-4 border-black pl-4 my-4 italic font-bold">
            "The beauty is found in the precision of the pixel, the weight of the ink-black stroke, and the warmth of a parchment digital surface."
          </blockquote>
          
          <h2 className="text-md font-bold mt-6 mb-2">01. THE GRID IS ABSOLUTE</h2>
          <p className="text-sm mb-4">
            Every element must sit on the grid. We do not align by eye; we align by logic. The architectural layout of the "Digital Archivist" system demands that spacing is fixed. 16px, 24px, 32px. No half-measures.
          </p>
          
          <div className="mt-6 flex gap-2 text-xs">
            <button className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white">[SHARE_LOG]</button>
            <button className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white">[NEXT_ENTRY]</button>
          </div>
        </div>
      </div>
    </div>
  );
}
