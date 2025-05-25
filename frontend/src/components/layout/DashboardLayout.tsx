import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatbotButton from '../chat/ChatbotButton';
import { useUI } from '../../contexts/UIContext';
import bgimg from '../../assets/bgimg.png'; // Adjust the path if needed

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const { isSidebarOpen } = useUI();

  return (
    <div
      className="min-h-screen bg-primary-600 relative"
      style={{
        backgroundImage: `url(${bgimg})`, // Place your image in public/assets or adjust the path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />
        <Sidebar />

        <main
          className={`transition-all duration-300 ${
            isSidebarOpen ? 'lg:pl-64' : ''
          }`}
        >
          {(title || description) && (
            <div className="bg-primary-600 bg-opacity-45">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
                {description && <p className="mt-1 text-sm text-gray-200">{description}</p>}
              </div>
            </div>
          )}
          
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <ChatbotButton />
      </div>
    </div>
  );
};

export default DashboardLayout;