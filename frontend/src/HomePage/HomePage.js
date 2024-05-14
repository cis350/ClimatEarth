import React from 'react';
import './HomePage.css';
import { useParams } from 'react-router-dom';
import AboutUs from "./AboutUs.js"
import NavBar from "../Navigation/Navbar.js";

const HomePage = () => {
  const { username } = useParams();
  return (
    <div>
      <NavBar></NavBar>
    <div className="home-page">
      <h1 className="welcome-message">Welcome to ClimatEarth</h1>

      <div className="earth-container">
        <img src={require("../images/earth.gif")} alt="Earth" width="300"/>
      </div>
      
      <p className="cta-buttons">
        <a href="/signup" className="cta-button">Get Started </a>
        <a href={`/${username}/login`} className="cta-button">Login </a>
      </p>
      <div className='spacer'></div>
      <hr></hr>
      <div className='spacer'></div>
      <AboutUs />
    </div>
    </div>
  );
}

export default HomePage;
