import React, { useState, useEffect } from 'react';
import './Checkbox.css';
import './ComponentFactoryHOC';
import './Component.css'

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
        fetch('http://localhost:3004/api/tasks')  // Change to your correct server port
            .then(response => response.json())
            .then(data => {
                if (data.length >= 3) {
                    setTasks(data);
                }
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleCheckboxChange = (index) => {
        const updatedValues = [...checkboxValues];
        updatedValues[index] = !updatedValues[index];
        setCheckboxValues(updatedValues);
    };

    // Assign the first three tasks to label, label2, and label3 if they exist
    const label = tasks[0]?.description ?? "Task 1";  // Default to "Task 1" if not enough tasks
    const label2 = tasks[1]?.description ?? "Task 2";  // Default to "Task 2"
    const label3 = tasks[2]?.description ?? "Task 3";  // Default to "Task 3"

    return (
        <div>
            <h1 className='App-Title'>Daily Tasks</h1>
            <ul>
                {tasks.length >= 3 && (
                    <>
                        <Checkbox value={checkboxValues[0]} setValue={() => handleCheckboxChange(0)} label={label} />
                        <Checkbox value={checkboxValues[1]} setValue={() => handleCheckboxChange(1)} label={label2} />
                        <Checkbox value={checkboxValues[2]} setValue={() => handleCheckboxChange(2)} label={label3} />
                    </>
                )}
            </ul>
        </div>
    );
}

export default TasksPage;

