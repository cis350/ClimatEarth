import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import './App.js';
import NavBar from "../Navigation/Navbar.js";
//import { useParams } from 'react-router-dom';
const rootUrl = 'http://localhost:5050/';

function Leaderboard() {
    const [users, setUsers] = useState([]);
    //const { username } = useParams();

    useEffect(() => {
        fetch(rootUrl + 'api/leaderboard')
            .then(response => response.json())
            .then(data => {
                // Assuming data is an array of user objects w a name field
                setUsers(data);
            })
            .catch(error => console.error('Error fetching leaderboard data:', error))
    }, []);

    return (
        <div>
        <NavBar></NavBar>
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">Leaderboard</h1>
            <div className="leaderboard-list">
                {users.map((user, index) => (
                    <div key={index} className="leaderboard-user">
                        <span className="user-rank">{index + 1 + '.'}</span>
                        <span className="user-name">{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Leaderboard;
