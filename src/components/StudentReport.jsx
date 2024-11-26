import React from "react";
import { useLocation } from "react-router-dom";

function StudentReport() {
  const location = useLocation();
  const students = location.state?.students || []; // Get students passed from AssignMarks

  // Add total marks and average calculation
  const studentsWithMarks = students.map((student) => {
    const totalMarks =
      parseFloat(student.marks.Math || 0) +
      parseFloat(student.marks.Physics || 0) +
      parseFloat(student.marks.Computer || 0);
    const averageMarks = totalMarks / 3;
    return {
      ...student,
      totalMarks,
      averageMarks,
    };
  });

  // Sort students by average marks in descending order
  studentsWithMarks.sort((a, b) => b.averageMarks - a.averageMarks);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Report</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rank</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Total Marks
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Average Marks
            </th>
          </tr>
        </thead>
        <tbody>
          {studentsWithMarks.map((student, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {index + 1}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {student.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {student.totalMarks}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {student.averageMarks.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentReport;
