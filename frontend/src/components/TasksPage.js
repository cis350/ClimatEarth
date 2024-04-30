import React, { useState, useEffect } from 'react';
import './Checkbox.css';
import './Component.css';
import './App.js'

const Checkbox = (props) => {
    return (
        <label className="checkbox-container">
            <input type="checkbox" checked={props.value} onChange={() => props.setValue(!props.value)} />
            {props.label}
        </label>
    );
}

function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState([false, false, false]);

    useEffect(() => {
        fetch('http://localhost:3000/api/tasks')
            .then(response => response.json())
            .then(data => {
                if (data.length >= 3) {
                    setTasks(data);
                } else {
                    console.error('Not enough tasks received:', data);
                }
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Define labels based on fetched tasks or use default values
    const label = tasks.length >= 1 ? tasks[0].description : "Complete task 1";
    const label2 = tasks.length >= 2 ? tasks[1].description : "Complete task 2";
    const label3 = tasks.length >= 3 ? tasks[2].description : "Complete task 3";

    const handleCheckboxChange = (index) => {
        const updatedValues = [...checkboxValues];
        updatedValues[index] = !updatedValues[index];
        setCheckboxValues(updatedValues);
    };

    return (
        <div className="App">
            <h1 className='Sub-Title'>Fun Tasks</h1>
            <ul className='checkbox'>
                <Checkbox value={checkboxValues[0]} setValue={() => handleCheckboxChange(0)} label={label} />
                <Checkbox value={checkboxValues[1]} setValue={() => handleCheckboxChange(1)} label={label2} />
                <Checkbox value={checkboxValues[2]} setValue={() => handleCheckboxChange(2)} label={label3} />
            </ul>
        </div>
    );
}

export default TasksPage;
