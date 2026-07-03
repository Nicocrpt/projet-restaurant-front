import React from 'react';
import MenuComponent from '../components/Menu.jsx';

function Menu() {
  return (
    <div className="menu-page-container">
      {/* Banner */}
      <section className="menu-banner">
        <span className="banner-tagline">Découvrez notre savoir-faire</span>
        <h2 className="banner-title">La Carte Gourmande</h2>
        <p className="banner-subtitle">
          Chaque plat est une invitation au voyage gustatif, préparé à la minute avec amour.
        </p>
      </section>

      <div className="menu-content-container">
        <MenuComponent />
      </div>
    </div>
  );
}

export default Menu;
