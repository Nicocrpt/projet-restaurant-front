import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Banner from '../components/Banner.jsx';
import './NewReservation.css';

function NewReservation() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:30');
  const [comment, setComment] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const todayStr = getTodayDateString();
    if (date < todayStr) {
      setError("La date de réservation ne peut pas être dans le passé.");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError("Vous devez être connecté pour effectuer une réservation.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          number_of_people: Math.max(1, Number(numberOfPeople) || 2),
          date,
          time,
          comment: comment || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'adresse de réservation.");
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/my-reservations');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="reservation-form-container">
      <Banner tagline="Réservez votre table" title="Nouvelle Réservation" />

      <div className="form-card-wrapper">
        <div className="form-card">
          <Link to="/my-reservations" className="btn-back">
            &larr; Retour à mes réservations
          </Link>

          {success ? (
            <div className="success-state">
              <span className="success-icon">🎉</span>
              <h3>Réservation validée !</h3>
              <p>Votre table a été réservée avec succès. Redirection en cours...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="booking-form">
              {error && (
                <div className="error-alert">
                  <span className="error-alert-icon">⚠️</span>
                  <p>{error}</p>
                </div>
              )}

              {/* Number of People */}
              <div className="form-group">
                <label htmlFor="numberOfPeople">Nombre de convives</label>
                <div className="input-number-wrapper">
                  <input
                    type="number"
                    id="numberOfPeople"
                    min="1"
                    max="10"
                    value={numberOfPeople}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setNumberOfPeople('');
                      } else {
                        setNumberOfPeople(Number(val));
                      }
                    }}
                    onBlur={() => {
                      if (numberOfPeople === '' || numberOfPeople < 1) {
                        setNumberOfPeople(1);
                      } else if (numberOfPeople > 10) {
                        setNumberOfPeople(10);
                      }
                    }}
                    required
                  />
                  <span className="input-suffix">personnes</span>
                </div>
              </div>

              {/* Date */}
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  min={getTodayDateString()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Time slots */}
              <div className="form-group">
                <label htmlFor="time">Heure de service</label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  <optgroup label="Midi (Lunch)">
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                  </optgroup>
                  <optgroup label="Soir (Dinner)">
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                  </optgroup>
                </select>
              </div>



              {/* Comment */}
              <div className="form-group">
                <label htmlFor="comment">Commentaire / Demande particulière (optionnel)</label>
                <textarea
                  id="comment"
                  rows="3"
                  placeholder="Ex: table près de la fenêtre, allergies..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-submit" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Confirmer la Réservation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewReservation;
