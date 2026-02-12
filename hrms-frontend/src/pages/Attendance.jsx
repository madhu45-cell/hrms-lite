import { useEffect, useState } from "react";
import api from "../api/api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import Loader from "../components/Loader";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    api.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const fetchAttendance = async (employeeId) => {
    if (!employeeId) return;

    setLoading(true);
    setHasSearched(true);
    setSelectedEmployee(employeeId);

    let url = `/attendance/?employee_id=${employeeId}`;

    if (fromDate && toDate) {
      url += `&from=${fromDate}&to=${toDate}`;
    }

    const res = await api.get(url);
    setRecords(res.data);
    setLoading(false);
  };


  const totalPresent = records.filter(
    (r) => r.status === "Present"
  ).length;

  const totalAbsent = records.filter(
    (r) => r.status === "Absent"
  ).length;

  return (
    <div className="container-fluid">


      <AttendanceForm refresh={fetchAttendance} />


      <div className="card shadow-lg border-0 rounded-4 mb-4">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-calendar-check-fill text-primary me-2"></i>
              View Attendance Records
            </h5>
          </div>

          <div className="row g-3">


            <div className="col-md-4">
              <label className="form-label fw-medium">
                Select Employee
              </label>
              <select
                className="form-select"
                value={selectedEmployee}
                onChange={(e) => fetchAttendance(e.target.value)}
              >
                <option value="">Choose Employee</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.full_name} ({e.employee_id})
                  </option>
                ))}
              </select>
            </div>


            <div className="col-md-3">
              <label className="form-label fw-medium">From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>


            <div className="col-md-3">
              <label className="form-label fw-medium">To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>


            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={() => fetchAttendance(selectedEmployee)}
              >
                Filter
              </button>
            </div>

          </div>
        </div>
      </div>


      {loading && <Loader />}


      {!loading && records.length > 0 && (
        <div className="row g-4 mb-4">

          <SummaryCard
            title="Total Records"
            value={records.length}
            color="primary"
            icon="bi-list-check"
          />

          <SummaryCard
            title="Total Present"
            value={totalPresent}
            color="success"
            icon="bi-check-circle-fill"
          />

          <SummaryCard
            title="Total Absent"
            value={totalAbsent}
            color="danger"
            icon="bi-x-circle-fill"
          />

        </div>
      )}


      {!loading && records.length > 0 && (
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body">
            <AttendanceTable records={records} />
          </div>
        </div>
      )}


      {!loading && hasSearched && records.length === 0 && (
        <div className="alert alert-info text-center shadow-sm">
          No attendance records found for selected criteria.
        </div>
      )}
    </div>
  );
}



function SummaryCard({ title, value, color, icon }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm border-0 rounded-4 text-center">
        <div className="card-body">
          <i className={`bi ${icon} fs-2 text-${color}`}></i>
          <h6 className="mt-2 text-muted">{title}</h6>
          <h2 className={`fw-bold text-${color}`}>{value}</h2>
        </div>
      </div>
    </div>
  );
}
