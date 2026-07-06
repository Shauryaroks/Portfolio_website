import React, { useState, useEffect } from "react";
import data from "../content/blog.json";

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
  const posts = data.posts;

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
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-2 leading-tight">{selectedPost?.title}</h1>
            <div className="text-xs text-gray-500 mb-6">Author: {selectedPost?.author} | Date: {selectedPost?.date} | Category: {selectedPost?.category}</div>

            {selectedPost?.intro && (
              <p className="text-base mb-4 leading-relaxed">{selectedPost.intro}</p>
            )}

            {selectedPost?.quote && (
              <blockquote className="border-l-4 border-black pl-4 my-6 italic font-bold">
                "{selectedPost.quote}"
              </blockquote>
            )}

            {selectedPost?.sections?.map((section, i) => (
              <div key={i} className="mb-4">
                {section.heading && <h2 className="text-md font-bold mt-6 mb-2">{section.heading}</h2>}
                {section.body.split(/\n\n+/).map((para, j) => (
                  <p key={j} className="text-sm mb-3 leading-relaxed">{para}</p>
                ))}
              </div>
            ))}

            <div className="mt-8 flex gap-2 text-xs">
              <button className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white">[SHARE_LOG]</button>
              <button
                className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white"
                onClick={() => {
                  const idx = posts.findIndex(p => p.title === selectedPost?.title);
                  setSelectedPost(posts[(idx + 1) % posts.length]);
                }}
              >
                [NEXT_ENTRY]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
