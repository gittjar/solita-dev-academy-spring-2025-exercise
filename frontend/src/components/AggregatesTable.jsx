import React, { useState } from 'react';
import Pagination from './Pagination';

function AggregatesTable({ aggregates = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(aggregates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAggregates = aggregates.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Daily Aggregates</h2>

      {/* Summary Card */}
      <div className="card mb-4 w-25 mx-auto">
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
              <th>Date</th>
              <th>Total Consumption</th>
              <th>Total Production</th>
              <th>Average Price</th>
              <th>Longest Negative Price Streak (hours)</th>
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