import React, { useState} from 'react';
import './Component.css';
import './App.js'
import axios from 'axios';
const rootUrl = 'https://climatearth-app-f6f0a136cce9.herokuapp.com:5050/';

function CarbonFootprintCalculator() {
    // State variables to store user inputs and calculation result
    const [electricityUsage, setElectricityUsage] = useState('');
    const [gasUsage, setGasUsage] = useState('');
    const [flightDistance, setFlightDistance] = useState('');
    const [carMileage, setCarMileage] = useState('');
    const [carMiles, setCarMiles] = useState('');
    const [carbonFootprint, setCarbonFootprint] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [carbonFootprintValue, setCarbonFootprintValue] = useState(0);


  
    // Function to handle calculation
    const calculateCarbonFootprint = async () => {
      setIsCalculating(true);
      setTimeout(() => {
        // Perform calculation based on user inputs
        const electricityUsageTotal = electricityUsage * 0.5; 
        const gasUsageTotal = gasUsage * 0.2;
        const flightDistanceTotal = flightDistance * 0.2; 
        const carMileageTotal = (carMiles / carMileage) * 20 * (1/ 2.20462);
        setCarbonFootprintValue(carMileageTotal + flightDistanceTotal + gasUsageTotal + 
        electricityUsageTotal); 
        setCarbonFootprint(carbonFootprintValue);
        setIsCalculating(false);
      }, 500);
      try {
        // Call the carbon endpoint
        const token = localStorage.getItem('app-token');
        const response = await axios.post(rootUrl + 'carbon', {
          token: token,
          footprint: carbonFootprintValue
        });
        console.log(response);
        
    } catch (error) {
        console.error('Error:', error);
    }

    };
  
    return (
      <div className="calculator-container">
        <h2 className="title">Carbon Footprint Calculator</h2>
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
          <h3>Carbon Footprint: {carbonFootprint} tons CO2</h3>
          {carbonFootprint > 0 && (<p>Consider reducing your energy consumption to minimize your impact on the environment!</p>)}
        </div>
      </div>
    );
  }
  
  export default CarbonFootprintCalculator;