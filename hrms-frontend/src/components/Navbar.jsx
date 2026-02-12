import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{
          background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        }}
      >
        <div className="container-fluid px-4">

          {/* Brand */}
          <NavLink className="navbar-brand fw-bold text-white fs-4" to="/">
            <i className="bi bi-people-fill me-2"></i>
            HRMS Lite
          </NavLink>

          {/* Toggle Button */}
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav ms-auto gap-lg-3">
              <NavItem to="/" icon="bi-speedometer2" label="Dashboard" />
              <NavItem to="/employees" icon="bi-person-badge" label="Employees" />
              <NavItem to="/attendance" icon="bi-calendar-check" label="Attendance" />
            </ul>
          </div>

        </div>
      </nav>

      {/* Right Side Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offcanvasNavbar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 gap-3">
            <NavItem to="/" icon="bi-speedometer2" label="Dashboard" />
            <NavItem to="/employees" icon="bi-person-badge" label="Employees" />
            <NavItem to="/attendance" icon="bi-calendar-check" label="Attendance" />
          </ul>
        </div>
      </div>
    </>
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
        data-bs-dismiss="offcanvas"
      >
        <i className={`bi ${icon}`}></i>
        {label}
      </NavLink>
    </li>
  );
}
