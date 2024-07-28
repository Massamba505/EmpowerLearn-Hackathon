import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import LiveTutoringPage from './components/LiveTutorial/LiveTutorial';
import Dashboard from './components/Dashboard/Dashboard';
import CoursePage from './components/CoursePage/CoursePage';
import CommunityPage from './components/CommunityPage/CommunityPage';
import AdminDashboard from './components/AdminDashBoard/AdminDashboard';
import WelcomePage from './components/WelcomePage/WelcomePage';
import CourseCard from './components/interactiveHome/interactiveHome';
import Auth from './components/Auth';
import { Toaster } from 'react-hot-toast';
import VideoChat from './components/VideoChat/VideoChat';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/live-tutoring" element={<VideoChat />} />
        <Route path="/CourseCard" element={<CourseCard />} />
        {/* Protected routes */}
        <Route path="/home" element={<Auth element={<HomePage />} requiresAuth={true} />} />
        <Route path="/live-tutoring" element={<Auth element={<LiveTutoringPage />} requiresAuth={true} />} />
        <Route path="/dashboard" element={<Auth element={<Dashboard />} requiresAuth={true} />} />
        <Route path="/course-page" element={<Auth element={<CoursePage />} requiresAuth={true} />} />
        <Route path="/community-page" element={<Auth element={<CommunityPage />} requiresAuth={true} />} />
        <Route path="/admin-dashboard" element={<Auth element={<AdminDashboard />} requiresAuth={true} />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;