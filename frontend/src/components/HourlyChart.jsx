import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

const HourlyChart = ({ data }) => {
  const chartData = data
    .filter(item => item.hourlyprice != null && !isNaN(Number(item.hourlyprice)))
    .map((item) => ({
      x: new Date(item.starttime).getHours(),
      y: Number(item.hourlyprice),
      label: `${new Date(item.starttime).getHours()}:00\n${Number(item.hourlyprice).toFixed(2)} €`,
    }))
    .sort((a, b) => a.x - b.x); // Sort by hour ascending

  return (
    <div className="mt-4 mb-4 w-100" style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
      <VictoryChart
        domainPadding={20} // Add more padding around the chart
        containerComponent={<VictoryVoronoiContainer />}
      >
        {/* X-Axis (Hour) */}
        <VictoryAxis
          label="Hour"
          tickFormat={(x) => `${x}:00`}
          style={{
            axisLabel: { padding: 30 }, // Add padding for the axis label
            grid: { stroke: '#e0e0e0' }, // Light gray grid lines
            ticks: { size: 5 },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        {/* Y-Axis (Price) */}
        <VictoryAxis
          dependentAxis
          label="Price (€)"
          style={{
            axisLabel: { padding: 30 }, // Add padding for the axis label
            grid: { stroke: '#e0e0e0' }, // Light gray grid lines
            ticks: { size: 5 },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        {/* Line Chart */}
        <VictoryLine
          data={chartData}
          style={{
            data: { stroke: '#007bff', strokeWidth: 2 }, // Blue line with increased width
          }}
          labels={({ datum }) => datum.label}
          labelComponent={<VictoryTooltip constrainToVisibleArea />}
        />
      </VictoryChart>

    </div>
  );
};

export default HourlyChart;