import { useEffect, useState } from "react";
import api from "../api/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import Loader from "../components/Loader";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await api.get("/employees/");
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <EmployeeForm refresh={fetchEmployees} />
      {loading ? <Loader /> : <EmployeeTable employees={employees} refresh={fetchEmployees} />}
    </>
  );
}
