import React from 'react';

function Table({ data }) {
  return (
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
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.hourlyprice}</td>
            {/* Assuming productionamount is a field in your data */}
            <td>{item.productionamount}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;