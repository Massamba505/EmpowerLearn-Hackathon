import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoursePage.css'; // Import the CSS file for styling

const CoursePage = ({ courseId, userId }) => {
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch course details
    axios.get(`/courses/${courseId}`)
      .then(response => {
        setCourse(response.data);
        // Check if the user is enrolled and fetch progress
        axios.get(`/users/${userId}/progress/${courseId}`)
          .then(progressResponse => {
            setEnrolled(true);
            setProgress(progressResponse.data.progress || 0);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, [courseId, userId]);

  const handleEnrollment = () => {
    if (enrolled) {
      // Unenroll logic (optional)
      axios.post(`/users/${userId}/unenroll/${courseId}`)
        .then(() => {
          setEnrolled(false);
          setProgress(0); // Reset progress on unenrollment
        })
        .catch(error => console.log(error));
    } else {
      // Enroll logic
      axios.post(`/users/${userId}/enroll/${courseId}`)
        .then(() => {
          setEnrolled(true);
          setProgress(0); // Reset progress on enrollment
        })
        .catch(error => console.log(error));
    }
  };

  const handleProgressUpdate = (newProgress) => {
    axios.put(`/courses/${courseId}/progress`, { userId, progress: newProgress })
      .then(() => {
        setProgress(newProgress);
      })
      .catch(error => console.log(error));
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-page">
      <header className="header">
        <h1>{course.title}</h1>
        <p>Instructor: {course.instructor}</p>
      </header>
      <main className="main">
        <section className="course-description">
          <h2>Course Description</h2>
          <p>{course.description}</p>
        </section>
        <section className="content-list">
          <h2>Course Content</h2>
          <ul>
            {course.contentList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
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
          <input
            type="number"
            value={progress}
            onChange={(e) => handleProgressUpdate(Number(e.target.value))}
            min="0"
            max="100"
            className="progress-input"
          />
        </section>
      </main>
    </div>
  );
};

export default CoursePage;
