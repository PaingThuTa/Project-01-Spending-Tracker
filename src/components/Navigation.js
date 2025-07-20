import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <h1>Spending Tracker</h1>
      <div className="nav-links">
        <Link 
          to="/analytics" 
          className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}
        >
          Analytics Dashboard
        </Link>
        <Link 
          to="/journal" 
          className={`nav-link ${location.pathname === '/journal' ? 'active' : ''}`}
        >
          Expense Journal
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;