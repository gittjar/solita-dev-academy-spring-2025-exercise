import React from 'react';
import Table from './Table';
import Pagination from './Pagination';
import AggregatesTable from './AggregatesTable';

function MainView({ data, currentPage, totalPages, onPageChange, aggregates }) {
  return (
    <div style={{ padding: '20px' }}>
      <Table data={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      <h2>Daily Aggregates</h2>
      <AggregatesTable aggregates={aggregates} />
    </div>
  );
}

export default MainView;