// HTTP client
import axios from "axios";
import { rootURL } from "./utils";
import { setHeaders } from "./utils";
/**
 * This module contains HTTP calls to
 * the /login and /logout endpoints
 */

/**
 * This function authenticates the user
 * sends a POSt request to the login endpoint
 * returns the JWT
 */
export const loginUser = async (username, password) => {
    try{
        // add JWT to headers
        setHeaders();
        console.log("In loginUser auth.js");
        console.log(username);
        console.log(password);
        const response = await axios.post(`${rootURL}/login`, `username=${username}&password=${password}`);
        // return the token
        return response.status === 200;
    } catch (err){
        console.log('error', err.message);
    }
}

export const logoutUser = async () => {
    try{
        // add JWT to headers
        setHeaders();
        const response = await axios.post(`${rootURL}/logout`);
        // return the token
        return response.status;
    } catch (err){
        console.log('error', err.message);
    }
}

export const signupUser = async (username, password, name) => {
    try {
        const response = await axios.post(`${rootURL}/signup`, {
            username: username,
            password: password, 
            name: name
        });
        // Assuming the API returns a success status code (e.g., 201)
        return response.status === 201;
    } catch (err) {
        console.log('error', err.message);
        return false;
    }
}


