import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Restaurant from "./components/restaurant";
import Car from "./components/car";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-orange-300 p-4">
        <div className="flex justify-center gap-8">
          <Link to="/restaurant" className="text-white hover:text-orange-700">Restaurant</Link>
          <Link to="/car" className="text-white hover:text-orange-700">Car</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/car" element={<Car />} />
        <Route path="/" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
