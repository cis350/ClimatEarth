import React, { useState, useEffect } from 'react';
import './Checkbox.css';
import './ComponentFactoryHOC';

const Checkbox = (props) => {
	return <label className="checkbox-container">
		<input type="checkbox" name={props.name} checked={props.val} onChange={() => {props.setValue(!props.val)}}/>
		{props.label}
	</label>
}

function TasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/tasks')  // Make sure the URL matches your server's
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const [val, setVal] = useState(false); //initializes checkbox to false 
	const label = "Pick up a piece of trash"
	const label2 = "Recycle" 
	const label3 = "Use a reusable water bottle"

    return (
        <div>
            <h1 className='Sub-Title'>Daily Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" />
                        {task.description}
                    </li>
                ))}
                <>
                    <Checkbox value={val} setValue={setVal} label={label} />
                    <Checkbox value={val} setValue={setVal} label={label2} />
                    <Checkbox value={val} setValue={setVal} label={label3} />
                </>
                <button className="button">Get New Tasks</button>
            </ul>
        </div>
    );
}

export default TasksPage;
