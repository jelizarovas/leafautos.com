import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";

import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { VehiclePage } from "./VehiclePage";
import { Vehicles } from "./Vehicles";

function App() {
  const [vehicleId, setVehicleId] = React.useState(null);

  const handleVehicleId = (id) => {
    setVehicleId((v) => (v === id ? null : id));
  };

  return (
    <div className="App flex flex-col  min-h-screen">
      <NavBar />
      <Contact />
      <Outlet />
      {/* <Vehicles className="flex-grow" setVehicleId={handleVehicleId} />
      {vehicleId && <VehiclePage vehicleId={vehicleId} />} */}
      <Footer />
    </div>
  );
}

export default App;
