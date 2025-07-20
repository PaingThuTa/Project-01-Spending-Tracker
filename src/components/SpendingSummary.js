import React from 'react';
import { 
  calculateTotalSpending, 
  formatCurrency, 
  getPeriodLabel,
  TIME_PERIODS 
} from '../utils/dateUtils';

const SpendingSummary = ({ allExpenses, filteredExpenses, selectedPeriod }) => {
  const totalAllTime = calculateTotalSpending(allExpenses);
  const totalPeriod = calculateTotalSpending(filteredExpenses);
  
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
              {getPeriodLabel(selectedPeriod)} Total
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