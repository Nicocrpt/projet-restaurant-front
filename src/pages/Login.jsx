import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import restaurantImg from '../assets/restaurant.jpg';
import './Login.css';
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
   <div className="login-page">
      <div className="login-left">
        <div className="login-box">

          <span className="login-tag">Bienvenue</span>

          <h1 className="login-title">
            Connexion
          </h1>

          <p className="login-subtitle">
            Accédez à votre expérience gastronomique
          </p>

          <form className="login-form">
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              Se connecter
            </button>
          </form>

          <p className="login-footer">
            Pas de compte ? <Link to="/signup">S’inscrire</Link>
          </p>

        </div>
      </div>
      <div
        className="login-right"
        style={{ backgroundImage: `url(${restaurantImg})` }}
      >
      </div>

    </div>
  );
}

export default Login;
