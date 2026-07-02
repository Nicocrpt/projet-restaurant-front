import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="placeholder-page">
      <h2>Connexion</h2>
      <p>L'espace de connexion sera disponible lors de la prochaine étape.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
}

export default Login;
