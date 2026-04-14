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
let activities = [
    { id: 1, type: 'present', text: 'System initialized successfully', time: new Date().toLocaleString() }
];

const addActivity = (type, text) => {
    activities.unshift({ id: Date.now(), type, text, time: new Date().toLocaleString() });
    if(activities.length > 20) activities.pop(); // keep top 20
}

// Routes
app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  addActivity('present', `New student added: ${newStudent.name} (${newStudent.class})`);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...req.body };
        addActivity('alert', `Student ${students[index].name} info updated`);
        res.json(students[index]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if(student) {
        students = students.filter(s => s.id !== id);
        addActivity('absent', `Student ${student.name} deleted`);
        res.json({ message: 'Deleted' });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.get('/api/attendance/:date', (req, res) => {
  const { date } = req.params;
  res.json(attendance[date] || []);
});

app.post('/api/attendance', (req, res) => {
  const { date, records } = req.body;
  attendance[date] = records;
  
  const presentCount = records.filter(r => r.status === 'Present').length;
  addActivity('present', `Attendance saved for ${date} (${presentCount} present out of ${records.length})`);
  
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

app.get('/api/activities', (req, res) => {
    res.json(activities);
});

// CSV Export routes
app.get('/api/export/students', (req, res) => {
    let csv = 'ID,Name,Roll Number,Class\n';
    students.forEach(s => {
        csv += `${s.id},${s.name},${s.rollNo},${s.class}\n`;
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('students.csv');
    return res.send(csv);
});

app.get('/api/export/attendance', (req, res) => {
    let csv = 'Date,Student ID,Student Name,Roll Number,Class,Status\n';
    Object.keys(attendance).forEach(date => {
        attendance[date].forEach(record => {
            const student = students.find(s => s.id === record.studentId) || { name: 'Unknown', rollNo: 'N/A', class: 'N/A' };
            csv += `${date},${record.studentId},${student.name},${student.rollNo},${student.class},${record.status}\n`;
        });
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('attendance.csv');
    return res.send(csv);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
