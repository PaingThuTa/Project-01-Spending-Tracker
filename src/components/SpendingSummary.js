import React from 'react';
import { 
  calculateTotalSpending, 
  formatCurrency, 
  getPeriodLabel,
  TIME_PERIODS 
} from '../utils/dateUtils';

<<<<<<< HEAD
const SpendingSummary = ({ allExpenses, filteredExpenses, selectedPeriod }) => {
  const totalAllTime = calculateTotalSpending(allExpenses);
  const totalPeriod = calculateTotalSpending(filteredExpenses);
  
=======
// Function to show spending summary
const SpendingSummary = ({ allExpenses, filteredExpenses, selectedPeriod, selectedMonth }) => {
  const totalAllTime = calculateTotalSpending(allExpenses);
  const totalPeriod = calculateTotalSpending(filteredExpenses);
  
  const getPeriodTitle = () => {
    if (selectedPeriod === TIME_PERIODS.SPECIFIC_MONTH && selectedMonth) {
      return getPeriodLabel(selectedPeriod, selectedMonth);
    }
    return getPeriodLabel(selectedPeriod);
  };
  
>>>>>>> cb52527 (- added : function to add custom category)
  return (
    <div className="spending-summary">
      <h3>Spending Summary</h3>
      <div className="summary-cards">
        <div className="summary-card all-time">
          <h4>All Time Total</h4>
          <p className="amount">
            {formatCurrency(totalAllTime)}
          </p>
        </div>
        
        {selectedPeriod !== TIME_PERIODS.ALL_TIME && (
          <div className="summary-card period">
            <h4>
<<<<<<< HEAD
              {getPeriodLabel(selectedPeriod)} Total
=======
              {getPeriodTitle()} Total
>>>>>>> cb52527 (- added : function to add custom category)
            </h4>
            <p className="amount">
              {formatCurrency(totalPeriod)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingSummary;