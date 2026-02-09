import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Save, Check, X } from 'lucide-react';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const studentRes = await axios.get('/api/students');
      const attendanceRes = await axios.get(`/api/attendance/${date}`);

      setStudents(studentRes.data);

      // Initialize records if empty
      if (attendanceRes.data.length === 0) {
        setAttendanceRecords(studentRes.data.map(s => ({
          studentId: s.id,
          status: 'Present' // Default to present
        })));
      } else {
        setAttendanceRecords(attendanceRes.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = (studentId) => {
    setAttendanceRecords(prev => prev.map(rec =>
      rec.studentId === studentId
        ? { ...rec, status: rec.status === 'Present' ? 'Absent' : 'Present' }
        : rec
    ));
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/attendance', {
        date,
        records: attendanceRecords
      });
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Failed to save attendance');
    }
  };

  return (
    <div className="attendance-container">
      <div className="page-header">
        <h2 className="page-title">Mark Attendance</h2>
        <div className="header-actions">
          <div className="date-picker-wrapper">
            <Calendar size={20} />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={20} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="attendance-marking-grid">
        {loading ? (
          <p>Loading...</p>
        ) : students.map(student => {
          const record = attendanceRecords.find(r => r.studentId === student.id);
          const isPresent = record?.status === 'Present';

          return (
            <div key={student.id} className={`attendance-card glass-card ${isPresent ? 'present' : 'absent'}`} onClick={() => toggleStatus(student.id)}>
              <div className="student-info">
                <span className="roll">#{student.rollNo}</span>
                <h4>{student.name}</h4>
                <span className="class">{student.class}</span>
              </div>
              <div className="status-indicator">
                {isPresent ? <Check size={24} /> : <X size={24} />}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Attendance;
