import React from 'react';
import Logo from './Logo';

const Loader: React.FC = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary-200">
    <div className="mb-6 animate-fade-in">
      <Logo />
    </div>
    <div className="flex items-center space-x-2">
      <div className="h-3 w-3 rounded-full bg-primary-800 animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="h-3 w-3 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '0.15s' }} />
      <div className="h-3 w-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
    </div>
    <span className="mt-4 text-primary-700 font-medium tracking-wide">Loading...</span>
  </div>
);

export default Loader;