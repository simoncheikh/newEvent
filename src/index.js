import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HomePage } from './Pages/HomePage';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes> 
        <Route path="/" element={<HomePage/>} /> 
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
