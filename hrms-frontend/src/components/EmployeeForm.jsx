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
      setSuccess("Employee created successfully ");
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
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="container-fluid mb-5">
      <div
        className="card border-0 shadow-lg rounded-4"
        style={{ background: "#ffffff" }}
      >
        <div className="card-body p-4">

          {/* Title */}
          <div className="mb-4">
            <h4 className="fw-bold text-dark">
              <i className="bi bi-person-plus-fill me-2 text-primary"></i>
              Add New Employee
            </h4>
            <p className="text-muted small mb-0">
              Fill in employee details to register in the system.
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="alert alert-danger rounded-3 py-2">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success rounded-3 py-2">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-4">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Employee ID
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  name="employee_id"
                  value={form.employee_id}
                  onChange={handleChange}
                  placeholder="Enter Employee ID"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control rounded-3 shadow-sm"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Enter Department"
                  required
                />
              </div>

              {/* Button */}
              <div className="col-12 mt-3">
                <button
                  type="submit"
                  className="btn w-100 rounded-3 fw-semibold text-white"
                  style={{
                    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
                    padding: "10px",
                    transition: "0.3s",
                  }}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Add Employee
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
