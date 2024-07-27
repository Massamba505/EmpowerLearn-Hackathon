import React from 'react';
import './WelcomePage.css'; // Import the CSS file for styling

const WelcomePage = () => {
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
          <button className="login-button" onClick={() => window.location.href='/login'}>Login</button>
          <button className="signup-button" onClick={() => window.location.href='/signup'}>Sign Up</button>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 EmpowerLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
