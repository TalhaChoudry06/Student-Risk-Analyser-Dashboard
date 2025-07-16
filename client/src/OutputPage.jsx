import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StudentTable from './components/StudentTable'; 
import './css/OutputPage.css';
import Navbar from './components/NavBar';
import RiskTable from './components/riskTable';

const OutputPage = () => {
  const location = useLocation();
  const students = location.state?.students;
  const risklevel = location.state?.risklevel;
  console.log(risklevel)
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
    <>
      <Navbar />
        <div className="output-wrapper">
          <div className="main-content">
            <h1>Students</h1>

            <input
              className="student-search-input"
              type="text"
              placeholder="Search by gender, major or GPA"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <StudentTable students={filteredData} />
          </div>

          <div className="risk-content">
            {risklevel && <RiskTable risklevel={risklevel} />}
          </div>
        </div>
    </>
  );
};

export default OutputPage;
