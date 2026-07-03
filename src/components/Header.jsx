import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Header.css";
function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-brand">
          <span className="logo-text">Moya</span>
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">
            Accueil
          </Link>
          <Link to="/menu" className="nav-link">
            La Carte
          </Link>
          {isAuthenticated && (
            <Link to="/my-reservations" className="nav-link">
              Mes Réservations
            </Link>
          )}
          {isAuthenticated && isAdmin && (
            <Link to="/reservations" className="nav-link admin-link">
              Admin
            </Link>
          )}
        </nav>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-email-display">{user?.email}</span>
              <button onClick={logout} className="button-link">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button-link">
                Connexion
              </Link>
              <Link to="/signup" className="button-link">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
