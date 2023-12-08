import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './component/customer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>טבלת לקוחות</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Customer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
