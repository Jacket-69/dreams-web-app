import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children, userRole = 'estudiante', currentPage = 'proyectos' }) => {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar userRole={userRole} currentPage={currentPage} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

