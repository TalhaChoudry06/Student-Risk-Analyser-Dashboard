import React from 'react';
import { useNavigate } from 'react-router-dom';

const FilterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect all form data
    const form = e.target;

    // For checkboxes with same name "major", get all checked values as array
    const majors = Array.from(form.major)
      .filter(input => input.checked)
      .map(input => input.value);

    // Construct JSON payload
    const payload = {
      age: Number(form.age.value),
      gender: form.gender.value,
      major: majors,
      GPA: Number(form.GPA.value),
      course_load: Number(form.course_load.value),
      avg_course_grade: Number(form.avg_course_grade.value),
      attendance_rate: Number(form.attendance_rate.value),
      lms_logins_past_month: Number(form.lms_logins_past_month.value),
      avg_session_duration_minutes: Number(form.avg_session_duration_minutes.value),
      assignment_submission_rate: Number(form.assignment_submission_rate.value),
      forum_participation_count: Number(form.forum_participation_count.value),
      video_completion_rate: Number(form.video_completion_rate.value),
    };

    try {
      const res = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      console.log(data)
      // Redirect to output page with response data
      navigate('/output', { state: { students: data.students } });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Data Editor</h2>

      <fieldset>
        <legend>Age</legend>
        <input type="number" name="age" defaultValue={21} min="0" />
      </fieldset>

      <fieldset>
        <legend>Gender</legend>
        <label><input type="radio" name="gender" value="Male" defaultChecked /> Male</label><br />
        <label><input type="radio" name="gender" value="Female" /> Female</label><br />
        <label><input type="radio" name="gender" value="Other" /> Other</label>
      </fieldset>

      <fieldset>
        <legend>Major</legend>
        <label><input type="checkbox" name="major" value="Arts" defaultChecked /> Arts</label><br />
        <label><input type="checkbox" name="major" value="Computer Science" /> Computer Science</label><br />
        <label><input type="checkbox" name="major" value="Engineering" /> Engineering</label><br />
        <label><input type="checkbox" name="major" value="Business" /> Business</label><br />
      </fieldset>

      <fieldset>
        <legend>GPA</legend>
        <input type="number" step="0.01" min="0" max="4" name="GPA" defaultValue={3.73} />
      </fieldset>

      <fieldset>
        <legend>Course Load</legend>
        <input type="number" min="0" name="course_load" defaultValue={6} />
      </fieldset>

      <fieldset>
        <legend>Average Course Grade</legend>
        <input type="number" step="0.1" min="0" max="100" name="avg_course_grade" defaultValue={64.4} />
      </fieldset>

      <fieldset>
        <legend>Attendance Rate</legend>
        <input type="number" step="0.01" min="0" max="1" name="attendance_rate" defaultValue={0.84} />
      </fieldset>

      <fieldset>
        <legend>LMS Logins Past Month</legend>
        <input type="number" min="0" name="lms_logins_past_month" defaultValue={29} />
      </fieldset>

      <fieldset>
        <legend>Average Session Duration (minutes)</legend>
        <input type="number" min="0" name="avg_session_duration_minutes" defaultValue={53} />
      </fieldset>

      <fieldset>
        <legend>Assignment Submission Rate</legend>
        <input type="number" step="0.01" min="0" max="1" name="assignment_submission_rate" defaultValue={0.91} />
      </fieldset>

      <fieldset>
        <legend>Forum Participation Count</legend>
        <input type="number" min="0" name="forum_participation_count" defaultValue={13} />
      </fieldset>

      <fieldset>
        <legend>Video Completion Rate</legend>
        <input type="number" step="0.01" min="0" max="1" name="video_completion_rate" defaultValue={0.85} />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FilterForm;
