import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="vh-100 p-4"
      style={{
        width: "260px",
        background: "linear-gradient(180deg, #1e3c72, #2a5298)",
      }}
    >
      <h3 className="fw-bold mb-5 text-white">
        <i className="bi bi-people-fill me-2"></i>
        HRMS Lite
      </h3>

      <ul className="nav flex-column gap-2">
        <SidebarItem to="/" icon="bi-speedometer2" label="Dashboard" />
        <SidebarItem to="/employees" icon="bi-person-badge" label="Employees" />
        <SidebarItem to="/attendance" icon="bi-calendar-check" label="Attendance" />
      </ul>
    </div>
  );
}

function SidebarItem({ to, icon, label }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded
          ${isActive
            ? "bg-white text-dark fw-semibold"
            : "text-white opacity-75"}`
        }
      >
        <i className={`bi ${icon}`}></i>
        {label}
      </NavLink>
    </li>
  );
}
