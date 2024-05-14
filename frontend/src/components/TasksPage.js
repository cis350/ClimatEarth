import React, { useState, useEffect } from 'react';
import './TaskPage.css';
import './Component.css';
import './App.js'
import axios from 'axios';
const rootUrl = 'https://climatearth-app-f6f0a136cce9.herokuapp.com/';

const Checkbox = ({ value, onChange, label }) => {
    return (
        <div className="checkbox-container">
            <input type="checkbox" checked={value} onChange={onChange} />
            <label className="checkbox-label">
                {label}
            </label>
        </div>
    );
  };

function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState([false, false, false]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        fetch(rootUrl + 'api/tasks')
            .then(response => response.json())
            .then(data => {
                if (data.length >= 3) {
                    setTasks(data);
                } else {
                    console.error('Not enough tasks received:', data);
                }
            })
            .catch(error => console.error('Error fetching tasks:', error))
    }, []);

    // Define labels based on fetched tasks or use default values
    const task1 = tasks.length >= 1 ? tasks[0].description : "Recycle five pieces of trash";
    const task2 = tasks.length >= 2 ? tasks[1].description : "Listen to 30 min. of an eco-friendly podcast";
    const task3 = tasks.length >= 3 ? tasks[2].description : "Use public transportation";

    const handleCheckboxChange = async (index, task) => {
        const updatedValues = [...checkboxValues];
        updatedValues[index] = !updatedValues[index];
        setCheckboxValues(updatedValues);
        if (updatedValues[0] === true && updatedValues[1] === true && updatedValues[2] === true) {
          setCompleted(true);
        }
        else {
            setCompleted(false);
        }
        console.log(task);

        try {
            if (updatedValues[index]) {
                // Call the addTask endpoint
                const response = await axios.post(rootUrl + 'addTask', {
                    username: 'testuser1', // Replace with the actual username
                    task: task.id
                });
                console.log(response);
            } else {
                // Call the removeTask endpoint 
                const response = await axios.post(rootUrl + 'removeTask', {
                    username: 'testuser1', // Replace with the actual username
                    task: task.id
                });
                console.log(response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
        <div className="goals-container">
            <h1 className='title'>Daily Goals</h1>
            <form>
                <fieldset>
                    <Checkbox
                        value={checkboxValues[0]}
                        onChange={() => handleCheckboxChange(0, tasks[0])}
                        label={task1}
                    />
                    <Checkbox
                        value={checkboxValues[1]}
                        onChange={() => handleCheckboxChange(1, tasks[1])}
                        label={task2}
                    />
                    <Checkbox
                        value={checkboxValues[2]}
                        onChange={() => handleCheckboxChange(2, tasks[2])}
                        label={task3}
                    />
                </fieldset>
            </form>
            {completed && (
                <div className="celebration">
                <h2>Congratulations! You completed all your tasks!</h2>
                <div className="earth-animation">
                </div>
                </div>
            )}
        </div>
        <div className="goals-container">
            <h1 className='title'>Completed Goals</h1>
            <form>
                <fieldset>
                <ul>
                    
                </ul>
                </fieldset>
            </form>
        </div>
        </div>
    );
}

export default TasksPage;
