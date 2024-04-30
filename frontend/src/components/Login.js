/**
 * Login component.
 * Container component
 * login the user
 * uses confidional rendering
 */

import React, { useState, useRef } from 'react';
import CreateComponent from './ComponentFactoryHOC';
// import api functions
import { loginUser, logoutUser } from '../api/auth';
import "./Component.css"

/**
 * The login/logout component is stateful
 * The login state is the variable `loginToken`
 * Session: the JWT is stored in localstorage
 * If there is a token in local storage then we assume
 * that the user is loggged in.
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
  const usernameRef = useRef(''); // this  value will persist between rendering
  
  // login button click event handler.
  /**
   * State is usually mutated inside event handler
   * @param {Event} e the click event dispatched by the login button
   */
  const handleLogin = async (e) => {
    // authenticate the user, the token is returned if success
    const token = await loginUser(username, password);
    
    if(token){  // check that the token is not undefined
      // store the token
      localStorage.setItem('app-token', token);
      // update the login state
      setLoginToken(true);
      console.log('login', token);

    }else{
        console.log('Error', 'authentication failure');
    }
    
    
  };

  /**
   * Logout event handler. 
   * 
   */
  const handleLogout = async () => {
    const status = await logoutUser(username, password);
    if(status === 200){
        // detele the JWT once the backend response is 200
        localStorage.removeItem('app-token');
        //restart the app
        window.location.reload();
    }
    else{
        console.log('Error', 'logout failure');
    }

  };
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
      <div className="App">
        <h1 className="App-Title">Login </h1>
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
        </div>
        <div>
        <CreateComponent type={'button'} eventHandler={handleLogout} text={<a href="/login" class="cta-buttons"> Logout</a>}/> 
        </div>
      </div>
    );
  }
}

export default Login;


