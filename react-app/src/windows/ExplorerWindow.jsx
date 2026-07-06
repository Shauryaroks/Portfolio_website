import React, { useState, useEffect } from "react";
import data from "../content/explorer.json";

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="black" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="black" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="black" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="7 9 9.5 11.5 7 14" />
    <line x1="12" y1="14" x2="17" y2="14" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="black" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const projects = data.files;

export default function ExplorerWindow() {
  const [viewMode, setViewMode] = useState('list');
  const [selectedItem, setSelectedItem] = useState(null);
  const currentPath = data.path;
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'folder': return <FolderIcon />;
      case 'terminal': return <TerminalIcon />;
      case 'image': return <ImageIcon />;
      default: return <FileIcon />;
    }
  };

  return (
    <div className="w-full h-full bg-white font-mono text-sm flex flex-col text-black">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 border-b-2 border-black text-xs">
        <div className="ml-4 flex gap-2">
          <button className="hover:underline">{currentPath}</button>
          <span>|</span>
          <button className="hover:underline">search</button>
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'font-bold' : ''}>List</button>
          <button onClick={() => setViewMode('icons')} className={viewMode === 'icons' ? 'font-bold' : ''}>Icons</button>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs">
        {isMobile && <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">☰</button>}
        <span>&lt;</span>
        <span>&gt;</span>
        <span className="ml-2">folder {currentPath}</span>
        <div className="ml-auto">
          <span>Storage: 64% used</span>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        {isMobile ? (
          <>
            <div className={`w-32 border-r-2 border-black bg-gray-50 p-2 flex flex-col gap-1 text-xs absolute left-0 top-0 bottom-0 transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <button className="text-left px-2 py-1 hover:bg-gray-200 border border-black">HOME</button>
              <button className="text-left px-2 py-1 hover:bg-gray-200">BIN</button>
              <button className="text-left px-2 py-1 hover:bg-gray-200">DEV</button>
              <button className="text-left px-2 py-1 hover:bg-gray-200">ETC</button>
              <button className="text-left px-2 py-1 hover:bg-gray-200">VAR</button>
            </div>
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-30"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        ) : (
          <div className="w-32 border-r-2 border-black bg-gray-50 p-2 flex flex-col gap-1 text-xs group">
            <button className="text-left px-2 py-1 hover:bg-gray-200 border border-black">HOME</button>
            <button className="text-left px-2 py-1 hover:bg-gray-200">BIN</button>
            <button className="text-left px-2 py-1 hover:bg-gray-200">DEV</button>
            <button className="text-left px-2 py-1 hover:bg-gray-200">ETC</button>
            <button className="text-left px-2 py-1 hover:bg-gray-200">VAR</button>
          </div>
        )}
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden ${isMobile && sidebarOpen ? 'ml-32' : ''}`}>
          <div className="flex-1 p-2 overflow-auto">
            <div className="grid grid-cols-4 gap-2">
              {projects.map((item, i) => (
                <button 
                  key={i}
                  className={`flex flex-col items-center p-2 border-2 border-transparent hover:border-black hover:bg-gray-100 ${selectedItem?.name === item.name ? 'border-black bg-gray-100' : ''}`}
                  onClick={() => setSelectedItem(item)}
                >
                  {getIcon(item.type)}
                  <span className="text-xs mt-1 text-center leading-tight">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {selectedItem && (
            <div className="border-t-2 border-black p-3 bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="text-4xl">
                  {getIcon(selectedItem.type)}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold mb-1">{selectedItem.name}</div>
                  <div className="text-xs">
                    {selectedItem.type === 'folder' ? 'COMPRESSED ARCHIVE' : 'FILE'}
                  </div>
                  {selectedItem.size !== 'N/A' && (
                    <div className="text-xs mt-1">Size: {selectedItem.size}</div>
                  )}
                  <div className="text-xs mt-1">
                    Stack: {selectedItem.tech}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="border-2 border-black px-2 py-1 text-xs hover:bg-black hover:text-white">Open</button>
                  <button className="border-2 border-black px-2 py-1 text-xs hover:bg-black hover:text-white">Details</button>
                </div>
              </div>
            </div>
          )}
          
          <div className="border-t-2 border-black px-2 py-1 text-xs flex items-center gap-2 bg-gray-50">
            <span>{projects.length} Objects</span>
            <span>{selectedItem ? `${selectedItem.size} Selected` : 'None Selected'}</span>
            <span className="ml-auto">Synced: 12:00:04</span>
          </div>
        </div>
      </div>
    </div>
  );
}
