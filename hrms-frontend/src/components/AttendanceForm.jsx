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

    await api.post("/attendance/", {
      employee: form.employee,
      date: form.date,
      status: form.status,
    });

    setForm({ employee: "", date: "", status: "Present" });
    refresh(form.employee);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Mark Attendance</h5>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <select
              className="form-select"
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

          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
