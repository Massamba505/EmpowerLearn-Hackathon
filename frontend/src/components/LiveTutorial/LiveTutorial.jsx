import React from 'react';
import './LiveTutorial.css'; // Import the CSS file for styling

const LiveTutoringPage = () => {
  return (
    <div className="live-tutoring-page">
      <header className="header">
        <h1>Live Tutoring</h1>
        <nav className="nav">
          <a href="#sessions">Upcoming Sessions</a>
          <a href="#resources">Resources</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main className="main">
        <section id="sessions" className="sessions">
          <h2>Upcoming Sessions</h2>
          <div className="session-card">
            <h3>Mathematics 101</h3>
            <p>Date: August 1, 2024</p>
            <p>Time: 3:00 PM - 4:00 PM</p>
            <button className="join-button">Join Now</button>
          </div>
          <div className="session-card">
            <h3>Introduction to Science</h3>
            <p>Date: August 3, 2024</p>
            <p>Time: 5:00 PM - 6:00 PM</p>
            <button className="join-button">Join Now</button>
          </div>
        </section>
        <section id="resources" className="resources">
          <h2>Resources</h2>
          <ul>
            <li><a href="#resource1">Mathematics Study Guide</a></li>
            <li><a href="#resource2">Science Experiment Videos</a></li>
            <li><a href="#resource3">Tutoring Session Recordings</a></li>
          </ul>
        </section>
        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <p>If you have any questions, please reach out to our support team at <a href="mailto:support@empowerlearn.org">support@empowerlearn.org</a>.</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 EmpowerLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LiveTutoringPage;
