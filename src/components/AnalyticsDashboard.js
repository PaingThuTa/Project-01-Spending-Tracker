import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
<<<<<<< HEAD
<<<<<<< HEAD
import { filterExpensesByPeriod, TIME_PERIODS } from '../utils/dateUtils';
=======
import { filterExpensesByPeriod, TIME_PERIODS, getPeriodLabel } from '../utils/dateUtils';
>>>>>>> cb52527 (- added : function to add custom category)
=======
import { filterExpensesByPeriod, TIME_PERIODS, getPeriodLabel } from '../utils/dateUtils';
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
import TimeSelector from './TimeSelector';
import SpendingSummary from './SpendingSummary';
import CategoryBreakdown from './CategoryBreakdown';
import SpendingChart from './SpendingChart';
import CategoryChart from './CategoryChart';

<<<<<<< HEAD
<<<<<<< HEAD
const AnalyticsDashboard = () => {
  const { expenses } = useExpenses();
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS.ALL_TIME);

  const filteredExpenses = filterExpensesByPeriod(expenses, selectedPeriod);
=======
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
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
<<<<<<< HEAD
>>>>>>> cb52527 (- added : function to add custom category)
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>

      <TimeSelector
        selectedPeriod={selectedPeriod}
<<<<<<< HEAD
<<<<<<< HEAD
        onPeriodChange={setSelectedPeriod}
=======
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
        selectedMonth={selectedMonth}
        onPeriodChange={setSelectedPeriod}
        onMonthChange={setSelectedMonth}
        expenses={expenses}
<<<<<<< HEAD
>>>>>>> cb52527 (- added : function to add custom category)
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
      />

      <SpendingSummary
        allExpenses={expenses}
        filteredExpenses={filteredExpenses}
        selectedPeriod={selectedPeriod}
<<<<<<< HEAD
<<<<<<< HEAD
=======
        selectedMonth={selectedMonth}
>>>>>>> cb52527 (- added : function to add custom category)
=======
        selectedMonth={selectedMonth}
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
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