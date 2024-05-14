import React from "react";
import "./Navbar.css"
import { useParams } from 'react-router-dom';


function NavBar() {
	// const location = useLocation();
	const { username } = useParams();

	// const handleLogOut = async () => {
	// 	try {
	// 		const response = await axios.post(`${rootURL}/logout`);

	// 		if (response.status == 200) {
	// 			socket.emit('userDisconnect');
	// 			navigate('/');
	// 		} else {
	// 			alert('Log out failed.');
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 		alert('Log out failed.');
	// 	}
	// };

	// const isActive = (pathname) => {
	// 	const loc = location.pathname.split('/');
	// 	return '/' + loc[2] === pathname || '/' + loc[1] === pathname
	// 		? true
	// 		: false;
	// };

	return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">
        ClimatEarth
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href={`/${username}`}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`/${username}/tasks`}>
              Daily Goals
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`/${username}/carbon`}>
              Carbon Footprint Calculator
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`/${username}/leaderboard`}>
              Leaderboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`/${username}/login`}>
              Login
            </a>
          </li>
      </ul>
    </nav>
  );
};

export default NavBar;