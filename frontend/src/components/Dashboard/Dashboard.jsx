import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>Welcome, [User's Name]</h1>
        <nav className="nav">
          <a href="#courses">Enrolled Courses</a>
          <a href="#progress">Progress</a>
          <a href="#sessions">Upcoming Sessions</a>
          <a href="#notifications">Notifications</a>
        </nav>
      </header>
      <main className="main">
        <section id="courses" className="courses">
          <h2>Enrolled Courses</h2>
          <div className="course-card">
            <h3>Mathematics 101</h3>
            <p>Instructor: John Doe</p>
            <button className="view-button">View Course</button>
          </div>
          <div className="course-card">
            <h3>Introduction to Science</h3>
            <p>Instructor: Jane Smith</p>
            <button className="view-button">View Course</button>
          </div>
        </section>
        <section id="progress" className="progress">
          <h2>Your Progress</h2>
          <div className="progress-bar">
            <label htmlFor="math-progress">Mathematics 101</label>
            <progress id="math-progress" value="70" max="100">70%</progress>
          </div>
          <div className="progress-bar">
            <label htmlFor="science-progress">Introduction to Science</label>
            <progress id="science-progress" value="40" max="100">40%</progress>
          </div>
        </section>
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
        <section id="notifications" className="notifications">
          <h2>Notifications</h2>
          <ul>
            <li>New assignment posted in Mathematics 101.</li>
            <li>Your session "Introduction to Science" starts in 2 days.</li>
            <li>Feedback on your recent submission is available.</li>
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 EmpowerLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
