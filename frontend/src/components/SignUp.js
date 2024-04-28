import React, { useState } from 'react';
import CreateComponent from './ComponentFactoryHOC';
import { signupUser } from '../api/auth'; // Import signup function
import "./Component.css"

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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
    <div className="App">
      <h1 className="App-Title">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="input-container">
            <label>Username:</label>
            <CreateComponent type={'input'} eventHandler={handleUsernameChange} text={'username'} />
        </div>
        <div className="input-container">
            <label>Password:</label>
            <CreateComponent type={'input'} eventHandler={handlePasswordChange} text={'password'} />
        </div>
        <div className="input-container">
            <label>Confirm Password:</label>
            <CreateComponent type={'input'} eventHandler={handleConfirmPasswordChange} text={'confirmPassword'} />
        </div>
        <CreateComponent type={'button'} eventHandler={handleSignup} text={'Sign Up'} />
      </form>
      <div className='spacer'></div>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Signup;