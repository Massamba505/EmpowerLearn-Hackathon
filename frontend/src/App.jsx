import React from 'react';
import HomePage from './components/HomePage/Homepage'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import LiveTutoringPage from './components/LiveTutorial/LiveTutorial';
import Dashboard from './components/Dashboard/Dashboard';
import CoursePage from './components/CoursePage/CoursePage';
import CommunityPage from './components/CommunityPage/CommunityPage';

const App = () => {
  return (
    <div className="App">
      <CoursePage />
    </div>
  );
};

export default App;