/**
 * Login component.
 * Container component
 * login the user
 * uses conditional rendering
 */

import React, { useState, useRef, useEffect } from 'react';
import CreateComponent from './ComponentFactoryHOC';
// import api functions
import { loginUser, logoutUser } from '../api/auth';
import "./Component.css"

/**
 * The login/logout component is stateful
 * The login state is the variable `loginToken`
 * Session: the JWT is stored in localstorage
 * If there is a token in local storage then we assume
 * that the user is logged in.
 * Otherwise we assume that they are not.
 * When login out, the JWT is deleted from localstorage
 * 
 * It shows you the difference between a local variable
 * `username` that is reinitialized with each rendering
 * and usernameRef that persists between renderings
 * 
 * The state is initialized 
 * @returns This stateful component 
 */
function Login() {
  // add a state to the component
  // update the login state to check for the presence 
  // of the JWT
  const [loginToken, setLoginToken] = useState(sessionStorage.getItem('app-token')!== null);
  let username; // will store the username. this value is destroyed after each rendering
  let password; // will store the password
  const [error, setError] = useState(null);
  const usernameRef = useRef(localStorage.getItem('username') || ''); // this  value will persist between rendering
  
  // login button click event handler.
  /**
   * State is usually mutated inside event handler
   * @param {Event} e the click event dispatched by the login button
   */
  const handleLogin = async (e) => {
    try {
      const token = await loginUser(username, password);
      console.log("This is the token that is returned from loginUser in frontend: " + token);
      if (token != null) {
        localStorage.setItem('app-token', token);
        sessionStorage.setItem('app-token', token);
        setLoginToken(true);
        setError(null);
        console.log('Login successful');
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again later.');
      console.error('Error during login:', error.message);
    }
  };

  /**
   * Logout event handler. 
   * 
   */
  const handleLogout = async () => {
    try {
    const status = await logoutUser(username, password);
    if(status === 200){
      console.log("In status 200 for logout");
        // delete the JWT once the backend response is 200
        localStorage.removeItem('app-token');
        sessionStorage.removeItem('app-token');
        //restart the app
        window.location.reload();
    }
  } catch (error) {
    console.error("logout failure");
  }
  };
  useEffect(() => {
    // Save the username to localStorage when it changes
    localStorage.setItem('username', usernameRef.current);
  });
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

  // conditional rendering based on the state
  if (loginToken === false) {
    return (
      <div className="login-container">
        <h1 className="login-title">Login </h1>
        <form onSubmit={handleLogin}>
        <div>
          <label>
            {' '}
            Username:
          <CreateComponent type={'input'} eventHandler={handleUsernameChange} text={'username'}/> 
          </label>
        </div>
        <div>
          <label>
            {' '}
            Password:
          <CreateComponent type={'input'} eventHandler={handlePasswordChange} text={'password'}/> 
          </label>
        </div>
        <div>
          <CreateComponent type={'button'} eventHandler={handleLogin} text={'Login'}/> 
        </div>
        </form>
        <div className="spacer"></div>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <div>
        <label>
          {' '}
          Welcome {usernameRef.current}
        </label>
        {error && <p className="error-message">{error}</p>}
        </div>
        <div>
        <CreateComponent type={'button'} eventHandler={handleLogout} text={<a href="/login" className="cta-buttons"> Logout</a>}/> 
        </div>
      </div>
    );
  }
}

export default Login;


