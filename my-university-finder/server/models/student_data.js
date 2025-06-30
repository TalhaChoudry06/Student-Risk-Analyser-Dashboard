import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    _id: String,
    age: Number,
    major: String,
    GPA: Number,
    course_load: Number,
    avg_course_grade: Number,
    attendence_rate: Number,
    enrollment_status: String,
    lms_logins_past_month: Number,
    avg_session_duration_minutes: Number,
    assignment_submission_rate: Number,
    forum_participation_count: Number,
    video_completion_rate: Number,
    risk_level: String
  });

  const Student = mongoose.model('Student', studentSchema, 'student_data');
  export default Student;
  