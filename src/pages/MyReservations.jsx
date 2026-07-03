import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge.jsx';

function MyReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    async function fetchReservations() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/reservations/my-reservations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 404) {
          setReservations([]);
          return;
        }

        if (!response.ok) {
          throw new Error("Impossible de charger vos réservations.");
        }

        const data = await response.json();
        setReservations(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReservations();
  }, [token]);

  const handleCancelReservation = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'annulation.");
      }

      setReservations(prev =>
        prev.map(res => (res.id === id ? { ...res, status: 'cancelled' } : res))
      );
      alert("La réservation a été annulée avec succès.");
    } catch (err) {
      alert(`Erreur d'annulation: ${err.message}`);
    }
  };

  const formatReservationDate = (dateStr) => {
    try {
      const date = new Date(dateStr.replace(' ', 'T'));
      const dayStr = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const timeStr = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dayStr} à ${timeStr}`;
    } catch (e) {
      return dateStr;
    }
  };

  if (!token) {
    return (
      <div className="reservations-page placeholder-page">
        <h2>Mes Réservations</h2>
        <div className="login-required-card">
          <p>Vous devez être connecté pour consulter et gérer vos réservations.</p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary">Se Connecter</Link>
            <Link to="/signup" className="btn btn-outline">Créer un Compte</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservations-page">
      <section className="reservations-banner">
        <span className="banner-tagline">Vos moments privilégiés</span>
        <h2 className="banner-title">Mes Réservations</h2>
        <p className="banner-subtitle">
          Retrouvez et gérez vos réservations de table dans notre établissement.
        </p>
        <Link to="/reservations/new" className="btn btn-primary banner-action">
          ✨ Réserver une Table
        </Link>
      </section>

      <div className="reservations-content">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Chargement de vos réservations en cours...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <p className="error-message">{error}</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="empty-state">
            <p>Vous n'avez pas encore effectué de réservation.</p>
            <Link to="/reservations/new" className="btn btn-primary btn-sm" style={{ marginTop: '16px' }}>
              Réserver ma première table
            </Link>
          </div>
        ) : (
          <div className="reservations-grid">
            {reservations.map((res) => {
              const isCancelable = res.status === 'pending'; 
              
              return (
                <article key={res.id} className="reservation-card">
                  <div className="res-card-header">
                    <StatusBadge status={res.status} />
                    <span className="res-id">Réf. #{res.id}</span>
                  </div>
                  
                  <div className="res-card-body">
                    <div className="res-detail">
                      <span className="res-icon">📅</span>
                      <span className="res-value">{formatReservationDate(res.starts_at)}</span>
                    </div>
                    <div className="res-detail">
                      <span className="res-icon">👥</span>
                      <span className="res-value">{res.number_of_people} convives</span>
                    </div>
                    {res.comment && (
                      <div className="res-comment">
                        <strong>Note :</strong> "{res.comment}"
                      </div>
                    )}
                  </div>

                  {isCancelable && (
                    <div className="res-card-footer">
                      <button 
                        onClick={() => handleCancelReservation(res.id)}
                        className="btn btn-secondary btn-sm btn-cancel"
                      >
                        Annuler la réservation
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReservations;
