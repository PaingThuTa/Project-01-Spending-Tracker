import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Journal from './components/Journal';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/" element={<Navigate to="/analytics" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;