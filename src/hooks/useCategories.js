import { useState, useEffect } from 'react';

// Custom hook for managing category data
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/spending_data.json')
      .then(response => response.json())
      .then(data => {
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('Error loading categories:', error);
        setCategories(['Groceries', 'Transportation', 'Shopping', 'Entertainment', 'Other']);
      });
  }, []);
  useEffect(() => {
    const savedCustomCategories = localStorage.getItem('customCategories');
    if (savedCustomCategories) {
      try {
        setCustomCategories(JSON.parse(savedCustomCategories));
      } catch (error) {
        console.error('Error parsing saved custom categories:', error);
        setCustomCategories([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('customCategories', JSON.stringify(customCategories));
    }
  }, [customCategories, isLoaded]);

  const addCustomCategory = (categoryName) => {
    const trimmedName = categoryName.trim();
    if (!trimmedName) return false;

    const allCategories = [...categories, ...customCategories];
    const exists = allCategories.some(cat => 
      cat.toLowerCase() === trimmedName.toLowerCase()
    );
    
    if (exists) return false;
    
    setCustomCategories(prev => [...prev, trimmedName]);
    return true;
  };

  const removeCustomCategory = (categoryName) => {
    setCustomCategories(prev => prev.filter(cat => cat !== categoryName));
  };

  const getAllCategories = () => {
    return [...categories, ...customCategories];
  };

  return {
    defaultCategories: categories,
    customCategories,
    allCategories: getAllCategories(),
    addCustomCategory,
    removeCustomCategory,
    isLoaded
  };
};
