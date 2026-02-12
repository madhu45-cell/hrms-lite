import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
      }}
    >
      <div className="container-fluid px-4">

        {/* Brand */}
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-people-fill me-2"></i>
          HRMS Lite
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <NavItem to="/" label="Dashboard" icon="bi-speedometer2" />
            <NavItem to="/employees" label="Employees" icon="bi-person-badge" />
            <NavItem to="/attendance" label="Attendance" icon="bi-calendar-check" />

          </ul>
        </div>

      </div>
    </nav>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center gap-2 ${
            isActive ? "active fw-semibold text-white" : "text-white"
          }`
        }
      >
        <i className={`bi ${icon}`}></i>
        {label}
      </NavLink>
    </li>
  );
}


