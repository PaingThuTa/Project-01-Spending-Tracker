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
<<<<<<< HEAD
<<<<<<< HEAD
  ALL_TIME: 'all_time'
};

export const getDateRange = (period) => {
=======
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
  SPECIFIC_MONTH: 'specific_month',
  ALL_TIME: 'all_time'
};

// Function to get date range based on time period
export const getDateRange = (period, specificDate = null) => {
<<<<<<< HEAD
>>>>>>> cb52527 (- added : function to add custom category)
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
    case TIME_PERIODS.SPECIFIC_MONTH:
      if (specificDate) {
        return {
          start: startOfMonth(new Date(specificDate)),
          end: endOfMonth(new Date(specificDate))
        };
      }
      return null;
<<<<<<< HEAD
>>>>>>> cb52527 (- added : function to add custom category)
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
    case TIME_PERIODS.ALL_TIME:
    default:
      return null; 
  }
};

<<<<<<< HEAD
<<<<<<< HEAD
export const filterExpensesByPeriod = (expenses, period) => {
=======
// Function to filter expenses based on time period
export const filterExpensesByPeriod = (expenses, period, specificDate = null) => {
>>>>>>> cb52527 (- added : function to add custom category)
=======
// Function to filter expenses based on time period
export const filterExpensesByPeriod = (expenses, period, specificDate = null) => {
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
  if (period === TIME_PERIODS.ALL_TIME) {
    return expenses;
  }
  
<<<<<<< HEAD
<<<<<<< HEAD
  const dateRange = getDateRange(period);
=======
  const dateRange = getDateRange(period, specificDate);
>>>>>>> cb52527 (- added : function to add custom category)
=======
  const dateRange = getDateRange(period, specificDate);
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
  if (!dateRange) return expenses;
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, dateRange);
  });
};

<<<<<<< HEAD
<<<<<<< HEAD
=======
// Function to group expenses by category
>>>>>>> cb52527 (- added : function to add custom category)
=======
// Function to group expenses by category
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
// Function to calculate total spending
>>>>>>> cb52527 (- added : function to add custom category)
=======
// Function to calculate total spending
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
export const calculateTotalSpending = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

<<<<<<< HEAD
<<<<<<< HEAD
=======
// Function to format currency
>>>>>>> cb52527 (- added : function to add custom category)
=======
// Function to format currency
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

<<<<<<< HEAD
<<<<<<< HEAD
export const getPeriodLabel = (period) => {
=======
// Function to get period label
export const getPeriodLabel = (period, specificDate = null) => {
>>>>>>> cb52527 (- added : function to add custom category)
=======
// Function to get period label
export const getPeriodLabel = (period, specificDate = null) => {
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
  switch (period) {
    case TIME_PERIODS.DAILY:
      return 'Today';
    case TIME_PERIODS.WEEKLY:
      return 'This Week';
    case TIME_PERIODS.MONTHLY:
      return 'This Month';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
    case TIME_PERIODS.SPECIFIC_MONTH:
      if (specificDate) {
        return format(new Date(specificDate), 'MMMM yyyy');
      }
      return 'Selected Month';
<<<<<<< HEAD
>>>>>>> cb52527 (- added : function to add custom category)
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
    case TIME_PERIODS.ALL_TIME:
    default:
      return 'All Time';
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
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
<<<<<<< HEAD
>>>>>>> cb52527 (- added : function to add custom category)
=======
>>>>>>> cb52527e4ef7e27f774467ac994d9eeebc6f561d
};