import React from 'react';
import '../assets/styles.css'; // Import the CSS file for styling

const MainPage = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Welcome to the Solita Dev Academy Spring 2025 Exercise</h1>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner rounded-3 shadow-sm">
          <div className="carousel-item active">
            <img
              src="../src/assets/image1.jpg"
              className="d-block w-100 carousel-image"
              alt="Image 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Electricity Viewer</h5>
              <p>Explore electricity consumption and production data.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="../src/assets/image2.jpg"
              className="d-block w-100 carousel-image"
              alt="Image 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Data Insights</h5>
              <p>Gain insights into daily electricity trends.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="../src/assets/image3.jpg"
              className="d-block w-100 carousel-image"
              alt="Image 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Energy Analytics</h5>
              <p>Analyze energy data for better decision-making.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default MainPage;