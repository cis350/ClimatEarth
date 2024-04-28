import './App.css';
import Login from './Login.js';
import "./index.css";
import Navbar from "../Navigation/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './Checkbox.css';
import TasksPage from "./TasksPage.js";
import HomePage from "../HomePage/HomePage.js";
import Signup from "./SignUp.js";

//import React, { useState } from "react";


const App = () => {
	const currentPage = window.location.pathname;
	return (
	<>
		<div>
		<Navbar />
		</div>
		{currentPage === "/" && <HomePage />}
		{currentPage === "/tasks" && <TasksPage />}
		{currentPage === "/login" && <Login />}
		{currentPage === "/signup" && <Signup />}
	</>
	);
}

export default App;
