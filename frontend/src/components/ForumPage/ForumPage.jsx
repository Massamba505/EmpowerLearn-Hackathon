import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ForumPage.css'; // Import the CSS file for styling

const ForumPage = () => {
  const { groupName } = useParams(); // Get groupName from URL parameters
  const [posts, setPosts] = useState([]);
  const [responses, setResponses] = useState({});
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    fetch(`/api/forums/${groupName}`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [groupName]);

  const fetchResponses = (postId) => {
    fetch(`/api/responses/${postId}`)
      .then(response => response.json())
      .then(data => setResponses(prevResponses => ({ ...prevResponses, [postId]: data })))
      .catch(error => console.error('Error fetching responses:', error));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('message', message);
    formData.append('group_name', groupName);

    fetch('/api/forums/insert', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        alert(data); // Show success message
        setMessage(''); // Clear the message input
        fetch(`/api/forums/${groupName}`)
          .then(response => response.json())
          .then(data => setPosts(data))
          .catch(error => console.error('Error fetching posts:', error));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmitResponse = (postId, e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('post_id', postId);
    formData.append('username', username);
    formData.append('message', responseMessage);

    fetch('/api/responses', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        alert(data); // Show success message
        setResponseMessage(''); // Clear the response message input
        fetchResponses(postId); // Refresh responses
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handlePostClick = (postId) => {
    if (responses[postId]) {
      setActivePost(postId);
    } else {
      fetchResponses(postId);
      setActivePost(postId);
    }
  };

  return (
    <div className="forum-page">
      <header className="header">
        <h1>{groupName} Forum</h1>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="#qa">Q&A</a>
        </nav>
      </header>
      <main className="main">
        <section className="new-post">
          <h2>What's on your mind?</h2>
          <form onSubmit={handleSubmitPost}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit">Post</button>
          </form>
        </section>
        <section className="posts">
          <h2>Posts</h2>
          {posts.map(post => (
            <div key={post.POST_ID} className="post-card">
              <h3>{post.USERNAME}</h3>
              <p>{post.MESSAGE}</p>
              <p><strong>Answers:</strong> {post.ANSWER_COUNT}</p>
              <button onClick={() => handlePostClick(post.POST_ID)}>View Responses</button>
              {activePost === post.POST_ID && (
                <div className="responses">
                  {responses[post.POST_ID] && responses[post.POST_ID].map(response => (
                    <div key={response.RESPONSE_ID} className="response-card">
                      <h4>{response.USERNAME}</h4>
                      <p>{response.MESSAGE}</p>
                    </div>
                  ))}
                  <form onSubmit={(e) => handleSubmitResponse(post.POST_ID, e)}>
                    <div>
                      <label>Username:</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Message:</label>
                      <textarea
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit">Respond</button>
                  </form>
                </div>
              )}
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

export default ForumPage;
