import React, { useState, useEffect } from 'react';
import './TaskPage.css';
import './Component.css';
import { useParams } from 'react-router-dom';
import './App.js'
import axios from 'axios';
import NavBar from "../Navigation/Navbar.js";
const rootUrl = 'http://localhost:5050/';


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
    const [completedTasks, setCompletedTasks] = useState([]);
    const [score, setScore] = useState([]);
    const { username } = useParams();

    const fetchCompletedTasks = async (username) => {
        try {
            const response = await fetch(`${rootUrl}getCompletedTasks/${username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch completed tasks');
            }
            console.log(username);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching completed tasks:', error);
            throw error;
        }
    };
        
    const fetchTaskDetails = async (taskIds) => {
        const tasks = [];
        if (taskIds) {
            for (const taskId of taskIds) {
                try {
                  const response = await axios.get(`http://localhost:3000/api/tasks/${taskId}`);
                  tasks.push(response.data);
                } catch (error) {
                  console.error(`Error fetching task details for ID ${taskId}:`, error);
                }
            }
        }
        return tasks;
    };

    useEffect((username) => {
        fetch('http://localhost:3000/api/tasks')
            .then(response => response.json())
            .then(data => {
                if (data.length >= 3) {
                    setTasks(data);
                } else {
                    console.error('Not enough tasks received:', data);
                }
            })
            .catch(error => console.error('Error fetching tasks:', error))

        fetchCompletedTasks(username) // change to actual username
            .then(completedTasks => {
              console.log(completedTasks);
              console.log(username);
              return fetchTaskDetails(completedTasks.completedTasks);
            })
            .then(taskDetails => {
              console.log(taskDetails);
              setCompletedTasks(taskDetails);
            })
            .catch(error => console.error('Error fetching completed tasks:', error));

        fetch(`${rootUrl}getScore/${username}`) //replace with actual username
            .then(response => response.json())
            .then(data => {
                setScore(data.score || 0);
            })
            .catch(error => console.error('Error fetching score:', error))
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
                    username: username, // Replace with the actual username
                    task: task.id
                });
                console.log(response.data.message);
                setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, task]);
                setScore(score + 1);
            } else {
                // Call the removeTask endpoint 
                const response = await axios.post(rootUrl + 'removeTask', {
                    username: username, // Replace with the actual username
                    task: task.id
                });
                console.log(response.data.tasks);
                const updatedTasks = await fetchTaskDetails(response.data.tasks);
                console.log(updatedTasks);
                setCompletedTasks(updatedTasks);
                setScore(score - 1);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
        <NavBar></NavBar>
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
                    {/* Completed Goals */}
                    {completedTasks.map((task, index) => (
                        <li key={index}>
                            <p>
                                {/* {<strong>{task.id + ' points'}</strong>:}  */}
                            {task.description}</p>
                        </li>
                    ))}
                </ul>
                </fieldset>
                <ul><h2 className='title'>Score</h2> <p><strong>{score + ' points'}</strong></p> </ul>
            </form>
        </div>
        </div>
    );
}

export default TasksPage;
