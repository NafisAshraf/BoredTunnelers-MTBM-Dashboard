import React, { useState, useEffect } from 'react';
import './horizontal-gauge.css'; // Ensure you have this CSS file for styling

const HorizontalGauge = ({
  name,
  min,
  max,
  low_threshold,
  high_threshold,
  val,
  unit,
  timeout = 3000 // Default timeout of 3 seconds
}) => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [displayValue, setDisplayValue] = useState(val);

  // Calculate the percentage of the value within the min-max range
  const percentage = displayValue !== null ? ((displayValue - min) / (max - min)) * 100 : 0; // 0% when no data

  // Determine the bar color and value box color based on thresholds
  let barColor = '#ded9d9'; // Default bar color
  let valueBoxColor = '#4CAF50'; // Default green color for value box

  if (displayValue !== null) {
    if (displayValue < low_threshold) {
      barColor = '#ded9d9'; // Bar color for low threshold
      valueBoxColor = '#2196F3'; // Blue for value box
    } else if (displayValue > high_threshold) {
      barColor = '#ded9d9'; // Bar color for high threshold
      valueBoxColor = '#F44336'; // Red for value box
    }
  } else {
    valueBoxColor = 'grey'; // Orange for no data
  }

  // Update lastUpdate timestamp whenever a new value is received
  useEffect(() => {
    setLastUpdate(Date.now());
    setDisplayValue(val);
  }, [val]);

  // Check for timeout
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastUpdate > timeout) {
        setDisplayValue(null); // No data to display
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [lastUpdate, timeout]);

  return (
    <div className="horizontalGauge-display">
      <div className="header">
        <div className="sensor-name">{name}</div>
        <div
          className="sensor-value"
          style={{
            backgroundColor: valueBoxColor, // Use the same color as when data is present
            paddingLeft: '5px',
            paddingRight: '7px',
            borderRadius: '5px',
            color: 'white', // Text color remains white
          }}
        >
          {displayValue !== null ? `${displayValue} ${unit}` : "No data"}
        </div>
      </div>
      <div className="sensor-bar">
        <div
          className="bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        ></div>
      </div>
    </div>
  );
};

export default HorizontalGauge;