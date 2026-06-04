import React, { useState } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';

const Login = ({ onLogin, onNavigateToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      const isDefaultAdmin = username.toLowerCase() === 'admin' && password === 'admin';

      // Check against registered users in localStorage
      const existingUsersStr = localStorage.getItem('registeredUsers');
      const registeredUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      const isValidCustomUser = registeredUsers.some(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
      );

      if (isDefaultAdmin || isValidCustomUser) {
        onLogin();
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">A</div>
          </div>
          <h2>Attendly Portal</h2>
          <p>Sign in to manage student attendance</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer-note">
          <p style={{ marginBottom: '12px' }}>Use credentials <strong>admin / admin</strong> or register a new account.</p>
          <p>
            Don't have an account?{' '}
            <span
              onClick={onNavigateToSignup}
              style={{ color: '#c4b5fd', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

