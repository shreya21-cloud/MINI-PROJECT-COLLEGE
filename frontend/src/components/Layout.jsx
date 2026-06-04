import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, Settings, LogOut, Search } from 'lucide-react';

const Layout = ({ children, onLogout }) => {
  return (
    <div className="layout-container animate-fade-in">
      <aside className="sidebar glass-card">
        <div className="logo-container">
          <div className="logo-icon">A</div>
          <h1>Attendly</h1>
        </div>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={20} />
            <span>Students</span>
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <CalendarCheck size={20} />
            <span>Attendance</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div className="nav-item logout" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="search-bar">
            {/* Keeping it simple but styled for future implementation */}
            <input type="text" placeholder="Search anything..." />
          </div>
          <div className="user-profile">
            <div className="user-avatar">AD</div>
            <span style={{ fontWeight: 500 }}>Admin</span>
          </div>
        </header>

        <section className="content-area">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
