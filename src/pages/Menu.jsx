import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="placeholder-page">
      <h2>Carte du Restaurant</h2>
      <p>Notre carte gourmande de saison sera bientôt disponible ici !</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
}

export default Menu;
