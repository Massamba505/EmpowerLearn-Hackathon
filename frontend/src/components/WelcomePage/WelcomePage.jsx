import React from 'react';
import './WelcomePage.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {

  const navigate = useNavigate(); // Use the navigate hook

  const handleLoginClick = () => {
    navigate('/login'); // Programmatically navigate to the login page
  };
  const handleSignupClick = () => {
    navigate('/signup'); // Programmatically navigate to the login page
  };


  return (
    <div className="welcome-page">
      <header className="header">
        <h1>Welcome to EmpowerLearn</h1>
      </header>
      <main className="main">
        <section className="intro">
          <h2>Empowering Education for All</h2>
          <p>Join us to access quality education, personalized learning, and community support.</p>
        </section>
        <section className="auth-options">
          <button className="login-button" onClick={handleLoginClick}>Login</button>
          <button className="signup-button" onClick={handleSignupClick}>Sign Up</button>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 EmpowerLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
