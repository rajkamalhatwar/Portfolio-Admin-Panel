import React from "react";
import DynamicTable from "../../componants/tables/DynamicTable.jsx";

function Education() {
  const educationData = 
[
    {
        "id": 1,
        "degreeName": "B.Tech",
        "branchName": "Computer Science",
        "markType": "CGPA",
        "marks": 8.10,
        "admissionMonth": "June",
        "admissionYear": 2019,
        "passingMonth": "May",
        "passingYear": 2023,
        "collegeName": "ABC College",
        "collegeAddress": "Pune",
        "userId": 2,
        "isActive": true,
        "createdDate": "0001-01-01T00:00:00",
        "skills": []
    },
    {
        "id": 2,
        "degreeName": "HSC",
        "branchName": "12th",
        "markType": "Marks",
        "marks": 76.00,
        "admissionMonth": "August",
        "admissionYear": 2019,
        "passingMonth": "May",
        "passingYear": 2023,
        "collegeName": "Janata Jr College Mouda",
        "collegeAddress": "Pune, Maharashtra",
        "userId": 2,
        "isActive": true,
        "createdDate": "0001-01-01T00:00:00",
        "skills": []
    },
    {
        "id": 4,
        "degreeName": "SSC",
        "branchName": "12th",
        "markType": "Marks",
        "marks": 76.00,
        "admissionMonth": "August",
        "admissionYear": 2019,
        "passingMonth": "May",
        "passingYear": 2023,
        "collegeName": "Janata Jr College Mouda",
        "collegeAddress": "Pune, Maharashtra",
        "userId": 2,
        "isActive": true,
        "createdDate": "0001-01-01T00:00:00",
        "skills": []
    }
]

  const handleEdit = (rowData) => {
    console.log("Edit clicked:", rowData);
    // ✅ here you get full row data for update
  };

  return (
    <DynamicTable
      title="Education Details"
      data={educationData}
      onEdit={handleEdit}
      hiddenColumns={["id", "userId", "createdDate", "skills"]}
    />
  );
}

export default Education;
