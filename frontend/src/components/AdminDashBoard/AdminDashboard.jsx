import React, { useState } from 'react';
import './AdminDashboard.css'; // Import the CSS file for styling

const AdminDashboard = () => {
  const [courses] = useState([
    { id: 1, title: 'Course 1', instructor: 'John Doe', progress: 45 },
    { id: 2, title: 'Course 2', instructor: 'Jane Smith', progress: 75 },
    // Add more courses here
  ]);

  const [sessions] = useState([
    { id: 1, title: 'Session 1', date: '2024-08-01', time: '10:00 AM' },
    { id: 2, title: 'Session 2', date: '2024-08-05', time: '2:00 PM' },
    // Add more sessions here
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Course 1 has been updated.', date: '2024-07-25' },
    { id: 2, message: 'New session scheduled for Course 2.', date: '2024-07-20' },
    // Add more notifications here
  ]);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>
      <main className="dashboard-content">
        <section className="enrolled-courses">
          <h2>Enrolled Courses</h2>
          <ul>
            {courses.map(course => (
              <li key={course.id}>
                <h3>{course.title}</h3>
                <p>Instructor: {course.instructor}</p>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${course.progress}%` }}
                  >
                    {course.progress}%
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="upcoming-sessions">
          <h2>Upcoming Sessions</h2>
          <ul>
            {sessions.map(session => (
              <li key={session.id}>
                <h3>{session.title}</h3>
                <p>Date: {session.date}</p>
                <p>Time: {session.time}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="notifications">
          <h2>Notifications</h2>
          <ul>
            {notifications.map(notification => (
              <li key={notification.id}>
                <p>{notification.message}</p>
                <p><small>{new Date(notification.date).toLocaleDateString()}</small></p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
