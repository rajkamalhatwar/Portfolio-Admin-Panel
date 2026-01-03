import React from "react";

const DynamicTable = ({ title, data, onEdit, hiddenColumns = [] }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted">No data available</p>;
  }

  // Filter headers based on hiddenColumns
  const headers = Object.keys(data[0]).filter(
    (key) => !hiddenColumns.includes(key)
  );

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>
                      {header.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </th>
                  ))}
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr key={row.id || index}>
                    {headers.map((key) => (
                      <td key={key}>
                        {Array.isArray(row[key])
                          ? row[key].length
                          : row[key]?.toString()}
                      </td>
                    ))}

                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>
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
};

export default DynamicTable;
