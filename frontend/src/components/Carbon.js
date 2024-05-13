import React, { useState} from 'react';
import './Component.css';
import './App.js'

function CarbonFootprintCalculator() {
    // State variables to store user inputs and calculation result
    const [electricityUsage, setElectricityUsage] = useState('');
    const [gasUsage, setGasUsage] = useState('');
    const [flightDistance, setFlightDistance] = useState('');
    const [carMileage, setCarMileage] = useState('');
    const [carMiles, setCarMiles] = useState('');
    const [carbonFootprint, setCarbonFootprint] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
  
    // Function to handle calculation
    const calculateCarbonFootprint = () => {
      setIsCalculating(true);
      setTimeout(() => {
        // Perform calculation based on user inputs
        const electricityUsageTotal = electricityUsage * 0.5; 
        const gasUsageTotal = gasUsage * 0.2;
        const flightDistanceTotal = flightDistance * 0.2; 
        const carMileageTotal = (carMiles / carMileage) * 20 * (1/ 2.20462);
        const carbonFootprintValue = carMileageTotal + flightDistanceTotal + gasUsageTotal + 
        electricityUsageTotal; 
        setCarbonFootprint(carbonFootprintValue);
        setIsCalculating(false);
      }, 500);
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