import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HourlyChart from './HourlyChart';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

function DateHourly({ hourlyData = [] }) {
  const { date } = useParams();
  const [sortConfig, setSortConfig] = useState({ key: 'hour', direction: 'asc' });
  const [showChart, setShowChart] = useState(false);

  const filteredData = hourlyData.filter((item) => item.date.split('T')[0] === date);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date
      .toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })
      .replace(':', '.');
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getMaxMinValue = (key, data) => {
    const values = data.map(item => parseFloat(item[key])).filter(val => !isNaN(val));
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    return { maxValue, minValue };
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'hour') {
      const timeA = new Date(a.starttime).getTime();
      const timeB = new Date(b.starttime).getTime();
      return sortConfig.direction === 'asc' ? timeA - timeB : timeB - timeA;
    } else {
      const aValue = parseFloat(a[sortConfig.key]);
      const bValue = parseFloat(b[sortConfig.key]);

      if (sortConfig.direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Logic for most expensive and cheapest hours
  const { maxValue: maxPrice, minValue: minPrice } = getMaxMinValue('hourlyprice', filteredData);
  const mostExpensive = filteredData.find(item => parseFloat(item.hourlyprice) === maxPrice);
  const cheapest = filteredData.find(item => parseFloat(item.hourlyprice) === minPrice);

  // Total consumption, production and average price logic
  const validConsumptions = filteredData.map(item => Number(item.consumptionamount)).filter(val => !isNaN(val));
  const validProductions = filteredData.map(item => Number(item.productionamount)).filter(val => !isNaN(val));
  const validPrices = filteredData.map(item => Number(item.hourlyprice)).filter(val => !isNaN(val));

  const totalConsumption = validConsumptions.reduce((sum, val) => sum + val, 0);
  const totalProduction = validProductions.reduce((sum, val) => sum + val, 0);
  const averagePrice = validPrices.length > 0
    ? validPrices.reduce((sum, val) => sum + val, 0) / validPrices.length
    : 0;

  const mostExpensiveHour =
    mostExpensive ? `${formatTime(mostExpensive.starttime)} (${Number(mostExpensive.hourlyprice).toFixed(2)} €)` : 'N/A';

  const cheapestHour =
    cheapest ? `${formatTime(cheapest.starttime)} (${Number(cheapest.hourlyprice).toFixed(2)} €)` : 'N/A';

  const handleNavigate = (direction) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    const newDate = currentDate.toISOString().split('T')[0];
    window.location.href = `/date-hourly/${newDate}`;
  };

  const getAdjacentDate = (direction) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    return currentDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handleNavigate('prev');
      if (e.key === 'ArrowRight') handleNavigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [date, hourlyData]);

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Hourly Data for {formatDate(date)}</h2>

      {/* Navigation buttons with icons */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button
          className="btn btn-outline-primary d-flex align-items-center gap-1"
          onClick={() => handleNavigate('prev')}
          disabled={!getAdjacentDate('prev')}
        >
          <BiLeftArrowAlt size={20} /> Previous
        </button>
        <button
          className="btn btn-outline-primary d-flex align-items-center gap-1"
          onClick={() => handleNavigate('next')}
          disabled={!getAdjacentDate('next')}
        >
          Next <BiRightArrowAlt size={20} />
        </button>
      </div>

      {/* Summary Card */}
      <div className="card mb-4 shadow-sm w-50 mx-auto">
        <div className="card-body">
          <h5 className="card-title text-center">Summary</h5>
          <p className="card-text">
            <strong>Total Consumption:</strong> {totalConsumption.toFixed(2) / 1000} Mwh
          </p>
          <p className="card-text">
            <strong>Total Production:</strong> {totalProduction.toFixed(2) / 1000} Mwh
          </p>
          <p className="card-text">
            <strong>Average Price:</strong> {averagePrice.toFixed(2)} €
          </p>
          <p className="card-text">
            <strong>Most Expensive Hour:</strong> {mostExpensiveHour}
          </p>
          <p className="card-text">
            <strong>Cheapest Hour:</strong> {cheapestHour}
          </p>
        </div>
      </div>

      {/* Toggle button */}
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={() => setShowChart(!showChart)}>
          {showChart ? 'Hide Chart View' : 'Open Chart View'}
        </button>
      </div>

      {/* Chart section */}
      {showChart && <HourlyChart data={filteredData} />}

      {sortedData.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                  Date{' '}
                  {sortConfig.key === 'date' && (
                    <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}-fill`}></i>
                  )}
                </th>
                <th onClick={() => handleSort('hour')} style={{ cursor: 'pointer' }}>
                  Hour{' '}
                  {sortConfig.key === 'hour' && (
                    <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}-fill`}></i>
                  )}
                </th>
                <th onClick={() => handleSort('consumptionamount')} style={{ cursor: 'pointer' }}>
                  Consumption{' '}
                  {sortConfig.key === 'consumptionamount' && (
                    <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}-fill`}></i>
                  )}
                </th>
                <th onClick={() => handleSort('productionamount')} style={{ cursor: 'pointer' }}>
                  Production{' '}
                  {sortConfig.key === 'productionamount' && (
                    <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}-fill`}></i>
                  )}
                </th>
                <th onClick={() => handleSort('hourlyprice')} style={{ cursor: 'pointer' }}>
                  Price{' '}
                  {sortConfig.key === 'hourlyprice' && (
                    <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}-fill`}></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatTime(item.starttime)}</td>
                  <td>{Number(item.consumptionamount || 0).toFixed(2)}</td>
                  <td>{Number(item.productionamount || 0).toFixed(2)}</td>
                  <td>
                    {Number(item.hourlyprice || 0).toFixed(2)}{' '}
                    {Number(item.hourlyprice) < 0 && (
                      <span className="badge bg-success">Negative</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No data available for {formatDate(date)}.</p>
      )}
    </section>
  );
}

export default DateHourly;
