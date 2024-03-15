import React from 'react';
import carImage from './banner.png'; 
import "./Header.css";

function Header() {
    return (
      <header className="header">
        <div className="header-content">
          <h1>TuSegundazo.com</h1>
          <img src={carImage} alt="Comercialización de Automotores Nuevos y Usados" />
        </div>
        {/* Add any additional header content here */}
      </header>
    );
  }
export default Header;