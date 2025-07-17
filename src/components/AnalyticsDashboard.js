import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { filterExpensesByPeriod, TIME_PERIODS } from '../utils/dateUtils';
import TimeSelector from './TimeSelector';
import SpendingSummary from './SpendingSummary';
import CategoryBreakdown from './CategoryBreakdown';

const AnalyticsDashboard = () => {
  const { expenses } = useExpenses();
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS.ALL_TIME);

  const filteredExpenses = filterExpensesByPeriod(expenses, selectedPeriod);

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>

      <TimeSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <SpendingSummary
        allExpenses={expenses}
        filteredExpenses={filteredExpenses}
        selectedPeriod={selectedPeriod}
      />

      <CategoryBreakdown
        expenses={filteredExpenses}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

export default AnalyticsDashboard;