import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login/LoginPage/LoginPage';
import RecoveryPage from './components/login/RecoveryPage/RecoveryPage';
import SuccessPage from './components/login/SuccessPage/SuccessPage';
import ChangePasswordPage from './components/login/ChangePasswordPage/ChangePasswordPage';
import Layout from './components/general_components/Layout/Layout';
import ProyectosPage from './components/proyecto/ProyectosPage/ProyectosPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/proyectos" element={
            <Layout userRole="estudiante" currentPage="proyectos">
              <ProyectosPage userRole="estudiante" />
            </Layout>
          } />
          <Route path="/proyectos-admin" element={
            <Layout userRole="admin" currentPage="proyectos">
              <ProyectosPage userRole="admin" />
            </Layout>
          } />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

