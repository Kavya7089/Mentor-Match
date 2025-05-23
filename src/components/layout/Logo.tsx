import React from 'react';
import logo from '../../logo.png'; // Adjusted path

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-600 text-white">
      <img src={logo} alt="" />
    </div>
  );
};  

export default Logo;