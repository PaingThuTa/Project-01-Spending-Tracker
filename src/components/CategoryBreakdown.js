import React from 'react';
import { groupExpensesByCategory, formatCurrency, calculateTotalSpending } from '../utils/dateUtils';

// category breakdown
const CategoryBreakdown = ({ expenses, selectedPeriod }) => {
  const categoryTotals = groupExpensesByCategory(expenses);
  const totalSpending = calculateTotalSpending(expenses);
  
  if (expenses.length === 0) {
    return (
      <div className="category-breakdown">
        <h3>Category Breakdown</h3>
        <div className="empty-state">
          <p>No spending data available for the selected period.</p>
          <p>Add some expenses to see your category breakdown!</p>
        </div>
      </div>
    );
  }

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a);

  return (
    <div className="category-breakdown">
      <h3>Category Breakdown</h3>
      <div className="category-table">
        <div className="category-table-header">
          <span>Category</span>
          <span>Amount</span>
          <span className="category-percentage">Percentage</span>
        </div>
        
        {sortedCategories.map(([category, amount]) => {
          const percentage = totalSpending > 0 ? (amount / totalSpending * 100).toFixed(1) : 0;
          
          return (
            <div key={category} className="category-table-row">
              <span className="category-name">{category}</span>
              <span className="category-amount">{formatCurrency(amount)}</span>
              <span className="category-percentage">{percentage}%</span>
            </div>
          );
        })}
        
        <div className="category-table-total">
          <span>Total</span>
          <span>{formatCurrency(totalSpending)}</span>
          <span className="category-percentage">100%</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;