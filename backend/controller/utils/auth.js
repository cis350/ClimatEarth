/**
 * This module contains authentication and session functions
 *
 * Errors codes:  1 expired token, 2 invalid user,
 *          3 invalid token
 */

// import JWT
const jwt = require('jsonwebtoken');

// import the env variables
require('dotenv').config({ path: '../../../../.env' });

// import DB function
const { getUserByUName } = require('../../model/users');

// blacklisted tokens
const jwtBlacklist = new Set();

/**
 * Create a JWT containing the username
 * @param {*} userid
 * @returns the token
 */
const authenticateUser = (username, password) => {
  try {
    console.log("In authenticateUser");
    const token = jwt.sign({ username, password }, "123", { expiresIn: '120s' });
    console.log('token', token);
    return token;
  } catch (err) {
    console.log('error1', err.message);
    throw err;
  }
};

/**
 * Verify a token. Check if the user is valid
 * @param {*} token
 * @returns 0 if the user is valid, the appropriate status code
 */
const verifyUser = async (token) => {
  try {
    // check if token blacklisted
    // if (jwtBlacklist.has(token)) {
    //   return 3;
    // }

    // decoded contains the paylod of the token
    const decoded = jwt.verify(token, "123");
    // checks password
    const { username, password } = decoded;
  
    // check that the payload contains a valid user
    const user = await getUserByUName(username);
    if (!user) {
      // user is undefined
      return 2;
    }
    if (user.password !== password) {
      return 3; // Invalid password
    }
    return 0; // user verified - success
  } catch (err) {
    // expired token
    if (err.name === 'TokenExpiredError') {
      console.log('error2', err.message);
      return 1;
    }
    // invalid token
    console.log('error3', err.message);
    return 3;
  }
};

const updateCalculation = async(token) => {
  const decoded = jwt.verify(token, "123");
  const { username } = decoded;
  return username; 
};

// const blacklistJWT = (token) => jwtBlacklist.add(token);

 
module.exports = { authenticateUser, verifyUser, updateCalculation};
