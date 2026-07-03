import React from 'react';
import StatusBadge from './StatusBadge.jsx';

function ReservationCard({ res, onCancel }) {
  const isCancelable = res.status === 'pending';

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

  return (
    <article className="reservation-card">
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
            onClick={() => onCancel(res.id)}
            className="btn btn-secondary btn-sm btn-cancel"
          >
            Annuler la réservation
          </button>
        </div>
      )}
    </article>
  );
}

export default ReservationCard;
