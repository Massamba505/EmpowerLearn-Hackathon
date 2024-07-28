import React, { useState } from 'react';
import './AskQuestionPage.css'; // Import the CSS file for styling

const AskQuestionPage = () => {
  const [name, setUsername] = useState('');
  const [message, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/ask_question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, message }),
    })
      .then(res => res.text())
      .then(data => {
        setResponse(data);
        setUsername('');
        setQuestion('');
      })
      .catch(error => console.error('Error asking question:', error));
  };

  return (
    <div className="ask-question-page">
      <h1>Ask a Question</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Question:
            <textarea
              value={message}
              onChange={(e) => setQuestion(e.target.value)}
              required
            ></textarea>
          </label>
        </div>
        <button type="submit">Ask Question</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default AskQuestionPage;
