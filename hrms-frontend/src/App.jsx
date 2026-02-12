import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}
