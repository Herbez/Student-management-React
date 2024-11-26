import React, { useState } from 'react';
import EditStudent from './EditStudent';
import { Link } from 'react-router-dom'

function StudentForm() {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, { name, class: studentClass }]);
    setName('');
    setStudentClass('');
  };

  const handleEdit = (index) => {
    setEditingStudent({ ...students[index], index });
  };

  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleUpdate = (updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[updatedStudent.index] = {
      name: updatedStudent.name,
      class: updatedStudent.class,
    };
    setStudents(updatedStudents);
    setEditingStudent(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      {editingStudent ? (
        <EditStudent
          student={editingStudent}
          onUpdate={handleUpdate}
          onCancel={() => setEditingStudent(null)}
        />
      ) : (
        <>
          <h2>Add Student</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Class:</label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
              Submit
            </button>
          </form>

          <h3 style={{ marginTop: '20px' }}>Students List
          <Link
            to="/assign-marks"
            state={{ students }} // Pass students as state
            style={{
              textDecoration: "none",
              marginLeft: "150px",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
            }} > Assign Marks
          </Link>

          </h3>

          {students.length > 0 ? (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '10px',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Class</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.class}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEdit(index)}
                        style={{
                          marginRight: '5px',
                          padding: '5px 10px',
                          cursor: 'pointer',
                          backgroundColor: '#4CAF50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        style={{
                          padding: '5px 10px',
                          cursor: 'pointer',
                          backgroundColor: '#f44336',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students added yet.</p>
          )}
        </>
      )}
    </div>
  );
}

export default StudentForm;
