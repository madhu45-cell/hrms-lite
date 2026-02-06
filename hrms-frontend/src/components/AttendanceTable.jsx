export default function AttendanceTable({ records }) {
  if (records.length === 0) {
    return <p className="text-muted">No attendance records found.</p>;
  }

  return (
    <table className="table table-bordered bg-white">
      <thead className="table-light">
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id}>
            <td>{r.date}</td>
            <td>
              <span
                className={`badge ${
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
  );
}
