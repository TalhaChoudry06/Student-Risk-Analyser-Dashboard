import React from 'react';
import '../css/StudentTable.css';

const StudentTable = ({ students }) => {
  if (!students || students.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Course Load</th>
            <th>Attendance</th>
            <th>Forum Posts</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={i}>
              <td>{student._id || 'N/A'}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{Array.isArray(student.major) ? student.major.join(', ') : student.major}</td>
              <td>{student.GPA}</td>
              <td>{student.course_load}</td>
              <td>{(student.attendance_rate * 100).toFixed(1)}%</td>
              <td>{student.forum_participation_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
