import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, User, MoreVertical, Search } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.includes(searchTerm)
  );

  return (
    <div className="students-container">
      <div className="page-header">
        <h2 className="page-title">Students Registry</h2>
        <button className="btn btn-primary">
          <Plus size={20} />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="table-controls glass-card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container glass-card">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <div className="student-name-cell">
                    <div className="avatar">{student.name.charAt(0)}</div>
                    <span>{student.name}</span>
                  </div>
                </td>
                <td>{student.rollNo}</td>
                <td><span className="class-badge">{student.class}</span></td>
                <td>
                  <button className="icon-btn">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Students;
