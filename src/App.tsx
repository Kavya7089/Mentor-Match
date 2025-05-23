import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import Loader from './components/layout/Loader';
import SplashScreen from './components/layout/SplashScreen';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import MentorDashboard from './pages/dashboard/MentorDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import HybridDashboard from './pages/dashboard/HybridDashboard';
import ChainMines from './pages/chain-mines/ChainMines';
import Resources from './pages/resources/Resources';
import ChatBot from './pages/chat/ChatBot';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import NotFound from './pages/NotFound';
import ProfilePage from './components/profile/ProfilePage';
import MenteeRequests from './pages/MenteeRequests';
import Assignments from './pages/Assignments';
import AvailableMentors from './pages/AvailableMentors';
import MyAssignments from './pages/MyAssignments';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000); // 3 seconds
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/mentor-dashboard" element={
        <PrivateRoute>
          <MentorDashboard />
        </PrivateRoute>
      } />
      <Route path="/student-dashboard" element={
        <PrivateRoute>
          <StudentDashboard />
        </PrivateRoute>
      } />
      <Route path="/hybrid-dashboard" element={
        <PrivateRoute>
          <HybridDashboard />
        </PrivateRoute>
      } />
      <Route path="/chain-mines" element={
        <PrivateRoute>
          <ChainMines />
        </PrivateRoute>
      } />
      <Route path="/resources" element={
        <PrivateRoute>
          <Resources />
        </PrivateRoute>
      } />
      <Route path="/chat" element={
        <PrivateRoute>
          <ChatBot />
        </PrivateRoute>
      } />
    
      <Route path="/mentee-requests" element={
        <PrivateRoute>
          <MenteeRequests />
        </PrivateRoute>
      } />
      <Route path="/assignments" element={
        <PrivateRoute>
          <Assignments />
        </PrivateRoute>
      } />
     
      <Route path="/available-mentors" element={
        <PrivateRoute>
          <AvailableMentors />
        </PrivateRoute>
      } />
      <Route path="/my-assignments" element={
        <PrivateRoute>
          <MyAssignments />
        </PrivateRoute>
      } />
      
      {/* Catch all not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Only show splash on first load
    // If you want to show it every reload, keep as is
    // If you want to show only once per session, use sessionStorage
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <AuthProvider>
        <UIProvider>
          <AppRoutes />
        </UIProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;