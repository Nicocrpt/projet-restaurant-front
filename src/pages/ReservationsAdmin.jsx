import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function ReservationsAdmin() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const token = localStorage.getItem('token');

  const fetchReservations = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (dateFilter) {
        params.append('date', dateFilter);
      }

      const queryString = params.toString();
      const url = `/api/reservations${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Impossible de charger les réservations administrateur.");
      }

      setReservations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!isAdmin) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    fetchReservations();
  }, [statusFilter, dateFilter, token]);

  const handleValidate = async (id) => {
    try {
      const response = await fetch(`/api/reservations/${id}/validate`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de la validation.");
      }

      // Dynamic real-time update
      setReservations(prev =>
        prev.map(res => (res.id === id ? { ...res, status: 'confirmed' } : res))
      );
    } catch (err) {
      alert(`Erreur de validation: ${err.message}`);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir rejeter/annuler cette réservation ?")) {
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

      // Dynamic real-time update
      setReservations(prev =>
        prev.map(res => (res.id === id ? { ...res, status: 'cancelled' } : res))
      );
    } catch (err) {
      alert(`Erreur d'annulation: ${err.message}`);
    }
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setDateFilter('');
  };

  // Helper: Format DB date-time to French string
  const formatReservationDate = (dateStr) => {
    try {
      const date = new Date(dateStr.replace(' ', 'T'));
      const dayStr = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const timeStr = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dayStr} - ${timeStr}`;
    } catch (e) {
      return dateStr;
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="admin-page">
      <section className="admin-banner">
        <span className="banner-tagline">Console d'administration</span>
        <h2 className="banner-title">Gestion des Réservations</h2>
        <p className="banner-subtitle">
          Validez, refusez et suivez en temps réel l'ensemble des réservations du restaurant.
        </p>
      </section>

      <div className="admin-container">
        {/* Filters Panel */}
        <section className="admin-filters-bar">
          <div className="admin-filter-group">
            <label htmlFor="statusSelect">Statut</label>
            <select
              id="statusSelect"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="seated">Installé</option>
              <option value="completed">Terminées</option>
              <option value="cancelled">Annulées</option>
              <option value="no_show">Absent</option>
            </select>
          </div>

          <div className="admin-filter-group">
            <label htmlFor="dateFilter">Date</label>
            <input
              type="date"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          {(statusFilter !== 'all' || dateFilter) && (
            <button className="btn btn-outline btn-sm reset-admin-filters" onClick={handleResetFilters}>
              Effacer les filtres
            </button>
          )}
        </section>

        {/* Reservations Table */}
        <div className="admin-table-wrapper">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement du registre des réservations...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <span className="error-icon">⚠️</span>
              <p className="error-message">{error}</p>
            </div>
          ) : reservations.length === 0 ? (
            <div className="empty-state">
              <p>Aucune réservation ne correspond aux critères de recherche.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client ID</th>
                  <th>Date & Heure</th>
                  <th>Convives</th>
                  <th>Note / Commentaire</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => {
                  const isPending = res.status === 'pending';
                  const isCancelable = res.status === 'pending' || res.status === 'confirmed';

                  return (
                    <tr key={res.id} className={isPending ? 'row-pending' : ''}>
                      <td><strong>#{res.id}</strong></td>
                      <td>ID #{res.user_id}</td>
                      <td>{formatReservationDate(res.starts_at)}</td>
                      <td>{res.number_of_people} pers.</td>
                      <td className="table-comment">{res.comment ? `"${res.comment}"` : '-'}</td>
                      <td><StatusBadge status={res.status} /></td>
                      <td className="table-actions">
                        {isPending && (
                          <button
                            onClick={() => handleValidate(res.id)}
                            className="btn btn-primary btn-sm btn-action-validate"
                          >
                            Valider
                          </button>
                        )}
                        {isCancelable && (
                          <button
                            onClick={() => handleCancel(res.id)}
                            className="btn btn-secondary btn-sm btn-action-cancel"
                          >
                            Annuler
                          </button>
                        )}
                        {!isPending && !isCancelable && (
                          <span className="text-muted" style={{ fontSize: '12px' }}>Aucune action</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationsAdmin;
