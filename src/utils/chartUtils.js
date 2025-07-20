import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, startOfWeek, startOfMonth } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const CHART_COLORS = {
  primary: '#4ade80',
  secondary: '#22c55e',
  tertiary: '#16a34a',
  quaternary: '#15803d',
  quinary: '#166534',
  background: 'rgba(74, 222, 128, 0.1)',
  border: '#4ade80',
  gradient: ['#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16']
};

export const generateLineChartData = (expenses, period) => {
  if (!expenses.length) {
    return {
      labels: [],
      datasets: [{
        label: 'Daily Spending',
        data: [],
        borderColor: CHART_COLORS.primary,
        backgroundColor: CHART_COLORS.background,
        tension: 0.4,
        fill: true,
      }]
    };
  }

  const now = new Date();
  let dateRange, formatString, intervalFn;

  switch (period) {
    case 'daily':
      dateRange = {
        start: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
        end: now
      };
      formatString = 'MMM dd';
      intervalFn = eachDayOfInterval;
      break;
    case 'weekly':
      dateRange = {
        start: new Date(now.getTime() - 7 * 7 * 24 * 60 * 60 * 1000),
        end: now
      };
      formatString = 'MMM dd';
      intervalFn = (interval) => eachWeekOfInterval(interval).map(date => startOfWeek(date));
      break;
    case 'monthly':
      dateRange = {
        start: new Date(now.getFullYear(), now.getMonth() - 5, 1),
        end: now
      };
      formatString = 'MMM yyyy';
      intervalFn = (interval) => eachMonthOfInterval(interval).map(date => startOfMonth(date));
      break;
    default:
      const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
      if (sortedExpenses.length === 0) return { labels: [], datasets: [] };
      
      dateRange = {
        start: startOfMonth(new Date(sortedExpenses[0].date)),
        end: now
      };
      formatString = 'MMM yyyy';
      intervalFn = (interval) => eachMonthOfInterval(interval).map(date => startOfMonth(date));
  }

  const intervals = intervalFn(dateRange);
  const labels = intervals.map(date => format(date, formatString));
  const data = intervals.map(intervalStart => {
    let intervalEnd;
    
    switch (period) {
      case 'daily':
        intervalEnd = new Date(intervalStart.getTime() + 24 * 60 * 60 * 1000 - 1);
        break;
      case 'weekly':
        intervalEnd = new Date(intervalStart.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);
        break;
      case 'monthly':
      default:
        intervalEnd = new Date(intervalStart.getFullYear(), intervalStart.getMonth() + 1, 0, 23, 59, 59);
    }

    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= intervalStart && expenseDate <= intervalEnd;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  });

  return {
    labels,
    datasets: [{
      label: 'Spending',
      data,
      borderColor: CHART_COLORS.primary,
      backgroundColor: CHART_COLORS.background,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: CHART_COLORS.primary,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };
};

export const generatePieChartData = (expenses) => {
  if (!expenses.length) {
    return {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
      }]
    };
  }

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a);

  const labels = sortedCategories.map(([category]) => category);
  const data = sortedCategories.map(([,amount]) => amount);
  
  const backgroundColor = labels.map((_, index) => 
    CHART_COLORS.gradient[index % CHART_COLORS.gradient.length]
  );
  
  const borderColor = backgroundColor.map(color => color);

  return {
    labels,
    datasets: [{
      data,
      backgroundColor,
      borderColor,
      borderWidth: 2,
      hoverBorderWidth: 3,
      hoverOffset: 4,
    }]
  };
};

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: 'Poppins',
          size: 12,
        },
        color: '#374151',
        usePointStyle: true,
        padding: 20,
      }
    },
    title: {
      display: true,
      text: 'Spending Trends',
      font: {
        family: 'Poppins',
        size: 16,
        weight: '600',
      },
      color: '#1f2937',
      padding: {
        bottom: 20
      }
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#4ade80',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      titleFont: {
        family: 'Poppins',
        size: 14,
        weight: '600',
      },
      bodyFont: {
        family: 'Poppins',
        size: 13,
      },
      callbacks: {
        label: function(context) {
          return `$${context.parsed.y.toFixed(2)}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: '#f3f4f6',
        drawBorder: false,
      },
      ticks: {
        font: {
          family: 'Poppins',
          size: 11,
        },
        color: '#6b7280',
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
        drawBorder: false,
      },
      ticks: {
        font: {
          family: 'Poppins',
          size: 11,
        },
        color: '#6b7280',
        callback: function(value) {
          return '$' + value.toFixed(0);
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  elements: {
    point: {
      hoverRadius: 8,
    }
  }
};

export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          family: 'Poppins',
          size: 12,
        },
        color: '#374151',
        usePointStyle: true,
        padding: 15,
        generateLabels: function(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const dataset = data.datasets[0];
            const total = dataset.data.reduce((sum, value) => sum + value, 0);
            
            return data.labels.map((label, index) => {
              const value = dataset.data[index];
              const percentage = ((value / total) * 100).toFixed(1);
              
              return {
                text: `${label} (${percentage}%)`,
                fillStyle: dataset.backgroundColor[index],
                strokeStyle: dataset.borderColor[index],
                lineWidth: dataset.borderWidth,
                hidden: false,
                index: index
              };
            });
          }
          return [];
        }
      }
    },
    title: {
      display: true,
      text: 'Spending by Category',
      font: {
        family: 'Poppins',
        size: 16,
        weight: '600',
      },
      color: '#1f2937',
      padding: {
        bottom: 20
      }
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#4ade80',
      borderWidth: 1,
      cornerRadius: 8,
      titleFont: {
        family: 'Poppins',
        size: 14,
        weight: '600',
      },
      bodyFont: {
        family: 'Poppins',
        size: 13,
      },
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.parsed;
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: $${value.toFixed(2)} (${percentage}%)`;
        }
      }
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1000,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  }
};