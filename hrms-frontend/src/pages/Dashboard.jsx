import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    absent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const employeesRes = await api.get("/employees/");
      const attendanceRes = await api.get("/attendance/");

      const today = new Date().toISOString().split("T")[0];

      const todayAttendance = attendanceRes.data.filter(
        (a) => a.date === today
      );

      setStats({
        employees: employeesRes.data.length,
        present: todayAttendance.filter(a => a.status === "Present").length,
        absent: todayAttendance.filter(a => a.status === "Absent").length,
      });

      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h6>Total Employees</h6>
            <h2 className="text-primary">{stats.employees}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h6>Present Today</h6>
            <h2 className="text-success">{stats.present}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h6>Absent Today</h6>
            <h2 className="text-danger">{stats.absent}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
