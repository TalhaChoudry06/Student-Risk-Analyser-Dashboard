import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StudentTable from './components/StudentTable'; 
import './css/OutputPage.css';
import Navbar from './components/NavBar';
import RiskTable from './components/riskTable';
import Charts from './components/charts';
const OutputPage = () => {
  const location = useLocation();
  const students = location.state?.students;
  const risklevel = location.state?.risklevel;
  console.log(risklevel)
  if (!students) return <p>No data found</p>;

  const [searchTerm, setSearchTerm] = useState('');
  const term = searchTerm.toLowerCase();

  const graphData = {
    "Histograms": [
      "age", "GPA", "course_load", "avg_course_grade", "attendance_rate",
      "lms_logins_past_month", "avg_session_duration_minutes",
      "assignment_submission_rate", "forum_participation_count", "video_completion_rate"
    ],
    "Boxplots by Major": [
      "age", "GPA", "course_load", "avg_course_grade", "attendance_rate",
      "lms_logins_past_month", "avg_session_duration_minutes",
      "assignment_submission_rate", "forum_participation_count", "video_completion_rate"
    ],
    "Scatter & Regression": [
      "risk_level_num vs attendance_rate",
      "risk_level_num vs avg_course_grade",
      "risk_level_num vs assignment_submission_rate",
      "risk_level_num vs lms_logins_past_month",
      "risk_level_num vs avg_session_duration_minutes",
      "GPA vs risk_level_num"
    ],
    "Correlation Heatmap": [
      "Correlation Heatmap"
    ],
    "Categorical Counts": [
      "gender", "major", "enrollment_status", "risk_level"
    ],
    "Boxplots by Risk Level": [
      "age", "GPA", "course_load", "avg_course_grade", "attendance_rate",
      "lms_logins_past_month", "avg_session_duration_minutes",
      "assignment_submission_rate", "forum_participation_count", "video_completion_rate"
    ],
    "Pairplot": [
      "Pairplot"
    ],
    "Violin Plots by Gender": [
      "GPA", "attendance_rate"
    ],
    "Pie Charts": [
      "risk_level", "enrollment_status", "gender", "major"
    ]
  };
  
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
          <div className="chart-tabels full-width">
            <Charts graphs={graphData} />
          </div>
        </div>
    </>
  );
};

export default OutputPage;
