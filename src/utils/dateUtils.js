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
  SPECIFIC_MONTH: 'specific_month',
  ALL_TIME: 'all_time'
};

// Function to get date range based on time period
export const getDateRange = (period, specificDate = null) => {
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
    case TIME_PERIODS.SPECIFIC_MONTH:
      if (specificDate) {
        return {
          start: startOfMonth(new Date(specificDate)),
          end: endOfMonth(new Date(specificDate))
        };
      }
      return null;
    case TIME_PERIODS.ALL_TIME:
    default:
      return null; 
  }
};

// Function to filter expenses based on time period
export const filterExpensesByPeriod = (expenses, period, specificDate = null) => {
  if (period === TIME_PERIODS.ALL_TIME) {
    return expenses;
  }
  
  const dateRange = getDateRange(period, specificDate);
  if (!dateRange) return expenses;
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, dateRange);
  });
};

// Function to group expenses by category
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

// Function to calculate total spending
export const calculateTotalSpending = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount);
};

// Function to get period label
export const getPeriodLabel = (period, specificDate = null) => {
  switch (period) {
    case TIME_PERIODS.DAILY:
      return 'Today';
    case TIME_PERIODS.WEEKLY:
      return 'This Week';
    case TIME_PERIODS.MONTHLY:
      return 'This Month';
    case TIME_PERIODS.SPECIFIC_MONTH:
      if (specificDate) {
        return format(new Date(specificDate), 'MMMM yyyy');
      }
      return 'Selected Month';
    case TIME_PERIODS.ALL_TIME:
    default:
      return 'All Time';
  }
};

// Function to get available months from expenses data
export const getAvailableMonths = (expenses) => {
  const months = new Set();
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = format(date, 'yyyy-MM');
    months.add(monthKey);
  });
  
  return Array.from(months)
    .sort((a, b) => b.localeCompare(a)) 
    .map(monthKey => ({
      value: monthKey + '-01', 
      label: format(new Date(monthKey + '-01'), 'MMMM yyyy'),
      key: monthKey
    }));
};

// Function to format month 
export const formatMonthYear = (dateString) => {
  return format(new Date(dateString), 'MMMM yyyy');
};