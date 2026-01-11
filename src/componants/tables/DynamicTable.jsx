import React from "react";

const DynamicTable = ({
  title,
  data = [],
  onEdit,
  onDelete,
  hiddenColumns = [],
  centerColumns = [] // 👈 new prop
}) => {
  if (!Array.isArray(data) || data.length === 0 || !data[0]) {
    return <p className="text-muted">No data available</p>;
  }

  const headers = Object.keys(data[0]).filter(
    (key) => !hiddenColumns.includes(key)
  );

  const isCenter = (key) => centerColumns.includes(key);

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="text-center">Edit</th>
                  <th className="text-center">Delete</th>

                  {headers.map((header) => (
                    <th
                      key={header}
                      className={isCenter(header) ? "text-center" : ""}
                    >
                      {header.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr key={row.id ?? index}>
                    <td className="text-center align-middle">
                      <i
                        className="mdi mdi-file-edit-outline text-primary"
                        style={{ fontSize: "25px", cursor: "pointer" }}
                        title="Edit"
                        onClick={() => onEdit(row)}
                      ></i>
                    </td>

                    <td className="text-center align-middle">
                      <i
                        className="mdi mdi-trash-can-outline text-danger"
                        style={{ fontSize: "25px", cursor: "pointer" }}
                        title="Delete"
                        onClick={() => onDelete(row.id)}
                      ></i>
                    </td>

                    {headers.map((key) => (
                      <td
                        key={key}
                        className={isCenter(key) ? "text-center" : ""}
                      >
                        {Array.isArray(row[key])
                          ? row[key].length
                          : row[key] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
