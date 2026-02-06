import { useState } from "react";
import api from "../api/api";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/employees/", form);
      setSuccess(" Employee created successfully");
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      refresh();
    } catch (err) {
      const data = err.response?.data;

      if (data?.employee_id) {
        setError(data.employee_id[0]);
      } else if (data?.email) {
        setError(data.email[0]);
      } else {
        setError(" Something went wrong");
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Add Employee</h5>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Employee ID"
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary">Add Employee</button>
          </div>
        </form>

        {/* Messages (NO UI CHANGE) */}
        {error && <p className="text-danger mt-3">{error}</p>}
        {success && <p className="text-success mt-3">{success}</p>}
      </div>
    </div>
  );
}
