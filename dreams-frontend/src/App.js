import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import RecoveryPage from './components/RecoveryPage/RecoveryPage';
import SuccessPage from './components/SuccessPage/SuccessPage';
import ChangePasswordPage from './components/ChangePasswordPage/ChangePasswordPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

