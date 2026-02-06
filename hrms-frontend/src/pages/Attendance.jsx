import { useEffect, useState } from "react";
import api from "../api/api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import Loader from "../components/Loader";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    api.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const fetchAttendance = async (employeeId) => {
    if (!employeeId) return;

    setLoading(true);
    setHasSearched(true);

    const res = await api.get(
      `/attendance/?employee_id=${employeeId}`
    );

    setRecords(res.data);
    setLoading(false);
  };

  return (
    <>
      <AttendanceForm refresh={fetchAttendance} />

      {/* View Attendance */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="mb-3">View Attendance Records</h5>

          <select
            className="form-select"
            onChange={(e) => fetchAttendance(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.full_name} ({e.employee_id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && records.length > 0 && (
        <AttendanceTable records={records} />
      )}

      {!loading && hasSearched && records.length === 0 && (
        <div className="alert alert-info">
          No attendance records found.
        </div>
      )}
    </>
  );
}
