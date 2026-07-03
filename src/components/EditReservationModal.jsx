import React, { useState, useEffect } from "react";

function EditReservationModal({ reservation, onClose, onSave }) {

  const [form, setForm] = useState({
    number_of_people: 1,
    date: "",
    time: "",
    comment: ""
  });

  useEffect(() => {
    if (!reservation) return;

    const dt = new Date(reservation.starts_at);

    setForm({
      number_of_people: Number(reservation.number_of_people ?? 1),
      date: dt.toISOString().split("T")[0],
      time: dt.toTimeString().slice(0, 5),
      comment: reservation.comment || ""
    });

  }, [reservation]);

  // 🔥 input handler SAFE (anti string/number bug)
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

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      number_of_people: Number(form.number_of_people || 1),
      date: form.date,
      time: form.time,
      comment: form.comment
    });

    onClose();
  };

  if (!reservation) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <form onSubmit={handleSubmit} className="booking-form">

          {/* PEOPLE */}
          <div className="form-group">
            <label>Nombre de convives</label>
            <input
              type="number"
              name="number_of_people"
              min="1"
              max="10"
              step="1"
              value={form.number_of_people === "" ? "" : Number(form.number_of_people)}
              onChange={handleChange}
            />
          </div>

          {/* DATE */}
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          {/* TIME */}
          <div className="form-group">
            <label>Heure</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
            >
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
            </select>
          </div>

          {/* COMMENT */}
          <div className="form-group">
            <label>Commentaire</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Annuler
            </button>

            <button type="submit">
              Sauvegarder
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditReservationModal;