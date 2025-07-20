import React from 'react';
import { Pie } from 'react-chartjs-2';
import { generatePieChartData, pieChartOptions } from '../utils/chartUtils';

<<<<<<< HEAD
<<<<<<< HEAD
=======
// pie charts
>>>>>>> cb52527 (- added : function to add custom category)
=======
// pie charts
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
const CategoryChart = ({ expenses }) => {
  const chartData = generatePieChartData(expenses);
  
  if (!expenses.length) {
    return (
      <div className="category-chart">
        <div className="chart-container">
          <div className="chart-empty-state">
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="chart-empty-icon">🥧</div>
=======
>>>>>>> cb52527 (- added : function to add custom category)
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
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