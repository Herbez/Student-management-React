import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import EditStudent from './components/EditStudent';
import AssignMarks from './components/AssignMarks';
import StudentReport from './components/StudentReport';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/edit/:index" element={<EditStudent />} />
        <Route path="/assign-marks" element={<AssignMarks />} />
        <Route path="/student-report" element={<StudentReport />} />
      </Routes>
      
    </Router>
  );
}

export default App;
