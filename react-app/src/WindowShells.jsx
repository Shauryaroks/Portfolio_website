import React, { useRef, useContext, useState, useEffect, useCallback } from "react";
import { WindowManagerContext } from "./WindowManagerContext";
import TerminalWindow from "./TerminalWindow";
import ExplorerWindow from "./windows/ExplorerWindow";
import BlogWindow from "./windows/BlogWindow";
import MailWindow from "./windows/MailWindow";
import ResumeWindow from "./windows/ResumeWindow";
import AboutWindow from "./windows/AboutWindow";

const windowComponents = {
  terminal: TerminalWindow,
  explorer: ExplorerWindow,
  blog: BlogWindow,
  mail: MailWindow,
  resume: ResumeWindow,
  about: AboutWindow,
};

export default function WindowShells() {
  const { windows, focusedWindowId, focusWindow, closeWindow, updateWindow } = useContext(WindowManagerContext);
  const [showDevTools, setShowDevTools] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth || 1200, height: window.innerHeight || 820 });
  
  const dragState = useRef({ isDragging: false, startX: 0, startY: 0, startWinX: 0, startWinY: 0, winId: null });
  const resizeState = useRef({ isResizing: false, direction: '', startX: 0, startY: 0, startWidth: 0, startHeight: 0, startWinX: 0, startWinY: 0, winId: null });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = useCallback((e, win, direction = null) => {
    e.preventDefault();
    e.stopPropagation();
    focusWindow(win.id);
    
    if (direction) {
      resizeState.current = {
        isResizing: true,
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: win.width,
        startHeight: win.height,
        startWinX: win.x,
        startWinY: win.y,
        winId: win.id
      };
    } else if (!win.maximized) {
      dragState.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startWinX: win.x,
        startWinY: win.y,
        winId: win.id
      };
    }
  }, [focusWindow]);

  const handleMouseMove = useCallback((e) => {
    if (dragState.current.isDragging && dragState.current.winId) {
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      const newX = Math.max(0, Math.min(windowSize.width - 100, dragState.current.startWinX + dx));
      const newY = Math.max(0, Math.min(windowSize.height - 50, dragState.current.startWinY + dy));
      updateWindow(dragState.current.winId, { x: newX, y: newY });
    }
    
    if (resizeState.current.isResizing && resizeState.current.winId) {
      const dx = e.clientX - resizeState.current.startX;
      const dy = e.clientY - resizeState.current.startY;
      const dir = resizeState.current.direction;
      
      let newWidth = resizeState.current.startWidth;
      let newHeight = resizeState.current.startHeight;
      let newX = resizeState.current.startWinX;
      let newY = resizeState.current.startWinY;
      
      if (dir.includes('e')) newWidth = Math.max(300, resizeState.current.startWidth + dx);
      if (dir.includes('w')) {
        newWidth = Math.max(300, resizeState.current.startWidth - dx);
        newX = resizeState.current.startWinX + dx;
      }
      if (dir.includes('s')) newHeight = Math.max(200, resizeState.current.startHeight + dy);
      if (dir.includes('n')) {
        newHeight = Math.max(200, resizeState.current.startHeight - dy);
        newY = resizeState.current.startWinY + dy;
      }
      
      updateWindow(resizeState.current.winId, { width: newWidth, height: newHeight, x: newX, y: newY });
    }
  }, [windowSize, updateWindow]);

  const handleMouseUp = useCallback(() => {
    dragState.current.isDragging = false;
    dragState.current.winId = null;
    resizeState.current.isResizing = false;
    resizeState.current.winId = null;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleMinimize = (winId) => {
    const win = windows[winId];
    updateWindow(winId, { minimized: !win.minimized });
  };

  const handleMaximize = (winId) => {
    const win = windows[winId];
    const currentlyFullscreen = win.isFullscreen === true;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const isMobile = window.innerWidth < 768;
    
    if (currentlyFullscreen) {
      if (!isMobile && document.fullscreenElement) {
        document.exitFullscreen();
      }
      if (isMobile) {
        updateWindow(winId, { 
          isFullscreen: false,
          x: 0,
          y: 0,
          width: screenW,
          height: screenH
        });
      } else {
        updateWindow(winId, { 
          isFullscreen: false,
          x: win.prevX || 10,
          y: win.prevY || 10,
          width: win.prevWidth || 300,
          height: win.prevHeight || 400
        });
      }
    } else {
      if (!isMobile) {
        setTimeout(() => {
          document.documentElement.requestFullscreen();
        }, 10);
      }
      updateWindow(winId, { 
        isFullscreen: true,
        prevX: win.x,
        prevY: win.y,
        prevWidth: win.width,
        prevHeight: win.height,
        x: 0,
        y: 0,
        width: screenW,
        height: screenH
      });
    }
  };

  return (
    <>
      {Object.values(windows).filter(w => w.open && !w.minimized).map((win) => {
        const isFocused = focusedWindowId === win.id;
        const WindowComponent = windowComponents[win.id] || (() => <div />);
        
        return (
          <div
            key={win.id}
            className={`absolute bg-white border-2 border-black flex flex-col ${isFocused ? '' : 'opacity-70'}`}
            style={{
              top: win.y,
              left: win.x,
              width: win.width,
              height: win.height,
              zIndex: win.zIndex,
            }}
            onMouseDown={() => focusWindow(win.id)}
          >
            {/* Window Title Bar - draggable */}
            <div 
              className="flex items-center justify-between bg-black px-3 py-2 border-b-2 border-black select-none flex-shrink-0"
              onMouseDown={(e) => handleMouseDown(e, win)}
              style={{ cursor: win.maximized ? 'default' : 'move' }}
            >
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <button 
                  className="w-5 h-5 rounded-full bg-red-500 border-2 border-red-700 hover:bg-red-600 transition-colors focus:outline-none"
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                />
                <button 
                  className="w-5 h-5 rounded-full bg-green-500 border-2 border-green-700 hover:bg-green-600 transition-colors focus:outline-none"
                  onClick={(e) => { e.stopPropagation(); handleMaximize(win.id); }}
                />
              </div>
              
              {/* Center: Title */}
              <span className="text-white text-sm font-mono font-bold uppercase tracking-wide absolute left-1/2 transform -translate-x-1/2">
                {win.title}
              </span>
              
              <div className="w-16"></div>
            </div>
            
            {/* Window Content - White background */}
            <div className="flex-1 overflow-auto bg-white">
              <WindowComponent />
            </div>
            
            {/* Resize Handles - Only show when focused and not maximized */}
            {isFocused && !win.maximized && (
              <>
                <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={(e) => handleMouseDown(e, win, 'nw')} />
                <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={(e) => handleMouseDown(e, win, 'ne')} />
                <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={(e) => handleMouseDown(e, win, 'sw')} />
                <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={(e) => handleMouseDown(e, win, 'se')} />
                <div className="absolute top-0 left-3 right-3 h-1 cursor-n-resize" onMouseDown={(e) => handleMouseDown(e, win, 'n')} />
                <div className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize" onMouseDown={(e) => handleMouseDown(e, win, 's')} />
                <div className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize" onMouseDown={(e) => handleMouseDown(e, win, 'w')} />
                <div className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize" onMouseDown={(e) => handleMouseDown(e, win, 'e')} />
              </>
            )}
          </div>
        );
      })}
      
      {showDevTools && (
        <div className="fixed top-12 right-2 bg-black text-white text-xs p-2 z-[9999] max-h-[60vh] overflow-auto font-mono border-2 border-black">
          <pre>{JSON.stringify(windows, null, 2)}</pre>
        </div>
      )}
      <button
        onClick={() => setShowDevTools(v => !v)}
        className="fixed bottom-10 right-2 bg-white border border-black px-2 py-1 text-xs font-mono z-50 hover:bg-gray-100"
      >
        {showDevTools ? 'Hide' : 'Show'} Dev
      </button>
    </>
  );
}
