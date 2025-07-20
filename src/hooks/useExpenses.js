import { useState, useEffect } from 'react';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('spendingRecords');
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch (error) {
        console.error('Error parsing saved expenses:', error);
        setExpenses([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('spendingRecords', JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now(),
      ...expense,
      amount: parseFloat(expense.amount)
    };
    setExpenses(prev => [...prev, newExpense]);
    return newExpense;
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id 
          ? { ...expense, ...updatedExpense, amount: parseFloat(updatedExpense.amount) }
          : expense
      )
    );
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    isLoaded
  };
};