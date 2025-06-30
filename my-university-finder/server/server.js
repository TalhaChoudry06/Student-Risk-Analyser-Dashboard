import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/student_data.js';

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

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Read (GET) all items
app.post('/api/search', async (req, res) => {
  try{
    const data = req.body;
    const major = data.major;
    console.log(data);
    console.log(major);

    const students = await Student.find({major: major});
    // console.log(student);
    res.json({ success: true, students });
  } catch (err) {
    console.error('Error searching students by major:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// try{
//   const student = await Student.findOne({ _id: "S002" });
//   console.log(student);
//   const unique_majors = await Student.distinct("major");
//   console.log(unique_majors)

//   } catch (err) {
//   console.error(err)
// }