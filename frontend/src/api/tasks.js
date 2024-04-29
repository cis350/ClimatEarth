const express = require('express');
const app = express();

let tasks = [
    { id: 1, description: "Pick up a piece of trash" },
    { id: 2, description: "Recycle all of your trash today" },
    { id: 3, description: "Use a reusable bag for shopping" },
    { id: 4, description: "Use a reusable water bottle or buy one" },
    { id: 5, description: "Turn off all your lights when no one is in the room" },
    { id: 6, description: "Limit your showers to max 15 minutes or cut down by 3 minutes" },
    { id: 7, description: "Donate $1+ to our sponsored sustainability charity" },
    { id: 8, description: "Unplug all your chargers in the house when not in use" },
    { id: 9, description: "Take public transport for the entire day" },
    { id: 10, description: "Lower or turn off your thermostat" },
    { id: 11, description: "Avoid using single-use plastics all day" },
    { id: 12, description: "Buy local produce" },
    { id: 13, description: "Cut meat consumption today"}
];

function shuffleAndPickTasks() {
    let shuffledTasks = [...tasks];
    shuffledTasks.sort(() => Math.random() - 0.5);
    return shuffledTasks.slice(0, 3);
}

app.get('/api/tasks', (req, res) => {
    res.json(shuffleAndPickTasks());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
