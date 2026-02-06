import api from "../api/api";

export default function EmployeeTable({ employees, refresh }) {
  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}/`);
    refresh();
  };

  if (employees.length === 0) {
    return <p className="text-muted">No employees added yet.</p>;
  }

  return (
    <table className="table table-bordered bg-white">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={e.id}>
            <td>{e.employee_id}</td>
            <td>{e.full_name}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>
            <td>
              <button
                onClick={() => deleteEmployee(e.id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
