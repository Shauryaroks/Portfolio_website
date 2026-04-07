import React, { createContext, useContext, useReducer, useCallback } from 'react';

const getDefaults = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (isMobile) {
    return {
      terminal:  { id: 'terminal', title: 'Terminal', x: 0,  y: 0, width: 320, height: 400, open: false,  zIndex: 12, maximized: false, minimized: false, isFullscreen: false },
      explorer:  { id: 'explorer', title: 'Explorer', x: 0, y: 0, width: 320, height: 500, open: false, zIndex: 5, maximized: false, minimized: false, isFullscreen: false },
      blog:      { id: 'blog',     title: 'Blog',     x: 0, y: 0, width: 320, height: 520, open: false, zIndex: 4, maximized: false, minimized: false, isFullscreen: false },
      mail:      { id: 'mail',     title: 'Mail',    x: 0, y: 0, width: 320, height: 520, open: false, zIndex: 3, maximized: false, minimized: false, isFullscreen: false },
      resume:    { id: 'resume',   title: 'Resume',  x: 0, y: 0, width: 320, height: 580, open: false, zIndex: 2, maximized: false, minimized: false, isFullscreen: false },
      about:     { id: 'about',    title: 'About',   x: 0, y: 0, width: 320, height: 520, open: false, zIndex: 1, maximized: false, minimized: false, isFullscreen: false },
    };
  }
  
  return {
    terminal:  { id: 'terminal', title: 'Terminal', x: 600,  y: 60, width: 600, height: 600, open: true,  zIndex: 12, maximized: false, minimized: false, isFullscreen: false },
    explorer:  { id: 'explorer', title: 'Explorer', x: 120, y: 100, width: 700, height: 500, open: false, zIndex: 5, maximized: false, minimized: false, isFullscreen: false },
    blog:      { id: 'blog',     title: 'Blog',     x: 160, y: 120, width: 650, height: 550, open: false, zIndex: 4, maximized: false, minimized: false, isFullscreen: false },
    mail:      { id: 'mail',     title: 'Mail',    x: 200, y: 140, width: 800, height: 600, open: false, zIndex: 3, maximized: false, minimized: false, isFullscreen: false },
    resume:    { id: 'resume',   title: 'Resume',  x: 250, y: 160, width: 600, height: 700, open: false, zIndex: 2, maximized: false, minimized: false, isFullscreen: false },
    about:     { id: 'about',    title: 'About',   x: 300, y: 180, width: 550, height: 600, open: false, zIndex: 1, maximized: false, minimized: false, isFullscreen: false },
  };
};

const defaultWindows = getDefaults();

function reducer(state, action) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            open: true,
            zIndex: state.maxZ + 1,
            x: isMobile ? 0 : state.windows[action.id].x,
            y: isMobile ? 0 : state.windows[action.id].y,
            width: isMobile ? window.innerWidth : state.windows[action.id].width,
            height: isMobile ? window.innerHeight : state.windows[action.id].height,
            isFullscreen: isMobile,
          },
        },
        focusedWindowId: action.id,
        maxZ: state.maxZ + 1,
      };
    case "CLOSE":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            open: false,
          },
        },
        focusedWindowId:
          state.focusedWindowId === action.id
            ? null
            : state.focusedWindowId,
      };
    case "FOCUS":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            zIndex: state.maxZ + 1,
          },
        },
        focusedWindowId: action.id,
        maxZ: state.maxZ + 1,
      };
    case "UPDATE":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            ...action.update,
          },
        },
      };
    default:
      return state;
  }
}

export const WindowManagerContext = createContext();

export function WindowManagerProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    windows: defaultWindows,
    focusedWindowId: 'terminal',
    maxZ: 12,
  });
  const openWindow = useCallback((id) => dispatch({ type: "OPEN", id }), []);
  const closeWindow = useCallback((id) => dispatch({ type: "CLOSE", id }), []);
  const focusWindow = useCallback((id) => dispatch({ type: "FOCUS", id }), []);
  const updateWindow = useCallback((id, update) => dispatch({ type: "UPDATE", id, update }), []);
  return (
    <WindowManagerContext.Provider value={{
      windows: state.windows,
      focusedWindowId: state.focusedWindowId,
      openWindow,
      closeWindow,
      focusWindow,
      updateWindow,
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
}
