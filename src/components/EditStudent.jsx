import React, { useState } from 'react';

function EditStudent({ student, onUpdate, onCancel }) {
  const [name, setName] = useState(student.name);
  const [studentClass, setStudentClass] = useState(student.class);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate({ ...student, name, class: studentClass });
    alert('Student updated successfully!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
          Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
