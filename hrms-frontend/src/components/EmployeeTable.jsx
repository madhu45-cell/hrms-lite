import api from "../api/api";

export default function EmployeeTable({ employees, refresh }) {
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await api.delete(`/employees/${id}/`);
      refresh();
    }
  };

  if (employees.length === 0) {
    return (
      <div className="card shadow-sm border-0 rounded-4 p-4 text-center">
        <i className="bi bi-people fs-1 text-muted"></i>
        <h5 className="mt-3 text-muted">No employees added yet</h5>
        <p className="text-secondary small">
          Add employees to see them listed here.
        </p>
      </div>
    );
  }

  return (
    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-body">


        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-person-lines-fill me-2 text-primary"></i>
            Employee List
          </h5>
          <span className="badge bg-primary">
            Total: {employees.length}
          </span>
        </div>


        <div className="table-responsive">
          <table className="table align-middle table-hover">

            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th className="fw-semibold">Employee ID</th>
                <th className="fw-semibold">Name</th>
                <th className="fw-semibold">Email</th>
                <th className="fw-semibold">Department</th>
                <th className="fw-semibold text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-top">
                  <td className="fw-medium">{e.employee_id}</td>
                  <td>{e.full_name}</td>
                  <td className="text-muted">{e.email}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {e.department}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => deleteEmployee(e.id)}
                      className="btn btn-sm btn-outline-danger rounded-3"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
