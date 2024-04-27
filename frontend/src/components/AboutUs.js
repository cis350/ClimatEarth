import React from 'react';
import "./Component.css"

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="App-Title">About Us</h1>
      <p className="message">Our mission is to educate and inspire individuals to take action for a more sustainable future.</p>
      
      <h3 className="Sub-Title">Our Team</h3>
      <div className="team-members">
        <div className="team-member">
          <h4>Caroline Cummings</h4>
          <p></p>
        </div>
        <div className="team-member">
          <h4>Anjana Begur</h4>
          <p></p>
        </div>
        <div className="team-member">
          <h4>Preston Chan</h4>
          <p></p>
        </div>
        <div className="team-member">
          <h4>Shreya Balasubramanian</h4>
          <p></p>
        </div>
        <div className="team-member">
          <h4>Anna Vazhaeparambil</h4>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
