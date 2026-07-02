import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="placeholder-page">
      <h2>Inscription</h2>
      <p>L'espace d'inscription sera disponible lors de la prochaine étape.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
}

export default Signup;
