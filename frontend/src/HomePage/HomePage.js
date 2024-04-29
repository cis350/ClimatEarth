import React from 'react';
import './HomePage.css';
import AboutUs from "./AboutUs.js"

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="welcome-message">Welcome to ClimatEarth</h1>

      <div className="earth-container">
        <img src={require("../images/earth.gif")} alt="Earth" width="300"/>
      </div>
      
      <p className="cta-buttons">
        <a href="/signup" className="cta-button">Get Started </a>
        <a href="/login" className="cta-button">Login </a>
      </p>
      <div className='spacer'></div>
      <hr></hr>
      <div className='spacer'></div>
      <AboutUs />
    </div>
  );
}

export default HomePage;
