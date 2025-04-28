import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';

function AllHoursDataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedYears, setSelectedYears] = useState([]);
  const itemsPerPage = 10;

  // Helper to format date to DD.MM.YYYY
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Helper to format time to HH:MM
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
  };

  // Extract available years dynamically
  const availableYears = useMemo(() => {
    const yearsSet = new Set();
    data.forEach((item) => {
      const year = new Date(item.date).getFullYear();
      yearsSet.add(year);
    });
    return Array.from(yearsSet).sort((a, b) => b - a); // Descending
  }, [data]);

  // Filtering logic
  const filteredData = data.filter((item) => {
    const year = new Date(item.date).getFullYear();
    const matchesYear = selectedYears.length === 0 || selectedYears.includes(year);
    const matchesSearch = Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    ) || formatDate(item.date).includes(searchQuery); // Include date format
    return matchesYear && matchesSearch;
  });

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const toggleYear = (year) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
    setCurrentPage(1);
  };

  const clearYears = () => {
    setSelectedYears([]);
    setCurrentPage(1);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Hourly Data</h2>

      {/* Search */}
      <div className="mb-3 text-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="form-control w-50 mx-auto"
        />
      </div>

      {/* Year Filter Buttons */}
      <div className="mb-4 text-center">
        <button
          className={`btn btn-sm me-2 mb-2 ${selectedYears.length === 0 ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={clearYears}
        >
          All Years
        </button>
        {availableYears.map((year) => (
          <button
            key={year}
            className={`btn btn-sm me-2 mb-2 ${selectedYears.includes(year) ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => toggleYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('hourlyprice')} style={{ cursor: 'pointer' }}>
                Hourly Price (€) {sortConfig.key === 'hourlyprice' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('productionamount')} style={{ cursor: 'pointer' }}>
                Production Amount {sortConfig.key === 'productionamount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{Number(item.hourlyprice || 0).toFixed(2)}</td>
                <td>{Number(item.productionamount || 0).toFixed(2)}</td>
                <td>{formatDate(item.date)}</td>
                <td>{formatTime(item.starttime || item.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default AllHoursDataTable;
