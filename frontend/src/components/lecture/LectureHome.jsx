import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './lecture.css'; // Import the CSS file for styling
import heroImage from '../../assets/Images/home.jpg'; // Add your image path
import featureImage1 from '../../assets/Images/live.jpg'; // Add your image path
import featureImage2 from '../../assets/Images/interactive.jpg'; // Add your image path
import featureImage3 from '../../assets/Images/comm.jpg'; // Add your image path
import bannerImage from '../../assets/Images/comm.jpg'; // Add your image path


const Lecture = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (card) => setHoveredCard(card);
  const handleMouseLeave = () => setHoveredCard(null);

  const handleNavigation = (path) => {
    navigate(path);
    
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to EmpowerLearn lecture page</h1>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main className="main">
        <section className="hero">
         
          <h2>Empowering Education for Underprivileged Communities</h2>
          <p>Providing access to quality education, personalized learning, and community support.</p>
          <a href="#features" className="cta-button">Get Started</a>
        </section>
        <section id="features" className="features">
          <h2>Our Features</h2>
          <div
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: hoveredCard === 'card1' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: hoveredCard === 'card1' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'
            }}
           
           
            className="feature-card"
            onClick={() => handleNavigation('/up')}
            onMouseEnter={() => handleMouseEnter('card3')}
            onMouseLeave={handleMouseLeave}
          >
            <img src={featureImage3} alt="Community Support" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <h3>Upload resources</h3>
            <p>upload resources for students</p>
          </div>
        </section>
        <section id="about" className="about">
          <h2>About Us</h2>
          <p>We are dedicated to bridging the educational gap and providing opportunities for growth.</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 EmpowerLearn. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </nav>
      </footer>
    </div>
  );
};

export default Lecture;
