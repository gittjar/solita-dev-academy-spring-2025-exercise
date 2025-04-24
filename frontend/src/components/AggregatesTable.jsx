import React from 'react';

function AggregatesTable({ aggregates = [] }) {
  return (
<section style={{ padding: '20px' }}>
        <h2>Daily Aggregates</h2>

    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Total Consumption</th>
          <th>Total Production</th>
          <th>Average Price</th>
          <th>Longest Negative Price Streak (hours)</th>
        </tr>
      </thead>
      <tbody>
        {aggregates.map((item) => (
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
    </section>
  );
}

export default AggregatesTable;