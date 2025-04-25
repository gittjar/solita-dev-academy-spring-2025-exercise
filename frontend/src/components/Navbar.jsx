import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f4f4f4', marginBottom: '20px' }}>
      <h2>Electricity Data Viewer</h2>
      <div>
        <Link to="/hourly" style={{ marginRight: '10px' }}>Hourly Data</Link>
        <Link to="/aggregates">Aggregates</Link>
      </div>
    </nav>
  );
}

export default Navbar;