import './App.css';
import Login from './Login';

import React, { useState } from "react";

const Checkbox = (props) => {
	return <label>
		<input type="checkbox" name={props.name} checked={props.val} onChange={() => {props.setValue(!props.val)}}/>
		{props.label}
	</label>
}
const App = () => {
	const [val, setVal] = useState(false); //initializes checkbox to false 
  const label = "Pick up a piece of trash"
  const label2 = "Recycle" 
  const label3 = "Use a reusable water bottle"
	return <>
		<Checkbox value={val} setValue={setVal} label={label}></Checkbox>
        <Checkbox value={val} setValue={setVal} label={label2}></Checkbox>
        <Checkbox value={val} setValue={setVal} label={label3}></Checkbox>
        <Login />
	</>
}

export default App;
