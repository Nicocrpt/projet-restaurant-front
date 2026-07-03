import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReservationCard from '../components/ReservationCard.jsx';
import EditReservationModal from '../components/EditReservationModal.jsx';
import './MyReservations.css';

function MyReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

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

  async function handleCancelReservation(id) {
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

  const handleUpdateReservation = async (updatedData) => {
    const response = await fetch(
      `/api/reservations/${selectedReservation.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Impossible de mettre à jour la réservation.");
    }

    // Reconstruction locale de la réservation avec les nouvelles données
    const updatedReservation = {
      ...selectedReservation,
      number_of_people: updatedData.number_of_people,
      starts_at: `${updatedData.date} ${updatedData.time}:00`, // Format YYYY-MM-DD HH:MM:SS requis par la carte
      comment: updatedData.comment
    };

    // Mise à jour de l'état local pour rafraîchir la carte immédiatement
    setReservations(prev =>
      prev.map(res =>
        res.id === selectedReservation.id
          ? updatedReservation
          : res
      )
    );
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
            {reservations.map((res) => (
              <ReservationCard 
                key={res.id} 
                res={res} 
                onCancel={handleCancelReservation} 
                onEdit={setSelectedReservation}
              />
            ))}
          </div>
        )}
      </div>
      {selectedReservation && (
        <EditReservationModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onSave={handleUpdateReservation}
        />
      )}
    </div>
  );
}

export default MyReservations;
