import React, { useState } from 'react';
import './CreateForumPage.css'; // Import the CSS file for styling

const CreateForumPage = () => {
  const [forumName, setForumName] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    console.log(forumName);
    console.log(creator);
    console.log(description);
    e.preventDefault();
    fetch('/api/create_forum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ forumName:forumName, creator:creator, description:description }),
    })
      .then(res => res.text()) // Since the PHP script is echoing a plain text response
      .then(data => {
        setResponse(data);
        setForumName('');
        setCreator('');
        setDescription('');
      })
      .catch(error => console.error('Error creating forum:', error));
  };

  return (
    <div className="create-forum-page">
      <h1>Create a New Forum</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Forum Name:
            <input
              type="text"
              value={forumName}
              onChange={(e) => setForumName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Creator:
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>
        </div>
        <button type="submit">Create Forum</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default CreateForumPage;
