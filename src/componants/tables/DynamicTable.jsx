import React from "react";


const DynamicTable = ({ title, data = [], onEdit, onDelete, hiddenColumns = [] }) => {
  if (!Array.isArray(data) || data.length === 0 || !data[0]) {
    return <p className="text-muted">No data available</p>;
  }

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
                  <th>Edit</th>
                  <th>Delete</th>                  
                  {headers.map((header) => (
                    <th key={header}>
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
                          className="mdi mdi-file-edit-outline text-primary me-3 cursor-pointer"
                          title="Edit"
                          style={{ fontSize: "25px",cursor: "pointer" }} 
                          onClick={() => onEdit(row)}
                        ></i>
                    </td>
                    <td className="text-center align-middle">
                        <i
                          className="mdi mdi-trash-can-outline text-danger cursor-pointer"
                          title="Delete"
                          style={{ fontSize: "25px",cursor: "pointer"  }} 
                          onClick={() => onDelete(row.id)}
                        ></i>
                    </td>         
                    {headers.map((key) => (
                      <td key={key}>
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
