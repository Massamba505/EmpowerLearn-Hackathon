import React from 'react';
import './CommunityPage.css'; // Import the CSS file for styling

const CommunityPage = () => {
  return (
    <div className="community-page">
      <header className="header">
        <h1>Community Interaction</h1>
        <nav className="nav">
          <a href="#forums">Forums</a>
          <a href="#qa">Q&A</a>
        </nav>
      </header>
      <main className="main">
        <section id="forums" className="forums">
          <h2>Forums</h2>
          <div className="forum-card">
            <h3>General Discussion</h3>
            <p>Share your thoughts and ideas with the community.</p>
            <button className="view-button">View Forum</button>
          </div>
          <div className="forum-card">
            <h3>Study Tips</h3>
            <p>Discuss and share effective study techniques.</p>
            <button className="view-button">View Forum</button>
          </div>
        </section>
        <section id="qa" className="qa">
          <h2>Q&A</h2>
          <div className="qa-card">
            <h3>How to solve quadratic equations?</h3>
            <p>Posted by: Alice</p>
            <button className="view-button">View Answer</button>
          </div>
          <div className="qa-card">
            <h3>Best resources for learning Python?</h3>
            <p>Posted by: Bob</p>
            <button className="view-button">View Answer</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 EmpowerLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CommunityPage;
