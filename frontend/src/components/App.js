import './App.css';
import Login from './Login.js';
import "./index.css";
import Navbar from "../Navigation/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './TaskPage.css';
import TasksPage from "./TasksPage.js";
import HomePage from "../HomePage/HomePage.js";
import Signup from "./SignUp.js";
import Carbon from "./Carbon.js";
import Leaderboard from './Leaderboard.js';

// import {
// 	Routes,
// 	Route,
// 	BrowserRouter,
//   } from "react-router-dom";

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
		{currentPage === "/carbon" && <Carbon />}
		{currentPage === "/leaderboard" && <Leaderboard />}
		{currentPage === "/login" && <Login />}
		{currentPage === "/signup" && <Signup />}
	</>
	); 
	// const currentPage = window.location.pathname;
	// return (
	// <>
	// 	<div>
	// 	<Navbar>
	// 		<BrowserRouter>
	// 		<Routes>
	// 		<Route path="/" element={<HomePage/>}/>
	// 			<Route path="/tasks" element={<TasksPage/>}/>
	// 			<Route path="/carbon" element={<Carbon/>}/>
	// 			<Route path="/leaderboard" element={<Leaderboard/>}/>
	// 			<Route path="/login" element={<Login/>}/>
	// 			<Route path="/signup" element={<Signup/>}/>
	// 		</Routes>
	// 		</BrowserRouter>
	// 	</Navbar>
	// 	</div>
	// 	{currentPage === "/" && <HomePage />}
	// 	{currentPage === "/tasks" && <TasksPage />}
	// 	{currentPage === "/carbon" && <Carbon />}
	// 	{currentPage === "/leaderboard" && <Leaderboard />}
	// 	{currentPage === "/login" && <Login />}
	// 	{currentPage === "/signup" && <Signup />}
	// </>
	// )
}

export default App;
