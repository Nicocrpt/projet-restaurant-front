import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Identifiants incorrects ou compte introuvable.");
      }

      login(data.token);
      
      const base64Url = data.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      if (payload.role === 'admin') {
        navigate('/reservations');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container-page">
      <div className="auth-card">
        <h2 className="auth-title">Connexion</h2>
        <p className="auth-subtitle">Accédez à votre espace pour gérer vos réservations.</p>

        {error && (
          <div className="error-alert">
            <span className="error-alert-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jean@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-submit-auth" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="auth-footer-text">
          Pas encore de compte ? <Link to="/signup">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
