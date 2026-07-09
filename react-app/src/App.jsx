import React from 'react';
import { WindowManagerProvider } from './WindowManagerContext.jsx';
import WindowShells from './WindowShells.jsx';
import DesktopShortcuts from './DesktopShortcuts.jsx';
import MobileHome from './MobileHome.jsx';
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
          <div className="absolute inset-0 overflow-auto">
            <MobileHome />
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
