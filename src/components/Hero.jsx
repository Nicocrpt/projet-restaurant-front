import React from 'react';
import { Link } from 'react-router-dom';

function Hero({ tagline, title, subtitle, primaryText, primaryLink, secondaryText, secondaryLink }) {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {tagline && <span className="hero-tagline">{tagline}</span>}
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        <div className="hero-actions">
          {primaryText && primaryLink && (
            <Link to={primaryLink} className="btn btn-primary">
              {primaryText}
            </Link>
          )}
          {secondaryText && secondaryLink && (
            <Link to={secondaryLink} className="btn btn-secondary">
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
