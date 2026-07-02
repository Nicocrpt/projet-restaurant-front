import React from 'react';
import { Link } from 'react-router-dom';

function ReservationsAdmin() {
  return (
    <div className="placeholder-page">
      <h2>Administration - Réservations</h2>
      <p>L'interface d'administration des réservations sera bientôt disponible.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
}

export default ReservationsAdmin;
