import React from 'react';
import { WindowManagerProvider } from './WindowManagerContext.jsx';
import WindowShells from './WindowShells.jsx';
import DesktopShortcuts from './DesktopShortcuts.jsx';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = React.useState(null);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === null) {
    return null;
  }

  const showDesktopPrompt = window.innerWidth < 600;
  
  if (isMobile && showDesktopPrompt) {
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
        <div className="text-white text-5xl mb-6">🖥️</div>
        <h1 className="text-white text-2xl font-mono font-bold mb-4">Desktop Experience</h1>
        <p className="text-gray-400 font-mono text-sm mb-6 max-w-xs">
          This portfolio is best experienced on a desktop browser for the full interactive experience.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 border border-gray-600 text-gray-400 text-sm font-mono hover:text-white hover:border-gray-400 transition-colors"
        >
          Continue anyway
        </button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <WindowManagerProvider>
        <div 
          className="relative w-full h-screen overflow-hidden"
          style={{
            backgroundImage: `url('/wallhaven-l3971q_1920x1080.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 pt-2 pl-2 overflow-auto">
            <DesktopShortcuts />
          </div>
          <WindowShells />
        </div>
      </WindowManagerProvider>
    );
  }

  return (
    <WindowManagerProvider>
      <div 
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url('/wallhaven-l3971q_1920x1080.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <DesktopShortcuts />
        <WindowShells />
      </div>
    </WindowManagerProvider>
  );
}

export default App;
