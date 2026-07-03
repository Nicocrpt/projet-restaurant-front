import React from 'react';
import StatusBadge from './StatusBadge.jsx';

function AdminReservationRow({ res, onValidate, onCancel }) {
  const isPending = res.status === 'pending';
  const isCancelable = res.status === 'pending' || res.status === 'confirmed';

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

  return (
    <tr className={isPending ? 'row-pending' : ''}>
      <td><strong>#{res.id}</strong></td>
      <td>ID #{res.user_id}</td>
      <td>{formatReservationDate(res.starts_at)}</td>
      <td>{res.number_of_people} pers.</td>
      <td className="table-comment">{res.comment ? `"${res.comment}"` : '-'}</td>
      <td><StatusBadge status={res.status} /></td>
      <td className="table-actions">
        {isPending && (
          <button
            onClick={() => onValidate(res.id)}
            className="btn btn-primary btn-sm btn-action-validate"
          >
            Valider
          </button>
        )}
        {isCancelable && (
          <button
            onClick={() => onCancel(res.id)}
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
}

export default AdminReservationRow;
