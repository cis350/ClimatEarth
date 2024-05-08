import React, { useRef } from 'react';
import CreateComponent from './ComponentFactoryHOC';
import { signupUser } from '../api/auth'; // Import signup function
import "./Component.css"

function Signup() {
  let username; // will store the username. this value is destroyed after each rendering
  let password; // will store the password
  let confirmPassword;
  const usernameRef = useRef(''); // this  value will persist between rendering

  // input change event handler
  const handleUsernameChange = (e) => {
    username = e.target.value; // update local variable
    usernameRef.current = e.target.value; // update reference
    console.log('value', username);
  };

   // input change event handler
  const handlePasswordChange = (e) => {
    password = e.target.value; // update the reference
    console.log('value', password);
  };

  const handleConfirmPasswordChange = (e) => {
    confirmPassword = e.target.value; // update the reference
    console.log('value', password);
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Call signup function
    const success = await signupUser(username, password);

    if (success) {
      alert("Signup successful!");
      // Optionally redirect to login page or any other page
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sign Up</h1>
      <form onSubmit={handleSignup}>
      <div>
          <label>
            {' '}
            Username:
          <CreateComponent type={'input'} eventHandler={handleUsernameChange} text={'username'} />
          </label>
      </div>
      <div>
          <label>
            {' '}
            Password:
          <CreateComponent type={'input'} eventHandler={handlePasswordChange} text={'password'} />
          </label>
      </div>
      <div>
          <label>
            {' '}
            Confirm Password:
          <CreateComponent type={'input'} eventHandler={handleConfirmPasswordChange} text={'confirm Password'} />
          </label>
      </div>
      <CreateComponent type={'button'} eventHandler={handleSignup} text={'Sign Up'} />
    </form>
    <div className='spacer'></div>
    <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Signup;