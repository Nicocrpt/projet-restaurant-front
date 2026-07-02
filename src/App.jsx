import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MyReservations from './pages/MyReservations.jsx';
import ReservationsAdmin from './pages/ReservationsAdmin.jsx';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* Navigation Header */}
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

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/reservations" element={<ReservationsAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <p className="copyright">&copy; {new Date().getFullYear()} L'Étoile Dorée. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="#privacy">Mentions Légales</a>
            <a href="#terms">CGU</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
