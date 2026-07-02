import React from 'react';
import Plat from './Plat.jsx';

function Categorie({ title, plats }) {
  if (!plats || plats.length === 0) return null;

  return (
    <section className="menu-category-section">
      <h3 className="category-title">{title}</h3>
      <div className="divider-small"></div>
      <div className="plats-grid">
        {plats.map((plat) => (
          <Plat
            key={plat.id}
            name={plat.name}
            description={plat.description}
            price_cents={plat.price_cents}
            is_available={plat.is_available}
          />
        ))}
      </div>
    </section>
  );
}

export default Categorie;
