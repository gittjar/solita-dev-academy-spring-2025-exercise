import React, { useState } from 'react';
import Pagination from './Pagination';

function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 500;

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Hourly Data</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hourly price</th>
            <th>Production Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.hourlyprice}</td>
              <td>{item.productionamount}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default Table;