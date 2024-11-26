import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function AssignMarks() {
  const location = useLocation();
  const initialStudents = location.state?.students || []; // Retrieve students from passed state
  const [students, setStudents] = useState(initialStudents); // Maintain the updated state
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null); // Track selected student
  const [marks, setMarks] = useState({ Math: "", Physics: "", Computer: "" }); // Store input marks
  const [assignedRecords, setAssignedRecords] = useState([]); // Store records of assigned students
  const navigate = useNavigate();

  const handleStudentChange = (event) => {
    const index = event.target.value;
    setSelectedStudentIndex(index);
    const student = students[index];
    setMarks(student.marks || { Math: "", Physics: "", Computer: "" });
  };

  const handleInputChange = (subject, value) => {
    setMarks((prevMarks) => ({ ...prevMarks, [subject]: value }));
  };

  const handleAssignMarks = () => {
    if (selectedStudentIndex === null || !marks.Math || !marks.Physics || !marks.Computer) {
      alert("Please enter marks for all subjects.");
      return;
    }

    const updatedStudents = [...students];
    updatedStudents[selectedStudentIndex].marks = marks; // Update selected student marks
    setStudents(updatedStudents);

    // Check if student already exists in assignedRecords
    const existingIndex = assignedRecords.findIndex(
      (record) =>
        record.name === updatedStudents[selectedStudentIndex].name &&
        record.class === updatedStudents[selectedStudentIndex].class
    );

    if (existingIndex !== -1) {
      // Update existing record
      const updatedRecords = [...assignedRecords];
      updatedRecords[existingIndex].marks = marks;
      setAssignedRecords(updatedRecords);
    } else {
      // Add new record
      setAssignedRecords((prevRecords) => [
        ...prevRecords,
        {
          name: updatedStudents[selectedStudentIndex].name,
          class: updatedStudents[selectedStudentIndex].class,
          marks,
        },
      ]);
    }

    // Reset marks and selection
    setSelectedStudentIndex(null);
    setMarks({ Math: "", Physics: "", Computer: "" });
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = assignedRecords.filter((_, i) => i !== index);
    setAssignedRecords(updatedRecords);
  };

  const handleGenerateReport = () => {
    navigate("/student-report", { state: { students } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assign Marks</h2>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "15px",
          position: "absolute",
          top: 10,
        }}
      >
        Back to register
      </Link>

      {students.length > 0 ? (
        <>
          {/* Student Selector */}
          <label
            htmlFor="studentSelect"
            style={{ display: "block", marginBottom: "10px" }}
          >
            Select a Student:
          </label>
          <select
            id="studentSelect"
            value={selectedStudentIndex || ""}
            onChange={handleStudentChange}
            style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
          >
            <option value="" disabled>
              Choose a student
            </option>
            {students.map((student, index) => (
              <option key={index} value={index}>
                {student.name} (Class: {student.class})
              </option>
            ))}
          </select>

          {/* Marks Input Form (Visible when a student is selected) */}
          {selectedStudentIndex !== null && (
            <div style={{ marginBottom: "20px" }}>
              <h3>Assign Marks for {students[selectedStudentIndex].name}</h3>
              <div style={{ marginBottom: "10px" }}>
                <label>Math:</label>
                <input
                  type="number"
                  value={marks.Math}
                  onChange={(e) => handleInputChange("Math", e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Physics:</label>
                <input
                  type="number"
                  value={marks.Physics}
                  onChange={(e) => handleInputChange("Physics", e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Computer:</label>
                <input
                  type="number"
                  value={marks.Computer}
                  onChange={(e) => handleInputChange("Computer", e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </div>
              <button
                onClick={handleAssignMarks}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Assign
              </button>
            </div>
          )}

          {/* Display Assigned Records */}
          {assignedRecords.length > 0 && (
            <>
              <h3>Assigned Marks</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Name
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Class
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Math
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Physics
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Computer
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assignedRecords.map((record, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {record.name}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {record.class}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {record.marks.Math}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {record.marks.Physics}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {record.marks.Computer}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <button
                          onClick={() => handleDeleteRecord(index)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "3px",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Navigate to StudentReport page */}
              <button
  onClick={handleGenerateReport}
  style={{
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "20px",
  }}
>
  Generate Report
</button>
            </>
          )}
        </>
      ) : (
        <p>No students available for assigning marks.</p>
      )}
    </div>
  );
}

export default AssignMarks;
