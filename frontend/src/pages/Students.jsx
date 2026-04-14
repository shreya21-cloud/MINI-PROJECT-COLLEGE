import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, MoreVertical, Search, FileDown, Edit2, Trash2, X } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', rollNo: '', class: '' });
  
  // Dropdown state
  const [openDropdownId, setOpenDropdownId] = useState(null);

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

  const handleOpenModal = (student = null) => {
      setEditingStudent(student);
      if(student) {
          setFormData({ name: student.name, rollNo: student.rollNo, class: student.class });
      } else {
          setFormData({ name: '', rollNo: '', class: '' });
      }
      setIsModalOpen(true);
      setOpenDropdownId(null);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingStudent(null);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if(editingStudent) {
              await axios.put(`/api/students/${editingStudent.id}`, formData);
          } else {
              await axios.post('/api/students', formData);
          }
          fetchStudents();
          handleCloseModal();
      } catch (error) {
          console.error('Error saving student:', error);
          alert('Failed to save student.');
      }
  };

  const handleDelete = async (id) => {
      if(window.confirm('Are you sure you want to delete this student?')) {
          try {
              await axios.delete(`/api/students/${id}`);
              fetchStudents();
          } catch(error) {
              console.error('Error deleting student', error);
          }
      }
      setOpenDropdownId(null);
  };

  const handleExport = () => {
      window.open('/api/export/students', '_blank');
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.includes(searchTerm)
  );

  return (
    <div className="students-container animate-fade-in" style={{ position: 'relative' }}>
      <div className="page-header header-with-actions">
        <div>
            <h2 className="page-title">Students Registry</h2>
            <p className="page-subtitle">Manage all your enrolled students.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }} onClick={handleExport}>
                <FileDown size={20} />
                <span>Export</span>
            </button>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                <Plus size={20} />
                <span>Add Student</span>
            </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'visible' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>All Students</h3>
            <div className="search-box">
                <Search size={20} color="#a1a1aa" />
                <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="table-container" style={{ overflow: 'visible' }}>
            <table className="students-table">
            <thead>
                <tr>
                <th>Student Information</th>
                <th>Roll Number</th>
                <th>Class/Grade</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredStudents.map(student => (
                <tr key={student.id}>
                    <td>
                    <div className="student-name-cell">
                        <div className="avatar">{student.name.charAt(0)}</div>
                        <span style={{ fontWeight: 500, fontSize: '1.05rem' }}>{student.name}</span>
                    </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{student.rollNo}</td>
                    <td><span className="class-badge">{student.class}</span></td>
                    <td style={{ textAlign: 'center', position: 'relative' }}>
                        <button 
                            className="btn" 
                            style={{ padding: '8px', background: 'transparent', color: 'var(--text-muted)' }}
                            onClick={() => setOpenDropdownId(openDropdownId === student.id ? null : student.id)}
                        >
                            <MoreVertical size={20} />
                        </button>
                        
                        {openDropdownId === student.id && (
                            <div className="glass-card" style={{
                                position: 'absolute', right: '50px', top: '10px', width: '150px', padding: '8px', zIndex: 10,
                                display: 'flex', flexDirection: 'column', gap: '4px'
                            }}>
                                <button className="quick-action-btn" style={{ padding: '8px', margin: 0 }} onClick={() => handleOpenModal(student)}>
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button className="quick-action-btn" style={{ padding: '8px', margin: 0, color: '#f43f5e' }} onClick={() => handleDelete(student.id)}>
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            
            {filteredStudents.length === 0 && (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No students found matching your search.</p>
                </div>
            )}
        </div>
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
          <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
              paddingBottom: '10vh'
          }}>
              <div className="glass-card animate-fade-in" style={{ width: '400px', padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
                      <button onClick={handleCloseModal} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                          <X size={24} />
                      </button>
                  </div>
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full Name</label>
                          <input 
                              required type="text" placeholder="e.g. John Doe" 
                              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Roll Number</label>
                          <input 
                              required type="text" placeholder="e.g. 101" 
                              value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})}
                          />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Class / Grade</label>
                          <input 
                              required type="text" placeholder="e.g. X-A" 
                              value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}
                          />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                          {editingStudent ? 'Save Changes' : 'Create Student'}
                      </button>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
};

export default Students;
