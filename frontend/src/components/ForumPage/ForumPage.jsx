import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ForumPage.css'; // Import the CSS file for styling
import { useAuthContext } from '../../context/authContext';

const ForumPage = () => {
  const {authUser}=useAuthContext();
  //setUsername(authUser);
  const { groupName } = useParams(); // Get groupName from URL parameters
  const [posts, setPosts] = useState([]);
  const [responses, setResponses] = useState({});
  const [username, setUsername] = useState(authUser.fullname);
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [activePost, setActivePost] = useState(null);
  
  //console.log("squeeze");
  //console.log(authUser);
  //console.log("theorem");
  
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

    console.log(username);
    console.log(message);
    console.log(groupName);
    //this one is for the main POSTS to FORUM_POST
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:username, message:message,group_name:groupName }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        setMessage(''); 
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:username, message:message,group_name:groupName }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data); 
        setResponseMessage(''); 
        fetchResponses(postId); 
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
