const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/student_data.js');
const axios = require('axios');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://mongo:27017/local')
    .then(() => console.log('Connected to student_data database'))
    .catch((err) => console.log('Error connecting to database', err));
}

// Routes
app.post('/api/search', async (req, res) => {
  try {
    const { major } = req.body;
    const students = await Student.find({ major });
    res.json({ success: true, students });
  } catch (err) {
    console.error('Error searching students by major:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/risklevel', async (req, res) => {
  try {
    const data = req.body;
    const risk = await fetch('http://localhost:5000/api/classifier', { 
      method: 'POST', 
      headers: { 'Content-Type':'application/json' }, 
      body: JSON.stringify(data)
    });
    const riskData = await risk.json();
    console.log("risk level works.", riskData.risk_level);
    res.json({ success: true, riskData });
  } catch (err) {
    console.log(err, 'when search risk level');
    res.status(500).json({ success: false, error: 'server error' });
  }
});

app.post('/api/auth/google', async (req, res) => {
  const { code } = req.body;
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.VITE.REACT_APP_GOOGLE_CLIENT_ID,
    client_secret: process.env.VITE.REACT_APP_GOOGLE_CLIENT_SECRET,
    redirect_uri: 'http://localhost:5173/auth/callback',
    grant_type: 'authorization_code',
  });

  const { id_token } = response.data;

  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const user = {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };

  const sessionToken = createJwtForUser(user);

  res.cookie('token', sessionToken, { 
    httpOnly: true,
    secure: true,
  });
  res.json({ user });
});

// Export app so tests can import it without starting the server
module.exports = app;

// Start server only if not in test mode
if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
