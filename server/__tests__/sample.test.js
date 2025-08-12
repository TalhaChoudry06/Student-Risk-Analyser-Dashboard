const request = require('supertest');
const app = require('../server.js');
global.fetch = jest.fn();

describe('risk analyser test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('found risk level successfully', async () => {
    const payload = {
      age: 21,
      gender: "female",
      major: ["Computer Science", "Mathematics"],
      GPA: 3.75,
      course_load: 5,
      avg_course_grade: 88,
      attendance_rate: 95,
      lms_logins_past_month: 20,
      avg_session_duration_minutes: 45,
      assignment_submission_rate: 90,
      forum_participation_count: 10,
      video_completion_rate: 85      
    };

    fetch.mockResolvedValueOnce({
      json: async () => ({ risk_level: 'low' })
    });

    const response = await request(app)
      .post('/api/risklevel')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.riskData.risk_level).toBe('low');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('API down'));

    const payload = { age: 21 };

    const response = await request(app)
      .post('/api/risklevel')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('server error');
  });

});
