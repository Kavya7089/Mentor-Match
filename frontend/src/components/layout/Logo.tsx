import React from 'react';
import logo from '../../assets/logo.png'; // Adjust the path if needed

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-600">
      <img src={logo} alt="Logo" className="h-10 w-10 object-contain rounded-full" />
    </div>
  );
};

export default Logo;