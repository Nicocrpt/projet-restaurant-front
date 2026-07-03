import React, { useState, useEffect } from "react";

function EditReservationModal({ reservation, onClose, onSave }) {
  const [form, setForm] = useState({
    number_of_people: 1,
    date: "",
    time: "",
    comment: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!reservation) return;

    const datetime = new Date(reservation.starts_at.replace(' ', 'T'));
    
    // Timezone-safe date extraction in local time
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0');
    const day = String(datetime.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const timeStr = datetime.toTimeString().slice(0, 5); // Returns "HH:MM"

    setForm({
      number_of_people: Number(reservation.number_of_people ?? 1),
      date: dateStr,
      time: timeStr,
      comment: reservation.comment || ""
    });
    setError(null);
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "number_of_people"
          ? value === "" ? "" : Number(value)
          : value
    }));
  };

  const handleBlurNumber = () => {
    let val = form.number_of_people;
    if (val === "" || val < 1) {
      val = 1;
    } else if (val > 10) {
      val = 10;
    }
    setForm(prev => ({ ...prev, number_of_people: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const todayStr = getTodayDateString();
    if (form.date < todayStr) {
      setError("La date de réservation ne peut pas être dans le passé.");
      setIsSaving(false);
      return;
    }

    try {
      await onSave({
        number_of_people: Number(form.number_of_people || 1),
        date: form.date,
        time: form.time,
        comment: form.comment
      });
      onClose();
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la mise à jour.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!reservation) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Floating Close Button */}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Fermer"
          disabled={isSaving}
        >
          &times;
        </button>

        <header className="modal-header">
          <h3 className="modal-title">Modifier la Réservation</h3>
          <span className="modal-subtitle">Référence #{reservation.id}</span>
          <div className="divider-small"></div>
        </header>

        <form onSubmit={handleSubmit} className="booking-form">
          {error && (
            <div className="error-alert">
              <span className="error-alert-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* PEOPLE */}
          <div className="form-group">
            <label htmlFor="modalNumberOfPeople">Nombre de convives</label>
            <div className="input-number-wrapper">
              <input
                type="number"
                id="modalNumberOfPeople"
                name="number_of_people"
                min="1"
                max="10"
                step="1"
                value={form.number_of_people}
                onChange={handleChange}
                onBlur={handleBlurNumber}
                required
                disabled={isSaving}
              />
              <span className="input-suffix">personnes</span>
            </div>
          </div>

          {/* DATE */}
          <div className="form-group">
            <label htmlFor="modalDate">Date</label>
            <input
              type="date"
              id="modalDate"
              name="date"
              min={getTodayDateString()}
              value={form.date}
              onChange={handleChange}
              required
              disabled={isSaving}
            />
          </div>

          {/* TIME */}
          <div className="form-group">
            <label htmlFor="modalTime">Heure de service</label>
            <select
              id="modalTime"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              disabled={isSaving}
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

          {/* COMMENT */}
          <div className="form-group">
            <label htmlFor="modalComment">Commentaire / Demande particulière (optionnel)</label>
            <textarea
              id="modalComment"
              name="comment"
              rows="3"
              value={form.comment}
              onChange={handleChange}
              placeholder="Ex: table près de la fenêtre, allergies..."
              disabled={isSaving}
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-outline btn-sm"
              onClick={onClose}
              disabled={isSaving}
            >
              Annuler
            </button>

            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="btn-loading-content">
                  <span className="btn-spinner"></span>
                  Enregistrement...
                </span>
              ) : (
                "Sauvegarder"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditReservationModal;