import './App.css';
import Login from './Login.js';
import "./index.css";
//import NavBar from "../Navigation/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './TaskPage.css';
import TasksPage from "./TasksPage.js";
import HomePage from "../HomePage/HomePage.js";
import Signup from "./SignUp.js";
import Carbon from "./Carbon.js";
import Leaderboard from './Leaderboard.js';

import { Routes, Route } from 'react-router-dom';

//import React, { useState } from "react";


const App = () => {
	//const currentPage = window.location.pathname;
	return (
	<>
		{/* {currentPage === "/" && <HomePage />}
		{currentPage === "/tasks" && <TasksPage />}
		{currentPage === "/carbon" && <Carbon />}
		{currentPage === "/leaderboard" && <Leaderboard />}
		{currentPage === "/login" && <Login />}
		{currentPage === "/signup" && <Signup />} */}
		<Routes>
			<Route path='/signup' element={<Signup />} />
			<Route path='/:username/login' element={<Login />} />
			<Route path='/:username/leaderboard' element={<Leaderboard />} />
			<Route path='/:username/carbon' element={<Carbon />} />
			<Route path='/:username/tasks' element={<TasksPage />} />
			<Route path='/:username/' element={<HomePage />} />
			<Route path='/' element={<HomePage />} />
			<Route path='/carbon' element={<Carbon />} />
			<Route path='/tasks' element={<TasksPage />} />
			<Route path='/leaderboard' element={<Leaderboard />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	</>
	);
}

export default App;
