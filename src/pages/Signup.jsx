import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import restaurantImg from '../assets/restaurant.jpg';
import './Signup.css';
function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const signupResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          phone: phone || undefined
        })
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        throw new Error(signupData.error || "Une erreur est survenue lors de l'inscription.");
      }

      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error("Compte créé avec succès, mais la connexion automatique a échoué. Veuillez vous connecter manuellement.");
      }

      login(loginData.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="auth-page">
      <div className="auth-left">
        <div className="auth-box">

          <span className="auth-tag">Rejoignez-nous</span>

          <h1 className="auth-title">
            Créer un compte
          </h1>

          <p className="auth-subtitle">
            Réservez votre table en quelques secondes
          </p>

          <form className="auth-form">

            <div className="form-row">
              <input type="text" placeholder="Prénom" />
              <input type="text" placeholder="Nom" />
            </div>

            <input type="email" placeholder="Adresse email" />

            <input type="tel" placeholder="Téléphone (optionnel)" />

            <input type="password" placeholder="Mot de passe" />

            <input type="password" placeholder="Confirmer le mot de passe" />

            <button type="submit">
              S'inscrire
            </button>

          </form>

          <p className="auth-footer">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>

        </div>
      </div>

      <div
        className="auth-right"
        style={{ backgroundImage: `url(${restaurantImg})` }}
      ></div>
      </div>
  );
}

export default Signup;
