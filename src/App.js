import "./App.css";
import { Contact } from "./Contact";
import { NavBar } from "./NavBar";
import { Vehicles } from "./Vehicles";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Contact />
      <Vehicles />
    </div>
  );
}

export default App;
