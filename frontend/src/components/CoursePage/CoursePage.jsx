import React, { useState } from 'react';
import './CoursePage.css'; // Import the CSS file for styling

const CoursePage = () => {
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(30); // Example progress value

  const handleEnrollment = () => {
    setEnrolled(!enrolled);
  };

  return (
    <div className="course-page">
      <header className="header">
        <h1>Course Title</h1>
        <p>Instructor: John Doe</p>
      </header>
      <main className="main">
        <section className="course-description">
          <h2>Course Description</h2>
          <p>
            This course provides an in-depth understanding of the subject matter, including practical applications and theoretical foundations. Perfect for beginners and advanced learners alike.
          </p>
        </section>
        <section className="content-list">
          <h2>Course Content</h2>
          <ul>
            <li>Introduction to the Subject</li>
            <li>Basic Concepts</li>
            <li>Advanced Topics</li>
            <li>Practical Applications</li>
            <li>Case Studies</li>
            <li>Final Project</li>
          </ul>
        </section>
        <section className="enrollment">
          <button onClick={handleEnrollment} className={`enroll-button ${enrolled ? 'enrolled' : ''}`}>
            {enrolled ? 'Enrolled' : 'Enroll Now'}
          </button>
        </section>
        <section className="progress-tracker">
          <h2>Progress Tracker</h2>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CoursePage;
