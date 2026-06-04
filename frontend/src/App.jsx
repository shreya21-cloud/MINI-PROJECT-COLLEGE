import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setAuthView('login');
  };

  if (!isAuthenticated) {
    if (authView === 'signup') {
      return <Signup onNavigateToLogin={() => setAuthView('login')} />;
    }
    return <Login onLogin={handleLogin} onNavigateToSignup={() => setAuthView('signup')} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


