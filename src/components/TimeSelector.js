import React from 'react';
import { TIME_PERIODS, getPeriodLabel, getAvailableMonths } from '../utils/dateUtils';

const TimeSelector = ({ 
  selectedPeriod, 
  selectedMonth, 
  onPeriodChange, 
  onMonthChange, 
  expenses = [] 
}) => {
  const periods = [
    TIME_PERIODS.DAILY,
    TIME_PERIODS.WEEKLY,
    TIME_PERIODS.MONTHLY,
    TIME_PERIODS.SPECIFIC_MONTH,
    TIME_PERIODS.ALL_TIME
  ];

  const availableMonths = getAvailableMonths(expenses);

  // Function to handle time period change
  const handlePeriodChange = (period) => {
    onPeriodChange(period);
    if (period === TIME_PERIODS.SPECIFIC_MONTH && !selectedMonth && availableMonths.length > 0) {
      onMonthChange(availableMonths[0].value);
    }
  };

  return (
    <div className="time-selector">
      <h3>Time Period</h3>
      <div className="time-selector-buttons">
        {periods.map(period => (
          <button
            key={period}
            onClick={() => handlePeriodChange(period)}
            className={`time-selector-button ${selectedPeriod === period ? 'active' : ''}`}
          >
            {period === TIME_PERIODS.SPECIFIC_MONTH ? 'Select Month' : getPeriodLabel(period)}
          </button>
        ))}
      </div>
      
      {selectedPeriod === TIME_PERIODS.SPECIFIC_MONTH && (
        <div className="month-selector">
          <h4>Select Month</h4>
          {availableMonths.length === 0 ? (
            <p className="no-months">No expense data available for month selection</p>
          ) : (
            <select
              value={selectedMonth || ''}
              onChange={(e) => onMonthChange(e.target.value)}
              className="month-select"
            >
              <option value="">Choose a month...</option>
              {availableMonths.map(month => (
                <option key={month.key} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSelector;