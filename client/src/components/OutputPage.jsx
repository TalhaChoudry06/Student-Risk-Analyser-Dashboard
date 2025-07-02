import { useLocation } from 'react-router-dom';
import '../OutputPage.css';

const OutputPage = () => {
  const location = useLocation();
  const students = location.state?.students;
  console.log(students);
  if (!students) return <p>No data found</p>;

  return (
    <div className="output-container">
      <h1>Students with Selected Major</h1>
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
              {/* Add more headers as needed */}
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
                {/* Add more data cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutputPage;
