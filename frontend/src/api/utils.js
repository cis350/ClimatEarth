/**
 * Utilities functions used by API calls
 * functions
 */
import axios from "axios";
/**
 * Adds the JWT to the header of an HTTP request
 */
export const setHeaders = () =>{
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('app-token');
}

export const rootURL = 'https://climatearth-app-f6f0a136cce9.herokuapp.com:5050/';