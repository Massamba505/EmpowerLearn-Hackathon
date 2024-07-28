// import React from 'react';
import './Homepage.css'; // Import the CSS file for styling
import heroImage from '../../assets/Images/home.jpg'; // Add your image path
import featureImage1 from '../../assets/Images/live.jpg'; // Add your image path
import featureImage2 from '../../assets/Images/interactive.jpg'; // Add your image path
import featureImage3 from '../../assets/Images/comm.jpg'; // Add your image path
// import bannerImage from '../../assets/Images/comm.jpg'; // Add your image path
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigator = useNavigate();

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
          <div className="feature-card" onClick = {()=>navigator("/live-tutoring")}>
            <img src={featureImage1} alt="Live Tutoring" className="feature-image" />
            <h3>Live Tutoring</h3>
            <p>Connect with skilled educators for live sessions.</p>
          </div>
          <div className="feature-card" onClick = {()=>navigator("/live-tutoring")}>
            <img src={featureImage2} alt="Interactive Content" className="feature-image" />
            <h3>Interactive Content</h3>
            <p>Engaging multimedia content to enhance learning.</p>
          </div>
          <div className="feature-card"  onClick = {()=>navigator("/community-page")}>
            <img src={featureImage3} alt="Community Support" className="feature-image" />
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
