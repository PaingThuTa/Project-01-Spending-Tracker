import React from 'react';
import { Line } from 'react-chartjs-2';
import { generateLineChartData, lineChartOptions } from '../utils/chartUtils';

const SpendingChart = ({ expenses, selectedPeriod }) => {
  const chartData = generateLineChartData(expenses, selectedPeriod);
  
  if (!expenses.length) {
    return (
      <div className="spending-chart">
        <div className="chart-container">
          <div className="chart-empty-state">
            <div className="chart-empty-icon">📈</div>
            <h4>No Spending Data</h4>
            <p>Add some expenses to see your spending trends over time.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <div className="chart-container">
        <Line data={chartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default SpendingChart;