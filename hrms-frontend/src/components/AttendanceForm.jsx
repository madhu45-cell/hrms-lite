import { useEffect, useState } from "react";
import api from "../api/api";

export default function AttendanceForm({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    api.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/attendance/", form);

    setForm({ employee: "", date: "", status: "Present" });
    refresh(form.employee);
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 mb-4">
      <div className="card-body p-4">

        {/* Header */}
        <div className="mb-4">
          <h4 className="fw-bold">
            <i className="bi bi-calendar-check-fill text-primary me-2"></i>
            Mark Attendance
          </h4>
          <p className="text-muted small mb-0">
            Select employee and mark attendance status.
          </p>
        </div>

        <form className="row g-4" onSubmit={handleSubmit}>

          {/* Employee Select */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Employee
            </label>
            <select
              className="form-select rounded-3 shadow-sm"
              name="employee"
              value={form.employee}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.full_name} ({e.employee_id})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Date
            </label>
            <input
              type="date"
              className="form-control rounded-3 shadow-sm"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="col-md-2">
            <label className="form-label fw-semibold">
              Status
            </label>
            <select
              className="form-select rounded-3 shadow-sm"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>

          {/* Button */}
          <div className="col-md-2 d-flex align-items-end">
            <button
              type="submit"
              className="btn w-100 text-white fw-semibold rounded-3"
              style={{
                background:
                  "linear-gradient(90deg, #1e3c72, #2a5298)",
              }}
            >
              <i className="bi bi-save me-2"></i>
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

