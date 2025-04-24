import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ marginTop: '20px' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: page === currentPage ? '#007bff' : '#f4f4f4',
            color: page === currentPage ? '#fff' : '#000',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;