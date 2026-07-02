import React from 'react';
import { Link } from 'react-router-dom';

function MyReservations() {
  return (
    <div className="placeholder-page">
      <h2>Mes Réservations</h2>
      <p>La gestion de vos réservations sera bientôt disponible.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
}

export default MyReservations;
