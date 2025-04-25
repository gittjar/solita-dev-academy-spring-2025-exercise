import React, { useState } from 'react';
import Pagination from './Pagination';

function AggregatesTable({ aggregates = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const itemsPerPage = 10;

  // Sorting logic
  const sortedAggregates = [...aggregates].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedAggregates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAggregates = sortedAggregates.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1); // Reset to the first page after sorting
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Daily Aggregates</h2>

      {/* Summary Card */}
      <div className="card mb-4 w-25 mx-auto shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">Summary</h5>
          <p className="card-text">
            <strong>Total Records:</strong> {aggregates.length}
          </p>
          <p className="card-text">
            <strong>Current Page:</strong> {currentPage} of {totalPages}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('totalConsumption')} style={{ cursor: 'pointer' }}>
                Total Consumption {sortConfig.key === 'totalConsumption' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('totalProduction')} style={{ cursor: 'pointer' }}>
                Total Production {sortConfig.key === 'totalProduction' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('averagePrice')} style={{ cursor: 'pointer' }}>
                Average Price {sortConfig.key === 'averagePrice' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('longestNegativePriceStreak')} style={{ cursor: 'pointer' }}>
                Longest Negative Price Streak (hours) {sortConfig.key === 'longestNegativePriceStreak' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAggregates.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{Number(item.totalConsumption || 0).toFixed(2)}</td>
                <td>{Number(item.totalProduction || 0).toFixed(2)}</td>
                <td>{Number(item.averagePrice || 0).toFixed(2)}</td>
                <td>{item.longestNegativePriceStreak || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
}

export default AggregatesTable;