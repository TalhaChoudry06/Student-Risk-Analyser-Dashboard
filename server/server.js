const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/student_data.js');
const axios = require('axios');
const redis = require('redis');
const csv = require('csv-parser');
const path = require('path');
const fs = require("fs");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://mongo:27017/local')
    .then(async () => {
      console.log('Connected to student_data database');

      // Path to your CSV file
      const csvFilePath = path.join(__dirname, 'data', 'college_student_management_data.csv');

      // Array to store parsed data
      const results = [];

      // Parse CSV
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', async () => {
          try {
            // Optional: Clear existing collection
            await Student.deleteMany({});

            // Insert new data
            await Student.insertMany(results);

            console.log('CSV data successfully imported into MongoDB.');
          } catch (error) {
            console.error('Error importing CSV data:', error);
          }
        });

    })
    .catch((err) => console.log('Error connecting to database', err));
}

const client = redis.createClient({
  socket: { host: "redis", port: 6379 }
});

client.on("error", (err) => console.error("Redis Client Error", err));

const cacheMiddleware = async (req, res, next) => {
  const cacheKey = req.originalUrl + JSON.stringify(req.body);
  try {
    const cached = await client.get(cacheKey);
    if (cached) {
      console.log(`[Cache Hit] ${cacheKey}`);
      const data = JSON.parse(cached);
      return res.json({ success: true, students: data });
    } else {
      console.log(`[Cache Miss] ${cacheKey}`);
    }
  } catch (err) {
    console.error("Redis error:", err);
  }
  next();
};

const benchmarkMiddleware = (req, res, next) => {
  const start = Date.now();

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const duration = Date.now() - start;
    console.log(`[Benchmark] ${req.method} ${req.originalUrl} took ${duration}ms`);
    return originalJson(body);
  };

  next();
};

// Routes
app.post('/api/search', benchmarkMiddleware, cacheMiddleware, async (req, res) => {
  try {
    const { major } = req.body;
    const students = await Student.find({ major });

    const cacheKey = req.originalUrl + JSON.stringify(req.body);
    await client.set(cacheKey, JSON.stringify(students), { EX: 120 }); // expires in 2 min

    res.json({ success: true, students });
  } catch (err) {
    console.error('Error searching students by major:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/risklevel', async (req, res) => {
  try {
    const data = req.body;
    const risk = await fetch('http://flaskapiserver:5000/api/classifier', { 
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

const startServer = async () => {
  await client.connect();
  console.log("Connected to Redis");

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

if (require.main === module) startServer();
