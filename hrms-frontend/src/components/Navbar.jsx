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

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Menu */}
          <div className="d-none d-lg-flex ms-auto">
            <ul className="navbar-nav gap-3">
              <NavItem to="/" label="Dashboard" icon="bi-speedometer2" />
              <NavItem to="/employees" label="Employees" icon="bi-person-badge" />
              <NavItem to="/attendance" label="Attendance" icon="bi-calendar-check" />
            </ul>
          </div>

        </div>
      </nav>

      {/* Mobile Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav gap-3">
            <NavItem to="/" label="Dashboard" icon="bi-speedometer2" />
            <NavItem to="/employees" label="Employees" icon="bi-person-badge" />
            <NavItem to="/attendance" label="Attendance" icon="bi-calendar-check" />
          </ul>
        </div>
      </div>
    </>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 ${
            isActive
              ? "bg-primary text-white fw-semibold"
              : "text-dark"
          }`
        }
        data-bs-dismiss="offcanvas"
      >
        <i className={`bi ${icon}`}></i>
        {label}
      </NavLink>
    </li>
  );
}
