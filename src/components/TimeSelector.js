import React from 'react';
import { TIME_PERIODS, getPeriodLabel } from '../utils/dateUtils';

const TimeSelector = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    TIME_PERIODS.DAILY,
    TIME_PERIODS.WEEKLY,
    TIME_PERIODS.MONTHLY,
    TIME_PERIODS.ALL_TIME
  ];

  return (
    <div className="time-selector">
      <h3>Time Period</h3>
      <div className="time-selector-buttons">
        {periods.map(period => (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className={`time-selector-button ${selectedPeriod === period ? 'active' : ''}`}
          >
            {getPeriodLabel(period)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;