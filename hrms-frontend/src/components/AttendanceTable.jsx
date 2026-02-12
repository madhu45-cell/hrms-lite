export default function AttendanceTable({ records }) {
  if (records.length === 0) {
    return (
      <div className="card shadow-sm border-0 rounded-4 p-4 text-center">
        <i className="bi bi-calendar-x fs-1 text-muted"></i>
        <h5 className="mt-3 text-muted">
          No attendance records found
        </h5>
        <p className="text-secondary small">
          Mark attendance to see records here.
        </p>
      </div>
    );
  }

  return (
    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-clock-history text-primary me-2"></i>
            Attendance Records
          </h5>
          <span className="badge bg-primary">
            Total: {records.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle table-hover">

            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th className="fw-semibold">Date</th>
                <th className="fw-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td className="fw-medium">{r.date}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        r.status === "Present"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {r.status}
                    </span>
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
