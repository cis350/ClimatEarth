import './App.css';
import Login from './Login.js';
import "./index.css";
import Navbar from "../Navigation/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './Checkbox.css';
import TasksPage from "./TasksPage.js";

import React, { useState } from "react";

const Checkbox = (props) => {
	return <label className="checkbox-container">
		<input type="checkbox" name={props.name} checked={props.val} onChange={() => {props.setValue(!props.val)}}/>
		{props.label}
	</label>
}



const App = () => {
	const [val, setVal] = useState(false); //initializes checkbox to false 
	const label = "Pick up a piece of trash"
	const label2 = "Recycle" 
	const label3 = "Use a reusable water bottle"
	const currentPage = window.location.pathname;
	return (
	<>
		<div>
		<Navbar />
		</div>
		{currentPage === "/" && ( // Render checkboxes only on the home page
		<>
			<Checkbox value={val} setValue={setVal} label={label} />
			<Checkbox value={val} setValue={setVal} label={label2} />
			<Checkbox value={val} setValue={setVal} label={label3} />
		</>
		)}
		{currentPage === "/login" && <Login />} {/* Render login component only on the login page */}
		{currentPage === "/tasks" && <TasksPage />}
	</>
	);
}

export default App;
