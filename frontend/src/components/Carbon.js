import React, { useState, useEffect} from 'react';
import './Component.css';
import './App.js'
import axios from 'axios';
const rootUrl = '../api/utils.js';

function CarbonFootprintCalculator() {
    // State variables to store user inputs and calculation result
    const [electricityUsage, setElectricityUsage] = useState('');
    const [gasUsage, setGasUsage] = useState('');
    const [flightDistance, setFlightDistance] = useState('');
    const [carMileage, setCarMileage] = useState('');
    const [carMiles, setCarMiles] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);
    const [userData, setUserData] = useState(null); 
    const [carbonFootprintValue, setCarbonFootprintValue] = useState(0);

    // Fetch user data on component mount
    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const username = localStorage.getItem('username');
              console.log(username);
              const response = await axios.get(`${rootUrl}getFootprint/${username}`);
              setUserData(response.data);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchUserData();
  }, []);
  
    // Function to handle calculation
    const calculateCarbonFootprint = async () => {
      setIsCalculating(true);
      try {
          // Perform calculation based on user inputs
          const electricityUsageTotal = electricityUsage * 0.5; 
          const gasUsageTotal = gasUsage * 0.2;
          const flightDistanceTotal = flightDistance * 0.2; 
          const carMileageTotal = (carMiles / carMileage) * 20 * (1/ 2.20462);
          const calculatedFootprint = (carMileageTotal + flightDistanceTotal + gasUsageTotal + electricityUsageTotal);
          setCarbonFootprintValue(calculatedFootprint);
        // Call the carbon endpoint
        const username = localStorage.getItem('username');
        const response = await axios.post(rootUrl + 'carbon', {
          username: username,
          footprint: calculatedFootprint
        });
        setUserData(response);
        console.log("footprint that is updated: " + calculatedFootprint);
        
    } catch (error) {
        console.error('Error:', error);
    }
    setIsCalculating(false);

    };
  
    return (
      <div className="calculator-container">
        <h2 className="title">Carbon Footprint Calculator</h2>
        {userData && (
                <p>Your previously calculated footprint was: {userData.footprint} tons CO2</p>
            )}
        <form>
          <div className="input-group">
            <label>
              Electricity Usage (kWh):
              <input type="number" 
              value={electricityUsage} 
              onChange={(e) => setElectricityUsage(e.target.value)} 
              placeholder="Enter electricity usage" />
            </label>
          </div>
          <div className="input-group">
            <label>
              Gas Usage (cubic meters):
              <input type="number" 
              value={gasUsage} 
              onChange={(e) => setGasUsage(e.target.value)}
              placeholder="Enter gas usage" />
            </label>
          </div>
          <div className="input-group">
            <label>
              Flight Distance (miles):
              <input type="number" 
              value={flightDistance} 
              onChange={(e) => setFlightDistance(e.target.value)}
              placeholder="Enter flight distance" />
            </label>
          </div>
          <div className="input-group">
            <label>
              Car Mileage (miles per gallon):
              <input type="number" 
              value={carMileage} 
              onChange={(e) => setCarMileage(e.target.value)}
              placeholder="Enter car mileage" />
            </label>
          </div>
          <div className="input-group">
            <label>
              Car Miles (miles travelled per month):
              <input type="number" 
              value={carMiles} 
              onChange={(e) => setCarMiles(e.target.value)}
              placeholder="Enter car miles" />
            </label>
          </div>
          <div className="button-container">
            <button className="calculate-btn" onClick={calculateCarbonFootprint} disabled={isCalculating}>
              {isCalculating? 'Calculating...' : 'Calculate'}
            </button>
          </div>
        </form>
        <div className="result-container">
          <h3>Carbon Footprint: {carbonFootprintValue} tons CO2</h3>
          {carbonFootprintValue > 0 && (<p>Consider reducing your energy consumption to minimize your impact on the environment!</p>)}
        </div>
      </div>
    );
  }
  
  export default CarbonFootprintCalculator;