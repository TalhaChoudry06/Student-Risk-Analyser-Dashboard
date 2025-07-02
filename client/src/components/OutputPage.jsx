import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StudentTable from './StudentTable';  // Adjust path as needed
import '../OutputPage.css';

const OutputPage = () => {
  const location = useLocation();
  const students = location.state?.students;

  if (!students) return <p>No data found</p>;

  const [searchTerm, setSearchTerm] = useState('');
  const term = searchTerm.toLowerCase();

  const filteredData = students.filter((item) =>
    item.gender?.toLowerCase() === term ||
    (Array.isArray(item.major)
      ? item.major.join(', ').toLowerCase().includes(term)
      : item.major?.toLowerCase().includes(term)) ||
    item.GPA?.toString().includes(term)
  );

  return (
    <div className="output-container">
      <h1>Students</h1>

      <input
        type="text"
        placeholder="Search by gender, major or GPA"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
      />

      <StudentTable students={filteredData} />
    </div>
  );
};

export default OutputPage;
