import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tagline">Haute Gastronomie</span>
          <h1 className="hero-title">L'Étoile Dorée</h1>
          <p className="hero-subtitle">
            Une table d'exception alliant tradition culinaire française et créativité moderne.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">
              Découvrir la Carte
            </Link>
            <Link to="/my-reservations" className="btn btn-secondary">
              Réserver une Table
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy / Story Section */}
      <section className="story-section">
        <div className="section-container">
          <div className="story-grid">
            <div className="story-text animate-fade-in">
              <span className="section-subtitle">Notre Histoire</span>
              <h2 className="section-title">L'Art de la Table</h2>
              <div className="divider"></div>
              <p>
                Depuis sa création, <strong>L'Étoile Dorée</strong> s'efforce de sublimer les produits du terroir à travers des recettes raffinées et innovantes. Notre Chef sélectionne chaque jour des ingrédients frais et de saison auprès de producteurs locaux passionnés.
              </p>
              <p>
                Que ce soit pour un déjeuner d'affaires, un dîner romantique ou une célébration familiale, nous mettons tout en œuvre pour vous offrir une expérience sensorielle inoubliable, mariant parfaitement les saveurs et les textures.
              </p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3>Cuisine Raffinée</h3>
                <p>Des plats d'exception préparés avec rigueur et créativité par notre brigade.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌿</div>
                <h3>Produits Locaux</h3>
                <p>Une sélection rigoureuse d'ingrédients de saison en circuit court.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🍷</div>
                <h3>Cave d'Exception</h3>
                <p>Des accords mets-vins méticuleusement sélectionnés pour parfaire votre repas.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🕯️</div>
                <h3>Ambiance Cosy</h3>
                <p>Un cadre chaleureux et intime pour savourer chaque moment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info & Hours Section */}
      <section className="info-section">
        <div className="section-container">
          <div className="info-grid">
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
                  <span className="time">12h00 - 14h30 <span className="separator">|</span> 19h00 - 22h30</span>
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

            <div className="info-card contact-card">
              <h3 className="card-title">📍 Nous Trouver</h3>
              <div className="divider-small"></div>
              <p className="contact-detail">
                <strong>Adresse :</strong> 42 Rue de la Gastronomie, 75001 Paris
              </p>
              <p className="contact-detail">
                <strong>Téléphone :</strong> +33 (0)1 23 45 67 89
              </p>
              <p className="contact-detail">
                <strong>Email :</strong> contact@letoiledoree.fr
              </p>
              <div className="contact-actions">
                <a href="tel:+33123456789" className="btn-link">Appeler le restaurant</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
