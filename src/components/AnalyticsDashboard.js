import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { filterExpensesByPeriod, TIME_PERIODS, getPeriodLabel } from '../utils/dateUtils';
import TimeSelector from './TimeSelector';
import SpendingSummary from './SpendingSummary';
import CategoryBreakdown from './CategoryBreakdown';
import SpendingChart from './SpendingChart';
import CategoryChart from './CategoryChart';

// analytics dashboard
const AnalyticsDashboard = () => {
  const { expenses } = useExpenses();
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS.ALL_TIME);
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredExpenses = filterExpensesByPeriod(
    expenses, 
    selectedPeriod, 
    selectedPeriod === TIME_PERIODS.SPECIFIC_MONTH ? selectedMonth : null
  );

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>

      <TimeSelector
        selectedPeriod={selectedPeriod}
        selectedMonth={selectedMonth}
        onPeriodChange={setSelectedPeriod}
        onMonthChange={setSelectedMonth}
        expenses={expenses}
      />

      <SpendingSummary
        allExpenses={expenses}
        filteredExpenses={filteredExpenses}
        selectedPeriod={selectedPeriod}
        selectedMonth={selectedMonth}
      />

      <div className="charts-section">
        <div className="charts-grid">
          <div className="chart-item">
            <SpendingChart 
              expenses={filteredExpenses} 
              selectedPeriod={selectedPeriod}
            />
          </div>
          <div className="chart-item">
            <CategoryChart 
              expenses={filteredExpenses}
            />
          </div>
        </div>
      </div>

      <CategoryBreakdown
        expenses={filteredExpenses}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

export default AnalyticsDashboard;