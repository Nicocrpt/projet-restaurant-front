import React from 'react';
import MenuComponent from '../components/Menu.jsx';
import Banner from '../components/Banner.jsx';

function Menu() {
  return (
    <div className="menu-page-container">
      <Banner
        tagline="Découvrez notre savoir-faire"
        title="La Carte Gourmande"
        subtitle="Chaque plat est une invitation au voyage gustatif, préparé à la minute avec amour."
        displayButton
      />

      <div className="menu-content-container">
        <MenuComponent />
      </div>
    </div>
  );
}

export default Menu;
