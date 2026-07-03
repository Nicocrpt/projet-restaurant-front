import React from 'react';
import MenuComponent from '../components/Menu.jsx';

function Menu() {
  return (
    <div className="menu-page-container">
      {/* Banner */}
      <section className="menu-banner">
        <h2 className="banner-title">La Carte Gourmande</h2>
      </section>

      <div className="menu-content-container">
        <MenuComponent />
      </div>
    </div>
  );
}

export default Menu;
