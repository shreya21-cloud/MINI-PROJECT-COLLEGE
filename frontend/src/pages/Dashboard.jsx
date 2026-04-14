import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, UserCheck, Percent, TrendingUp, CheckCircle2, XCircle, AlertCircle, Plus, FileText, Download } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalStudents: 0,
        presentToday: 0,
        attendancePercentage: 0
    });
    
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsResponse = await axios.get('/api/stats');
                setStats(statsResponse.data);
                
                const actResponse = await axios.get('/api/activities');
                setActivities(actResponse.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
        // optionally set an interval to refresh activities
        const interval = setInterval(fetchData, 30000); // 30s
        return () => clearInterval(interval);
    }, []);

    const getIconForActivity = (type) => {
        switch(type) {
            case 'present': return <CheckCircle2 size={20} color="#10b981" />;
            case 'absent': return <XCircle size={20} color="#f43f5e" />;
            case 'alert': return <AlertCircle size={20} color="#f59e0b" />;
            default: return <CheckCircle2 size={20} color="#60a5fa" />;
        }
    }

    const handleExportStudents = () => {
        window.open('/api/export/students', '_blank');
    };

    const handleExportAttendance = () => {
        window.open('/api/export/attendance', '_blank');
    };

    return (
        <div className="dashboard-container animate-fade-in">
            <div className="page-header">
                <h2 className="page-title">Welcome back, Admin 👋</h2>
                <p className="page-subtitle">Here is what's happening today in your institution.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), transparent)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#a78bfa' }}>
                        <Users size={28} />
                    </div>
                    <div className="stat-info">
                        <p>Total Students</p>
                        <h3>{stats.totalStudents || 0}</h3>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), transparent)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399' }}>
                        <UserCheck size={28} />
                    </div>
                    <div className="stat-info">
                        <p>Present Today</p>
                        <h3>{stats.presentToday || 0}</h3>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), transparent)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}>
                        <Percent size={28} />
                    </div>
                    <div className="stat-info">
                        <p>Attendance Rate</p>
                        <h3>{stats.attendancePercentage || 0}%</h3>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), transparent)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6' }}>
                        <TrendingUp size={28} />
                    </div>
                    <div className="stat-info">
                        <p>Avg Performance</p>
                        <h3>A+</h3>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-grid">
                <div className="activity-feed-card glass-card">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        {activities.length === 0 ? (
                            <p style={{color: 'var(--text-muted)'}}>No recent activity found.</p>
                        ) : (
                            activities.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-icon">
                                        {getIconForActivity(activity.type)}
                                    </div>
                                    <div className="activity-details">
                                        <p>{activity.text}</p>
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="quick-actions-card glass-card">
                    <h3>Quick Actions</h3>
                    <div className="actions-list">
                        <button className="quick-action-btn" onClick={() => navigate('/students')}>
                            <Plus size={20} color="#a78bfa" />
                            Add New Student
                        </button>
                        <button className="quick-action-btn" onClick={() => navigate('/attendance')}>
                            <CheckCircle2 size={20} color="#34d399" />
                            Mark Quick Attendance
                        </button>
                        <button className="quick-action-btn" onClick={handleExportAttendance}>
                            <FileText size={20} color="#fbbf24" />
                            Generate Weekly Report
                        </button>
                        <button className="quick-action-btn" onClick={handleExportStudents}>
                            <Download size={20} color="#60a5fa" />
                            Export Data to CSV
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
