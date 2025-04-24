import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Pagination from './components/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(400);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:3000/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Electricity Data</h1>
        <Table data={currentData} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;