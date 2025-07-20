import React from 'react';
import { Pie } from 'react-chartjs-2';
import { generatePieChartData, pieChartOptions } from '../utils/chartUtils';

const CategoryChart = ({ expenses }) => {
  const chartData = generatePieChartData(expenses);
  
  if (!expenses.length) {
    return (
      <div className="category-chart">
        <div className="chart-container">
          <div className="chart-empty-state">
            <div className="chart-empty-icon">🥧</div>
            <h4>No Category Data</h4>
            <p>Add some expenses to see your spending distribution by category.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-chart">
      <div className="chart-container">
        <Pie data={chartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default CategoryChart;