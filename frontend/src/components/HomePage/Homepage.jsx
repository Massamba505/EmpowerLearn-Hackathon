import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import the CSS file for styling
import heroImage from '../../assets/Images/home.jpg'; // Add your image path
import featureImage1 from '../../assets/Images/live.jpg'; // Add your image path
import featureImage2 from '../../assets/Images/interactive.jpg'; // Add your image path
import featureImage3 from '../../assets/Images/comm.jpg'; // Add your image path
import bannerImage from '../../assets/Images/comm.jpg'; // Add your image path


const HomePage = () => {
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
        <h1>Welcome to EmpowerLearn</h1>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main className="main">
        <section className="hero">
          <img src={heroImage} alt="Hero" className="hero-image" />
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
            onClick={() => handleNavigation('/live-tutoring')}
            onMouseEnter={() => handleMouseEnter('card1')}
            onMouseLeave={handleMouseLeave}
          >
            <img src={featureImage1} alt="Live Tutoring" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <h3>Live Tutoring</h3>
            <p>Connect with skilled educators for live sessions.</p>
          </div>
          <div
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: hoveredCard === 'card2' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: hoveredCard === 'card2' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'
            }}
            className="feature-card"
            onClick={() => handleNavigation('/CourseCard')}
            onMouseEnter={() => handleMouseEnter('card2')}
            onMouseLeave={handleMouseLeave}
          >
            <img src={featureImage2} alt="Interactive Content" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <h3>Interactive Content</h3>
            <p>Engaging multimedia content to enhance learning.</p>
          </div>
          <div
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: hoveredCard === 'card3' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: hoveredCard === 'card3' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'
            }}
            className="feature-card"
            onClick={() => handleNavigation('/community-page')}
            onMouseEnter={() => handleMouseEnter('card3')}
            onMouseLeave={handleMouseLeave}
          >
            <img src={featureImage3} alt="Community Support" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <h3>Community Support</h3>
            <p>Join forums and connect with fellow learners.</p>
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

export default HomePage;
