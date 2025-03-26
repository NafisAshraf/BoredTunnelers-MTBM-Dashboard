import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TemperatureGauge } from "../components/temperature-gauge";

import HorizontalGauge from "../components/horizontal-gauge";

function App() {

  const [sensorVal, setSensorVal] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = Math.floor(Math.random() * 101); // Random value between 0 and 100
      setSensorVal(newVal);
    }, 500); // 2Hz = every 500ms

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="bg-black">
        <div className="container py-6">
          <div className="container flex items-center justify-between pb-3">
            <div className="flex gap-3">
              <img
                src="/logo-white.png"
                alt="Logo"
                className="w-[200px] md:w-[300px]"
              />
              {/* <p className="text-white my-auto md:font-semibold text-sm md:text-xl ">
                SolbotX
              </p> */}
            </div>
            <div className="">
              <p className="text-white my-auto md:font-semibold text-sm md:text-lg pt-0 pt-md-2">
                Control Panel
              </p>
            </div>
          </div>
          <div className="border-b mb-5"></div>

          {/* Dashboard */}
          <div className="row justify-content-centre"> {/* Center the container */}
              <div className="col-12 col-md-8 col-lg-6 container border border-white bg-neutral-950 rounded-lg py-5">
                <div className="row">
                  {/* Gauge 1 */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <HorizontalGauge
                      name="Sensor 1"
                      min={0}
                      max={100}
                      low_threshold={20}
                      high_threshold={80}
                      val={sensorVal}
                      unit="°C"
                      timeout={3000} // 3 seconds timeout
                    />
                  </div>

                  {/* Gauge 2 */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <HorizontalGauge
                      name="Sensor 2"
                      min={0}
                      max={100}
                      low_threshold={20}
                      high_threshold={80}
                      val={sensorVal}
                      unit="°C"
                      timeout={3000} // 3 seconds timeout
                    />
                  </div>

                  {/* Gauge 3 */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <HorizontalGauge
                      name="Sensor 3"
                      min={0}
                      max={100}
                      low_threshold={20}
                      high_threshold={80}
                      val={sensorVal}
                      unit="°C"
                      timeout={3000} // 3 seconds timeout
                    />
                  </div>

                  {/* Gauge 4 */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <HorizontalGauge
                      name="Sensor 4"
                      min={0}
                      max={100}
                      low_threshold={20}
                      high_threshold={80}
                      val={null}
                      unit="°C"
                      timeout={3000} // 3 seconds timeout
                    />
                  </div>
                </div>
              </div>
            </div>

            
          <div className="row">
            {/* Temperature Gauge */}
            <div className="col-12 col-lg-5 col-md-12">
              <div className="container border border-white bg-neutral-950 rounded-lg p-5 h-100 flex justify-center items-center">
                <div>
                  <TemperatureGauge data={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen bg-black"></div>
      </div>
    </>
  );
}

export default App;
