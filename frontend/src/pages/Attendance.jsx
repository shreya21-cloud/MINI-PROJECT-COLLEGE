import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Save, Check, X, CheckSquare, XSquare, AlertTriangle } from 'lucide-react';

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
      // Dummy data for visual design since backend might be empty
      const dummyStudents = [
          { id: 1, name: 'Alice Smith', rollNo: '101', class: 'X-A' },
          { id: 2, name: 'Bob Johnson', rollNo: '102', class: 'X-A' },
          { id: 3, name: 'Charlie Brown', rollNo: '103', class: 'IX-B' },
          { id: 4, name: 'Diana Prince', rollNo: '201', class: 'XII-Sci' },
          { id: 5, name: 'Evan Peters', rollNo: '202', class: 'XII-Sci' },
          { id: 6, name: 'Fiona Gallagher', rollNo: '203', class: 'XI-Com' },
      ];
      setStudents(dummyStudents);
      setAttendanceRecords(dummyStudents.map(s => ({
          studentId: s.id,
          status: s.id % 2 === 0 ? 'Present' : 'Absent' // alternate for visual testing
      })));
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

  const markAll = (status) => {
    setAttendanceRecords(prev => prev.map(rec => ({ ...rec, status })));
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
      alert('Demo Mode: Attendance visually saved. Connect to backend for database storage.');
    }
  };

  const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'Absent').length;

  return (
    <div className="attendance-container animate-fade-in">
      <div className="page-header header-with-actions">
        <div>
            <h2 className="page-title">Mark Attendance</h2>
            <p className="page-subtitle">Track daily presence for your classes easily.</p>
        </div>
        <div className="header-actions">
           {/* Date Picker styled like a pill */}
          <div className="date-picker-wrapper">
            <Calendar size={18} color="#a1a1aa" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={18} />
            <span>Save Records</span>
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                  <span style={{ fontWeight: 600 }}>{presentCount} Present</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: '#f43f5e', boxShadow: '0 0 10px #f43f5e' }}></div>
                  <span style={{ fontWeight: 600 }}>{absentCount} Absent</span>
              </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn" 
                style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                onClick={() => markAll('Present')}
              >
                <CheckSquare size={18} />
                Mark All Present
              </button>
              <button 
                className="btn" 
                style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.2)' }}
                onClick={() => markAll('Absent')}
              >
                <XSquare size={18} />
                Mark All Absent
              </button>
          </div>
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div className="spinner"></div>
            <p>Loading class roster...</p>
        </div>
      ) : (
        <div className="attendance-marking-grid">
            {students.map(student => {
            const record = attendanceRecords.find(r => r.studentId === student.id);
            const isPresent = record?.status === 'Present';

            return (
                <div key={student.id} className={`glass-card attendance-card ${isPresent ? 'present' : 'absent'}`} onClick={() => toggleStatus(student.id)}>
                <div className="student-info">
                    <span className="roll">Roll No. {student.rollNo}</span>
                    <h4>{student.name}</h4>
                    <span className="class">{student.class}</span>
                </div>
                <div className="status-indicator">
                    {isPresent ? <Check size={28} strokeWidth={3} /> : <X size={28} strokeWidth={3} />}
                </div>
                </div>
            );
            })}
        </div>
      )}

    </div>
  );
};

export default Attendance;
