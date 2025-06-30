import React from 'react';

const FilterForm = () => {
  return (
  <form method="POST" action="http://localhost:3000/api/search">
    <h2>Student Data Editor</h2>

    <fieldset>
      <legend>Age</legend>
      <input type="number" name="age" value="21" min="0" />
    </fieldset>

    <fieldset>
      <legend>Gender</legend>
      <label><input type="radio" name="gender" value="Male" checked /> Male</label><br />
      <label><input type="radio" name="gender" value="Female" /> Female</label><br />
      <label><input type="radio" name="gender" value="Other" /> Other</label>
    </fieldset>

    <fieldset>
      <legend>Major</legend>
      <label><input type="checkbox" name="major" value="Arts" checked /> Arts</label><br />
      <label><input type="checkbox" name="major" value="Computer Science" /> Computer Science</label><br />
      <label><input type="checkbox" name="major" value="Engineering" /> Engineering</label><br />
      <label><input type="checkbox" name="major" value="Business" /> Business</label><br />
    </fieldset>

    <fieldset>
      <legend>GPA</legend>
      <input type="number" step="0.01" min="0" max="4" name="GPA" value="3.73" />
    </fieldset>

    <fieldset>
      <legend>Course Load</legend>
      <input type="number" min="0" name="course_load" value="6" />
    </fieldset>

    <fieldset>
      <legend>Average Course Grade</legend>
      <input type="number" step="0.1" min="0" max="100" name="avg_course_grade" value="64.4" />
    </fieldset>

    <fieldset>
      <legend>Attendance Rate</legend>
      <input type="number" step="0.01" min="0" max="1" name="attendance_rate" value="0.84" />
    </fieldset>

    <fieldset>
      <legend>LMS Logins Past Month</legend>
      <input type="number" min="0" name="lms_logins_past_month" value="29" />
    </fieldset>

    <fieldset>
      <legend>Average Session Duration (minutes)</legend>
      <input type="number" min="0" name="avg_session_duration_minutes" value="53" />
    </fieldset>

    <fieldset>
      <legend>Assignment Submission Rate</legend>
      <input type="number" step="0.01" min="0" max="1" name="assignment_submission_rate" value="0.91" />
    </fieldset>

    <fieldset>
      <legend>Forum Participation Count</legend>
      <input type="number" min="0" name="forum_participation_count" value="13" />
    </fieldset>

    <fieldset>
      <legend>Video Completion Rate</legend>
      <input type="number" step="0.01" min="0" max="1" name="video_completion_rate" value="0.85" />
    </fieldset>

    <button type="submit">Submit</button>
  </form>
  );
};

export default FilterForm;
