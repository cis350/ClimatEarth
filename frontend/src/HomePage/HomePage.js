import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="welcome-message">Welcome to ClimatEarth</h1>

      <div className="earth-container">
        <img src={require("../images/earth.avif")} alt="Earth" width="300"/>
      </div>
      
      <p className="cta-buttons">
        <a href="/signup" className="cta-button">Get Started </a>
        <a href="/login" className="cta-button">Login </a>
      </p>
    </div>
  );
}

export default HomePage;
