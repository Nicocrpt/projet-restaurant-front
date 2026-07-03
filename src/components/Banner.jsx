import React from 'react';
import { Link } from 'react-router-dom';


function Banner({ tagline, title, subtitle, displayButton = false }) {
  return (
    <section className="page-banner">
      {tagline && <span className="banner-tagline">{tagline}</span>}
      <h2 className="banner-title">{title}</h2>
      {subtitle && <p className="banner-subtitle">{subtitle}</p>}
      {displayButton && (
        <Link to="/reservations/new" className="btn btn-primary banner-action">
          ✨ Réserver une Table
        </Link>
      )}
    </section>
  );
}

export default Banner;
