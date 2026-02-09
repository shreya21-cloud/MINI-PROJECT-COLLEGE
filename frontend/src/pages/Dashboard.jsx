import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, UserCheck, Percent, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        presentToday: 0,
        attendancePercentage: 0
    });

    const chartData = [
        { name: 'Mon', attendance: 85 },
        { name: 'Tue', attendance: 92 },
        { name: 'Wed', attendance: 78 },
        { name: 'Thu', attendance: 95 },
        { name: 'Fri', attendance: 88 },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="page-title">Dashboard Overview</h2>

            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#6366f1' }}>
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Total Students</p>
                        <h3>{stats.totalStudents}</h3>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                        <UserCheck size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Present Today</p>
                        <h3>{stats.presentToday}</h3>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                        <Percent size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Attendance Rate</p>
                        <h3>{stats.attendancePercentage}%</h3>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Avg Performance</p>
                        <h3>A+</h3>
                    </div>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-card glass-card">
                    <h3>Weekly Attendance Trend</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="attendance" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card glass-card">
                    <h3>Academic Progress</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="attendance" stroke="#a855f7" strokeWidth={3} dot={{ r: 6, fill: '#a855f7' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
