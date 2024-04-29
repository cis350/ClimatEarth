// const express = require('express');
// const cors = require('cors');



// Static list of tasks
const tasks = [
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

// Function to pick three random tasks
function getRandomTasks() {
    const shuffled = tasks.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, 3); // Get the first three elements
}



module.exports = {getRandomTasks};