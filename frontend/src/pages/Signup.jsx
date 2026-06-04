import React, { useState } from 'react';
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

const Signup = ({ onNavigateToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (username.trim().toLowerCase() === 'admin') {
      setError('Username "admin" is reserved');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);

    // Simulate database lookup/registration delay
    setTimeout(() => {
      // Get existing users from localStorage
      const existingUsersStr = localStorage.getItem('registeredUsers');
      let registeredUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

      // Check if user already exists
      const userExists = registeredUsers.some(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase()
      );

      if (userExists) {
        setError('Username already taken');
        setIsLoading(false);
        return;
      }

      // Save new user
      const newUser = {
        username: username.trim(),
        password: password
      };

      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      setSuccess('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        onNavigateToLogin();
      }, 1500);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>A</div>
          </div>
          <h2>Create Account</h2>
          <p>Sign up to join the Attendly Portal</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="error-message" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Create a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading || success}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || success}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading || success}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
            disabled={isLoading || success}
          >
            {isLoading ? (
              <span>Registering...</span>
            ) : (
              <>
                <UserPlus size={20} />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer-note">
          <p>
            Already have an account?{' '}
            <span
              onClick={onNavigateToLogin}
              style={{ color: '#c4b5fd', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
