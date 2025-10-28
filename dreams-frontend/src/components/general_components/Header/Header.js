import React from 'react';
import './Header.css';
import { ReactComponent as AccountIcon } from '../../../Icons/account.svg';

const Logo = () => (
  <div className="logo-section">
    <img 
      src="/logo_blanco.png" 
      alt="Logo Gobierno" 
      className="logo-image"
    />
  </div>
);

const Header = () => {
  const handleProfileClick = () => {
    console.log('Acción de perfil');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Izquierda: Logo */}
        <Logo />

        {/* Derecha: Perfil de Usuario */}
        <div className="user-section">
          <button
            onClick={handleProfileClick}
            className="user-profile"
            aria-label="Perfil de Usuario"
          >
            <div className="user-icon-container">
              <AccountIcon className="user-icon" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
