import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Start fade out after 1.8s, remove after 2.3s
    const fadeTimer = setTimeout(() => setFade(true), 1800);
    const removeTimer = setTimeout(onFinish, 2300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary-50 transition-opacity duration-500 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="splash-zoom">
        <Logo />
      </div>
    </div>
  );
};

export default SplashScreen;