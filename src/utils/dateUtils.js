import { 
  startOfDay, 
  startOfWeek, 
  startOfMonth, 
  endOfDay, 
  endOfWeek, 
  endOfMonth,
  isWithinInterval,
  format,
  subDays,
  subWeeks,
  subMonths
} from 'date-fns';

export const TIME_PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  ALL_TIME: 'all_time'
};

export const getDateRange = (period) => {
  const now = new Date();
  
  switch (period) {
    case TIME_PERIODS.DAILY:
      return {
        start: startOfDay(now),
        end: endOfDay(now)
      };
    case TIME_PERIODS.WEEKLY:
      return {
        start: startOfWeek(now),
        end: endOfWeek(now)
      };
    case TIME_PERIODS.MONTHLY:
      return {
        start: startOfMonth(now),
        end: endOfMonth(now)
      };
    case TIME_PERIODS.ALL_TIME:
    default:
      return null; 
  }
};

export const filterExpensesByPeriod = (expenses, period) => {
  if (period === TIME_PERIODS.ALL_TIME) {
    return expenses;
  }
  
  const dateRange = getDateRange(period);
  if (!dateRange) return expenses;
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, dateRange);
  });
};

export const groupExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});
};

export const calculateTotalSpending = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const getPeriodLabel = (period) => {
  switch (period) {
    case TIME_PERIODS.DAILY:
      return 'Today';
    case TIME_PERIODS.WEEKLY:
      return 'This Week';
    case TIME_PERIODS.MONTHLY:
      return 'This Month';
    case TIME_PERIODS.ALL_TIME:
    default:
      return 'All Time';
  }
};