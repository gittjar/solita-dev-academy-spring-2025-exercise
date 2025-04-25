import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AggregatesTable from './components/AggregatesTable';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);
  const [aggregates, setAggregates] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:3000/data')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setAggregates(calculateAggregates(data));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const calculateAggregates = (data) => {
    const dailyData = {};

    data.forEach((item) => {
      const date = item.date.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          totalConsumption: 0,
          totalProduction: 0,
          totalPrice: 0,
          priceCount: 0,
          longestNegativePriceStreak: 0,
          currentNegativeStreak: 0,
        };
      }

      dailyData[date].totalConsumption += Number(item.consumptionamount || 0);
      dailyData[date].totalProduction += Number(item.productionamount || 0);
      dailyData[date].totalPrice += Number(item.hourlyprice || 0);
      dailyData[date].priceCount += 1;

      if (item.hourlyprice < 0) {
        dailyData[date].currentNegativeStreak += 1;
        dailyData[date].longestNegativePriceStreak = Math.max(
          dailyData[date].longestNegativePriceStreak,
          dailyData[date].currentNegativeStreak
        );
      } else {
        dailyData[date].currentNegativeStreak = 0;
      }
    });

    return Object.entries(dailyData).map(([date, values]) => ({
      date,
      totalConsumption: values.totalConsumption,
      totalProduction: values.totalProduction,
      averagePrice: values.priceCount > 0 ? values.totalPrice / values.priceCount : 0,
      longestNegativePriceStreak: values.longestNegativePriceStreak,
    }));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/hourly" element={<Table data={data} />} />
  <Route
    path="/aggregates"
    element={
      aggregates && aggregates.length > 0 ? (
        <AggregatesTable aggregates={aggregates} />
      ) : (
        <p>Loading aggregates...</p>
      )
    }
  />
</Routes>
    </Router>
  );
}

export default App;