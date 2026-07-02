import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-brand">
          <span className="logo-icon">✨</span>
          <span className="logo-text">L'Étoile Dorée</span>
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/menu" className="nav-link">La Carte</Link>
          <Link to="/my-reservations" className="nav-link">Mes Réservations</Link>
          <Link to="/reservations" className="nav-link admin-link">Admin</Link>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-outline">Connexion</Link>
          <Link to="/signup" className="btn btn-primary btn-sm">S'inscrire</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
