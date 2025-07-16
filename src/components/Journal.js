import React, { useState, useEffect } from 'react';

const Journal = () => {
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: ''
  });

  // Load categories from JSON file
  useEffect(() => {
    fetch('/spending_data.json')
      .then(response => response.json())
      .then(data => {
        // Extract unique categories from the spending data
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('Error loading categories:', error);
        // Fallback categories if file can't be loaded
        setCategories(['Groceries', 'Transportation', 'Shopping', 'Entertainment', 'Other']);
      });
  }, []);

  // Load records from Local Storage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('spendingRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Save records to Local Storage whenever records change
  useEffect(() => {
    localStorage.setItem('spendingRecords', JSON.stringify(records));
  }, [records]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

    const newRecord = {
      id: Date.now(), // Simple ID generation
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount)
    };

    setRecords(prev => [...prev, newRecord]);
    
    // Reset form
    setFormData({
      date: '',
      category: '',
      amount: ''
    });
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  return (
    <div>
      <h2>Add Spending Record</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>
        
        <button type="submit">Add Record</button>
      </form>

      <h2>Spending Records</h2>
      
      {records.length === 0 ? (
        <p>No spending records yet.</p>
      ) : (
        <table border="1">
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
                  <button onClick={() => handleDelete(record.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Journal; 