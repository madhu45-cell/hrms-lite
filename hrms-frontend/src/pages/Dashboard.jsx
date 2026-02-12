import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    absent: 0,
  });

  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const employeesRes = await api.get("/employees/");
      const attendanceRes = await api.get("/attendance/");

      const employees = employeesRes.data;
      const attendance = attendanceRes.data;

      const today = new Date().toISOString().split("T")[0];

      const todayAttendance = attendance.filter(
        (a) => a.date === today
      );


      setStats({
        employees: employees.length,
        present: todayAttendance.filter(
          (a) => a.status === "Present"
        ).length,
        absent: todayAttendance.filter(
          (a) => a.status === "Absent"
        ).length,
      });


      const presentCountMap = {};
      const absentCountMap = {};

      attendance.forEach((a) => {
        if (a.status === "Present") {
          presentCountMap[a.employee] =
            (presentCountMap[a.employee] || 0) + 1;
        }

        if (a.status === "Absent") {
          absentCountMap[a.employee] =
            (absentCountMap[a.employee] || 0) + 1;
        }
      });

      const summary = employees.map((emp) => ({
        id: emp.id,
        name: emp.full_name,
        employeeId: emp.employee_id,
        presentDays: presentCountMap[emp.id] || 0,
        absentDays: absentCountMap[emp.id] || 0,
      }));

      setAttendanceSummary(summary);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container-fluid">


      <div className="row g-4 mb-4">
        <StatCard
          title="Total Employees"
          value={stats.employees}
          color="primary"
          icon="bi-people-fill"
        />
        <StatCard
          title="Present Today"
          value={stats.present}
          color="success"
          icon="bi-check-circle-fill"
        />
        <StatCard
          title="Absent Today"
          value={stats.absent}
          color="danger"
          icon="bi-x-circle-fill"
        />
      </div>


      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-bar-chart-fill text-primary me-2"></i>
              Attendance Summary Per Employee
            </h5>
            <span className="badge bg-primary">
              Employees: {attendanceSummary.length}
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Total Present</th>
                  <th>Total Absent</th>
                </tr>
              </thead>
              <tbody>
                {attendanceSummary.map((e) => (
                  <tr key={e.id}>
                    <td className="fw-medium">{e.employeeId}</td>
                    <td>{e.name}</td>
                    <td>
                      <span className="badge bg-success px-3 py-2">
                        {e.presentDays}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-danger px-3 py-2">
                        {e.absentDays}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}



function StatCard({ title, value, color, icon }) {
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
