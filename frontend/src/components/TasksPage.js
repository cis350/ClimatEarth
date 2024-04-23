import React, { useState, useEffect } from 'react';

function TasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/tasks')  // Make sure the URL matches your server's
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div>
            <h1>Daily Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" />
                        {task.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TasksPage;
