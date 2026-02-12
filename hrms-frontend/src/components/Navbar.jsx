import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
      }}
    >
      <div className="container-fluid px-4">
        
        {/* Logo */}
        <NavLink className="navbar-brand fw-bold text-white fs-4" to="/">
          <i className="bi bi-people-fill me-2"></i>
          HRMS Lite
        </NavLink>

        {/* Toggle Button (Mobile) */}
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-3">

            <NavItem to="/" icon="bi-speedometer2" label="Dashboard" />
            <NavItem to="/employees" icon="bi-person-badge" label="Employees" />
            <NavItem to="/attendance" icon="bi-calendar-check" label="Attendance" />

          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 transition-all
          ${
            isActive
              ? "bg-white text-dark fw-semibold shadow-sm"
              : "text-white opacity-75"
          }`
        }
        style={{ transition: "0.3s ease" }}
      >
        <i className={`bi ${icon}`}></i>
        {label}
      </NavLink>
    </li>
  );
}

