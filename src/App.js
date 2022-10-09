import "./App.css";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { Vehicles } from "./Vehicles";

function App() {
  return (
    <div className="App flex flex-col  min-h-screen">
      <NavBar />
      <Contact />
      <Vehicles className="flex-grow" />
      <Footer />
    </div>
  );
}

export default App;
