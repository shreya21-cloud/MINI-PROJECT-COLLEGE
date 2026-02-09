const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data for prototyping
let students = [
  { id: 1, name: 'John Doe', rollNo: '101', class: '10A' },
  { id: 2, name: 'Jane Smith', rollNo: '102', class: '10A' },
  { id: 3, name: 'Alice Johnson', rollNo: '103', class: '10B' },
];

let attendance = {}; // Format: { "2026-02-04": [{ studentId: 1, status: 'Present' }, ...] }

// Routes
app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get('/api/attendance/:date', (req, res) => {
  const { date } = req.params;
  res.json(attendance[date] || []);
});

app.post('/api/attendance', (req, res) => {
  const { date, records } = req.body;
  attendance[date] = records;
  res.json({ message: 'Attendance updated successfully', date });
});

app.get('/api/stats', (req, res) => {
    const totalStudents = students.length;
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance[today] || [];
    const presentCount = todayAttendance.filter(r => r.status === 'Present').length;
    const attendancePercentage = totalStudents > 0 ? (presentCount / totalStudents) * 100 : 0;

    res.json({
        totalStudents,
        presentToday: presentCount,
        attendancePercentage: attendancePercentage.toFixed(2)
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
