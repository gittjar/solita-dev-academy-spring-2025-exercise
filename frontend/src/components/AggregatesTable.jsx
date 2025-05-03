import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

function AggregatesTable({ aggregates = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [filterText, setFilterText] = useState('');
  const [selectedYears, setSelectedYears] = useState([]); // Allow multiple years
  const itemsPerPage = 10;

  // Extract unique years from the data
  const years = useMemo(() => {
    const uniqueYears = new Set(aggregates.map((item) => new Date(item.date).getFullYear()));
    return Array.from(uniqueYears).sort((a, b) => b - a);
  }, [aggregates]);

  // Handle year selection (toggle year in the selectedYears array)
  const handleYearToggle = (year) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
    setCurrentPage(1);
  };

  // Filter logic
  const filteredAggregates = aggregates.filter((item) => {
    const matchesFilter =
      item.date.includes(filterText) || item.totalConsumption.toString().includes(filterText);
    const itemYear = new Date(item.date).getFullYear();
    const matchesYear =
      selectedYears.length === 0 || selectedYears.includes(itemYear); // Match if no year is selected or matches selected years
    return matchesFilter && matchesYear;
  });

  // Sort logic
  const sortedAggregates = [...filteredAggregates].sort((a, b) => {
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

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">📊 Daily Aggregates</h2>

      {/* Filter Input */}
      <div className="mb-3 text-center w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by date or consumption..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {/* Year Selection Buttons */}
      <div className="mb-3 text-center">
        {years.map((year) => (
          <button
            key={year}
            className={`btn btn-outline-primary mx-1 ${
              selectedYears.includes(year) ? 'active' : ''
            }`}
            onClick={() => handleYearToggle(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Summary Card */}
      <div className="card mb-4 w-50 mx-auto shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">Summary</h5>
          <p className="card-text">
            <strong>Total Records:</strong> {filteredAggregates.length}
          </p>
          <p className="card-text">
            <strong>Page:</strong> {currentPage} of {totalPages}
          </p>
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
                Total Consumption{' '}
                {sortConfig.key === 'totalConsumption' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('totalProduction')} style={{ cursor: 'pointer' }}>
                Total Production{' '}
                {sortConfig.key === 'totalProduction' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('averagePrice')} style={{ cursor: 'pointer' }}>
                Avg Price{' '}
                {sortConfig.key === 'averagePrice' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('longestNegativePriceStreak')} style={{ cursor: 'pointer' }}>
                Longest Negative Price Streak (h){' '}
                {sortConfig.key === 'longestNegativePriceStreak'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
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