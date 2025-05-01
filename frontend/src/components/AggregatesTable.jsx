import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

function AggregatesTable({ aggregates = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const itemsPerPage = 10;

  // Sort logic
  const sortedAggregates = [...aggregates].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
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
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  const handlePrevDay = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextDay = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">📊 Daily Aggregates</h2>

      {/* Summary Card */}
      <div className="card mb-4 w-50 mx-auto shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">Summary</h5>
          <p className="card-text">
            <strong>Total Records:</strong> {aggregates.length}
          </p>
          <p className="card-text">
            <strong>Page:</strong> {currentPage} of {totalPages}
          </p>

          <div className="btn-group mt-2">
            <button className="btn btn-outline-primary" onClick={handlePrevDay} disabled={currentPage === 1}>
              ⬅️ Previous
            </button>
            <button className="btn btn-outline-primary" onClick={handleNextDay} disabled={currentPage === totalPages}>
              Next ➡️
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
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
                Avg Price {sortConfig.key === 'averagePrice' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('longestNegativePriceStreak')} style={{ cursor: 'pointer' }}>
                Longest Negative Price Streak (h) {sortConfig.key === 'longestNegativePriceStreak' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAggregates.map((item) => (
              <tr key={item.date}>
                <td>
                  <Link to={`/date-hourly/${item.date}`} className="text-decoration-none">
                    {formatDate(item.date)}
                  </Link>
                </td>
                <td>{Number(item.totalConsumption || 0).toFixed(2)}</td>
                <td>{Number(item.totalProduction || 0).toFixed(2)}</td>
                <td>
                  {Number(item.averagePrice || 0) < 0 ? (
                    <span className="badge bg-success">{Number(item.averagePrice).toFixed(2)}</span>
                  ) : (
                    Number(item.averagePrice).toFixed(2)
                  )}
                </td>
                <td>{item.longestNegativePriceStreak || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (hidden if only 1 page) */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </section>
  );
}

export default AggregatesTable;
