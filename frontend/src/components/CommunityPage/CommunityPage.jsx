import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CommunityPage.css'; // Import the CSS file for styling

const CommunityPage = () => {
  const [forums, setForums] = useState([]);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch('/api/forums')
      .then(response => response.json())
      .then(data => setForums(data))
      .catch(error => console.error('Error fetching forums:', error));

    fetch('/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

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
          <Link to="/create-forum">
            <button className="create-button">Create Forum</button> {/* Updated button with Link */}
          </Link>
          {forums.map(forum => (
            <div key={forum.GROUP_NAME} className="forum-card">
              <h3>{forum.GROUP_NAME}</h3>
              <p><strong>Creator:</strong> {forum.CREATOR}</p>
              <p><strong>Participants:</strong> {forum.PARTICIPANTS}</p>
              <p>{forum.DESCRIPTION}</p>
              <Link to={`/forum/${forum.GROUP_NAME}`}>
                <button className="view-button">View Forum</button>
              </Link>
            </div>
          ))}
        </section>
        <section id="qa" className="qa">
          <h2>Q&A</h2>
          <Link to="/ask-question">
            <button className="ask-button">Ask Question</button> {/* Updated button with Link */}
          </Link>
          {questions.map(question => (
            <div key={question.QUESTIONID} className="qa-card">
              <h3>{question.NAME}</h3>
              <p>{question.MESSAGE}</p>
              <button className="view-button">View Answer</button>
            </div>
          ))}
          </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 EmpowerLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CommunityPage;
