import React from 'react';
import './Plat.css';
function Plat({ name, description, price_cents, is_available }) {
  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2) + ' €';
  };

 return (
  <article className={`plat-card ${!is_available ? "indisponible" : ""}`}>

    <div className="plat-header">
      <h4 className="plat-name">{name}</h4>
      <span className="plat-price">{formatPrice(price_cents)}</span>
    </div>

    <p className="plat-description">
      {description}
    </p>

    {!is_available && (
      <div className="plat-footer">
        <span className="plat-badge-indisponible">
          Bientôt de retour
        </span>
      </div>
    )}
  </article>
);
}

export default Plat;
