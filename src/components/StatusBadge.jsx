import React from 'react';

function StatusBadge({ status }) {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'En attente', className: 'status-pending' };
      case 'confirmed':
        return { text: 'Confirmée', className: 'status-confirmed' };
      case 'seated':
        return { text: 'Installé', className: 'status-seated' };
      case 'completed':
        return { text: 'Terminée', className: 'status-completed' };
      case 'cancelled':
        return { text: 'Annulée', className: 'status-cancelled' };
      case 'no_show':
        return { text: 'Absent', className: 'status-noshow' };
      default:
        return { text: status, className: '' };
    }
  };

  const info = getStatusInfo(status);

  return (
    <span className={`status-badge ${info.className}`}>
      {info.text}
    </span>
  );
}

export default StatusBadge;
