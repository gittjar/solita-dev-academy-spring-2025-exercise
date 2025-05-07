import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa'; // <-- Import GitHub Icon

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          <h2 className="mb-0">Electricity Data Viewer</h2>
          
        </Link>

        <div className="d-flex align-items-center">
          <ul className="navbar-nav me-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/hourly' ? 'active' : ''}`}
                to="/hourly"
              >
                Hourly Data
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/aggregates' ? 'active' : ''}`}
                to="/aggregates"
              >
                Aggregates Data
              </Link>
            </li>
          </ul>

          {/* GitHub Link */}
          <a
            href="https://github.com/gittjar/solita-dev-academy-spring-2025-exercise"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark d-flex align-items-center"
          >
            <FaGithub className="me-2" size={20} />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
