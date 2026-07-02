import React from 'react';

function Horaires() {
  return (
    <div className="info-card hours-card">
      <h3 className="card-title">⏰ Horaires d'Ouverture</h3>
      <div className="divider-small"></div>
      <ul className="hours-list">
        <li>
          <span className="day">Lundi</span>
          <span className="time closed">Fermé</span>
        </li>
        <li>
          <span className="day">Mardi - Vendredi</span>
          <span className="time">
            12h00 - 14h30 <span className="separator">|</span> 19h00 - 22h30
          </span>
        </li>
        <li>
          <span className="day">Samedi</span>
          <span className="time">19h00 - 23h00</span>
        </li>
        <li>
          <span className="day">Dimanche</span>
          <span className="time">12h00 - 15h00</span>
        </li>
      </ul>
    </div>
  );
}

export default Horaires;
