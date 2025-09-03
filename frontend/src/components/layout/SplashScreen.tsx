import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Spline from '@splinetool/react-spline';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Start fade out after 10s
    const fadeTimer = setTimeout(() => setFade(true), 10000);
    const removeTimer = setTimeout(onFinish, 10500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <main
      className={`fixed inset-0 z-50 flex  flex-col items-center justify-center bg-primary-800 transition-opacity duration-500 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Removed splash-zoom to disable zoom effect */}
      <Spline
        scene="https://prod.spline.design/u2zXmXOzqxnFmDVM/scene.splinecode"
      />
      <h3
      className='text-white text-3xl font-extrabold flex justify-center m-8'>Welcome! to mentor match</h3>
    </main>
  );
};

export default SplashScreen;
