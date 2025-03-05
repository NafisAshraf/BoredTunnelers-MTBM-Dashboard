import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Joystick } from "react-joystick-component";
import io from "socket.io-client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TemperatureGauge } from "../components/temperature-gauge";

const socket = io("http://172.20.10.7:5000"); // Replace <raspberry-pi-ip> with your RPi's IP address

function App() {
  const [joystickData, setJoystickData] = useState({ x: 0, y: 0 });
  const [isAutonomous, setIsAutonomous] = useState(false);

  const handleAutonomousToggle = () => {
    setIsAutonomous(!isAutonomous);
    socket.emit("autonomous-toggle", { isAutonomous: !isAutonomous });
  };

  useEffect(() => {
    socket.on("joystick-ack", (message) => {
      console.log("Server acknowledged:", message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoystickMove = (data) => {
    if (!isAutonomous) {
      const { x, y } = data;
      setJoystickData({ x: x.toFixed(2), y: y.toFixed(2) });
      socket.emit("joystick-data", { x: x.toFixed(2), y: y.toFixed(2) });
    }
  };

  const handleJoystickStop = () => {
    if (!isAutonomous) {
      setJoystickData({ x: 0, y: 0 });
      socket.emit("joystick-data", { x: 0, y: 0 });
    }
  };

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
          <div className="row">
            {/* Joystick */}
            <div className="col-12 col-md-4">
              <div className="container border border-white bg-neutral-950 rounded-lg py-4 px-0">
                <div className="text-center text-white">
                  <p className="text-xl">Control</p>

                  <div className="border-b mb-5"></div>
                  <div className="flex justify-center items-center">
                    <Joystick
                      size={150}
                      baseColor={isAutonomous ? "#666" : "#333"}
                      stickColor={isAutonomous ? "#ccc" : "#eee"}
                      move={handleJoystickMove}
                      stop={handleJoystickStop}
                      disabled={isAutonomous}
                    />
                  </div>
                  <p className="pt-3">
                    X: {joystickData.x} | Y: {joystickData.y}
                  </p>
                  <hr />

                  {/* Tab selection */}

                  <div className="flex items-center justify-center">
                    <p className="text-white text-lg font-semibold pe-3 my-auto">
                      Autonomous Mode:
                    </p>
                    <div className="border rounded py-1 px-2 bg-neutral-900">
                      <button
                        className={`${
                          isAutonomous
                            ? "bg-blue-700 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                            : " hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                        } mr-2`}
                        onClick={handleAutonomousToggle}
                      >
                        On
                      </button>
                      <button
                        className={`${
                          !isAutonomous
                            ? "bg-blue-700 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                            : " hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                        }`}
                        onClick={handleAutonomousToggle}
                      >
                        Off
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature Gauge */}
            <div className="col-12 col-md-4">
              <div className="container border border-white bg-neutral-950 rounded-lg py-4 px-0">
                <div className="text-center text-white">
                  <p className="text-xl">Temperature</p>

                  <div className="border-b mb-5"></div>

                  <p className="pt-3">
                    X: {joystickData.x} | Y: {joystickData.y}
                  </p>
                  <hr />

                  {/* Tab selection */}

                  <div className="flex items-center justify-center">
                    <p className="text-white text-lg font-semibold pe-3 my-auto">
                      Autonomous Mode:
                    </p>
                    <div className="border rounded py-1 px-2 bg-neutral-900">
                      <button
                        className={`${
                          isAutonomous
                            ? "bg-blue-700 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                            : " hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                        } mr-2`}
                        onClick={handleAutonomousToggle}
                      >
                        On
                      </button>
                      <button
                        className={`${
                          !isAutonomous
                            ? "bg-blue-700 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                            : " hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                        }`}
                        onClick={handleAutonomousToggle}
                      >
                        Off
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
