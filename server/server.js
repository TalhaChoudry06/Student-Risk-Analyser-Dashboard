import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/student_data.js';
import axios from 'axios';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
}));

// parse incoming json bodies
app.use(express.json());  

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/local', {
}).then(() => {
  console.log('Connected to student_data database');
}).catch((err) => {
  console.log('Error connecting to database', err);
});

const port = 3000; // Use the port provided by the host or default to 3000

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Read (GET) all items
app.post('/api/search', async (req, res) => {
  try{
    const data = req.body;
    const major = data.major;
    // console.log(data);
    // console.log(major);

    const students = await Student.find({major: major});
    res.json({ success: true, students });
  } catch (err) {
    console.error('Error searching students by major:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/risklevel', async (req, res) => {
  try{
    const data = req.body;
    const risk = await fetch('http://localhost:5000/api/classifier', { method: 'POST', headers: {'Content-Type':'application/json' }, body: JSON.stringify(data)});
    const riskData = await risk.json();
    console.log("risk level works.", riskData.risk_level);
    res.json({success: true, risk});
  } catch (err) {
    console.log(err, 'when search risk level');
    res.status(500).json({success: false, error: 'server error'});
  }
})

app.post('/api/auth/google', async (req, res) => {

  const { code } = req.body
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code, 
    client_id: process.env.VITE.REACT_APP_GOOGLE_CLIENT_ID,
    client_secret: process.env.VITE.REACT_APP_GOOGLE_CLIENT_SECRET,
    redirect_uri: 'http://localhost:5173/auth/callback',
    grant_type: 'authorization_code',
  });
  
  const { id_token, access_token } = response.data;

  // Decode the ID token (JWT) to get user info
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload(); // { email, name, sub, picture, etc. }

  // demo dummy object
  const user = {
    id: payload.sub,          
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };

  // Create a session (JWT or cookie)
  const sessionToken = createJwtForUser(user);

  // Send token to frontend (or set cookie)
  res.cookie('token', sessionToken, { 
    httpOnly: true,
    secure: true,
  });
  res.json({ user });
});


// try{
//   const student = await Student.findOne({ _id: "S002" });
//   console.log(student);
//   const unique_majors = await Student.distinct("major");
//   console.log(unique_majors)

//   } catch (err) {
//   console.error(err)
// }