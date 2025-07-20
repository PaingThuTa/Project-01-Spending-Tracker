<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useExpenses } from '../hooks/useExpenses';

const Journal = () => {
  const { expenses: records, addExpense, deleteExpense } = useExpenses();
  const [categories, setCategories] = useState([]);
=======
import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';
import AddCategoryModal from './AddCategoryModal';

const Journal = () => {
  const { expenses: records, addExpense, deleteExpense } = useExpenses();
  const { allCategories, customCategories, addCustomCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
>>>>>>> cb52527 (- added : function to add custom category)
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: ''
  });

<<<<<<< HEAD
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
=======
  // Function to handle input change (w input validation)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      if (value === '') {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        return;
      }
      
      const numberRegex = /^\d*\.?\d*$/;
      
      if (numberRegex.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
      return;
    }
    
>>>>>>> cb52527 (- added : function to add custom category)
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

<<<<<<< HEAD
=======
  // Function to handle form submission
>>>>>>> cb52527 (- added : function to add custom category)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.category || !formData.amount) {
      alert('Please fill in all fields');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    addExpense({
      date: formData.date,
      category: formData.category,
      amount: formData.amount
    });
    
    setFormData({
      date: '',
      category: '',
      amount: ''
    });
  };

  const handleDelete = (id) => {
    deleteExpense(id);
  };

<<<<<<< HEAD
=======
  const handleAddCategory = (categoryName) => {
    return addCustomCategory(categoryName);
  };

>>>>>>> cb52527 (- added : function to add custom category)
  return (
    <div className="journal">
      <h2>Add Spending Record</h2>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category:</label>
<<<<<<< HEAD
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
=======
          <div className="category-input-group">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select a category</option>
              {allCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                  {customCategories.includes(category) ? ' (Custom)' : ''}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary add-category-btn"
            >
              + Add Category
            </button>
          </div>
>>>>>>> cb52527 (- added : function to add custom category)
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="form-input"
            step="0.01"
            min="0.01"
            required
          />
        </div>
        
        <button type="submit" className="btn-primary">Add Record</button>
      </form>

      <h2>Spending Records</h2>
      
      {records.length === 0 ? (
        <div className="empty-state">
          <p>No spending records yet.</p>
        </div>
      ) : (
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.category}</td>
                <td>${record.amount.toFixed(2)}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(record.id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
<<<<<<< HEAD
=======
      
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
>>>>>>> cb52527 (- added : function to add custom category)
    </div>
  );
};

export default Journal;
