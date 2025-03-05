import React from "react";

const HorizontalGauge = () => {
  return (
    <div>
      HorizontalGauge
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "25%" }}
        ></div>
      </div>
    </div>
  );
};

export default HorizontalGauge;
