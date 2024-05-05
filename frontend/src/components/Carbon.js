import React, { useState} from 'react';
import './Component.css';
import './App.js'

function CarbonFootprintCalculator() {
    // State variables to store user inputs and calculation result
    const [electricityUsage, setElectricityUsage] = useState('');
    const [gasUsage, setGasUsage] = useState('');
    const [flightDistance, setFlightDistance] = useState('');
    const [carMileage, setCarMileage] = useState('');
    const [carbonFootprint, setCarbonFootprint] = useState(0);
  
    // Function to handle calculation
    const calculateCarbonFootprint = () => {
      // Perform calculation based on user inputs
      const carbonFootprintValue = carMileage + flightDistance + gasUsage + electricityUsage + flightDistance; 
      setCarbonFootprint(carbonFootprintValue);
    };
  
    return (
      <div>
        <h2>Carbon Footprint Calculator</h2>
        <div>
          <label>
            Electricity Usage (kWh):
            <input type="number" value={electricityUsage} onChange={(e) => setElectricityUsage(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Gas Usage (cubic meters):
            <input type="number" value={gasUsage} onChange={(e) => setGasUsage(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Flight Distance (miles):
            <input type="number" value={flightDistance} onChange={(e) => setFlightDistance(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Car Mileage (miles per gallon):
            <input type="number" value={carMileage} onChange={(e) => setCarMileage(e.target.value)} />
          </label>
        </div>
        <button onClick={calculateCarbonFootprint}>Calculate</button>
        <div>
          <h3>Carbon Footprint: {carbonFootprint} tons CO2</h3>
        </div>
      </div>
    );
  }
  
  export default CarbonFootprintCalculator;