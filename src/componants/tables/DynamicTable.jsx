import React from "react";

const DynamicTable = ({
  title,
  data = [],
  onEdit,
  onDelete,
  hiddenColumns = [],
  centerColumns = [],
  imageColumns = [],
  columnLabels = {},          // 👈 NEW
  imageWidth = 60,
  imageHeight = 60
}) => {
  if (!Array.isArray(data) || data.length === 0 || !data[0]) {
    return <p className="text-muted">No data available</p>;
  }

  const headers = Object.keys(data[0]).filter(
    (key) => !hiddenColumns.includes(key)
  );

  const isCenter = (key) =>
    centerColumns.includes(key) || imageColumns.includes(key);

  const isImageColumn = (key) => imageColumns.includes(key);

  const getHeaderLabel = (key) =>
    columnLabels[key] ??
    key.replace(/([A-Z])/g, " $1").toUpperCase();

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
                      {getHeaderLabel(header)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr key={row.id ?? index}>
                    {/* Edit */}
                    <td className="text-center align-middle">
                      <i
                        className="mdi mdi-file-edit-outline text-primary"
                        style={{ fontSize: "25px", cursor: "pointer" }}
                        onClick={() => onEdit(row)}
                      />
                    </td>

                    {/* Delete */}
                    <td className="text-center align-middle">
                      <i
                        className="mdi mdi-trash-can-outline text-danger"
                        style={{ fontSize: "25px", cursor: "pointer" }}
                        onClick={() => onDelete(row.id)}
                      />
                    </td>

                    {headers.map((key) => (
                      <td
                        key={key}
                        className={`align-middle ${
                          isCenter(key) ? "text-center" : ""
                        }`}
                      >
                        {isImageColumn(key) ? (
                          row[key] ? (
                            <img
                              src={row[key]}
                              alt="img"
                              width={imageWidth}
                              height={imageHeight}
                              style={{
                                objectFit: "cover",
                                borderRadius: "6px"
                              }}
                            />
                          ) : (
                            "-"
                          )
                        ) : Array.isArray(row[key]) ? (
                          row[key].length
                        ) : (
                          row[key] ?? "-"
                        )}
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
