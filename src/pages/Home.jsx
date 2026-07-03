import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard.jsx";
import Hero from "../components/Hero.jsx";
import platRisotto from "../assets/plat-risotto.jpg";
import "./Home.css";
function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <Hero
        tagline="Haute Gastronomie"
        title="Noma"
        subtitle="Une table d'exception alliant tradition culinaire française et créativité moderne."
        primaryText="Découvrir la Carte"
        primaryLink="/menu"
        secondaryText="Réserver une Table"
        secondaryLink="/my-reservations"
      />

      {/* Features Section */}
      <section className="presentation-section">
        <div className="presentation-container">
          <div className="presentation-content">
            <span className="section-tag">Notre Histoire</span>

            <h2>Une cuisine inspirée par la tradition</h2>

            <p>
              Depuis notre ouverture, nous proposons une cuisine raffinée
              élaborée à partir de produits frais et de saison. Chaque assiette
              est pensée pour offrir une expérience gastronomique unique.
            </p>

            <div className="presentation-buttons">
              <button className="btn btn-outline">Découvrir la carte</button>
              <button className="btn btn-outline">Réserver une table</button>
            </div>
          </div>

          <div className="presentation-image">
            <img src={platRisotto} alt="Plat de risotto" />
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-container">
          <span className="section-tag">Informations</span>

          <h2 className="section-title">Nous contacter</h2>

          <div className="contact-grid">
            <div className="contact-block">
              <h3>Horaires</h3>

              <ul>
                <li>
                  <span>Lundi</span>
                  <span>Fermé</span>
                </li>
                <li>
                  <span>Mardi - Vendredi</span>
                  <span className="hours">
                    12h00 - 14h30
                    <span className="separator"></span>
                    19h00 - 22h30
                  </span>
                </li>
                <li>
                  <span>Samedi</span>
                  <span>19h00 - 23h00</span>
                </li>
                <li>
                  <span>Dimanche</span>
                  <span>12h00 - 15h00</span>
                </li>
              </ul>
            </div>

            <div className="contact-block">
              <h3>Le restaurant</h3>

              <div className="contact-item">
                <span>Adresse</span>
                <p>
                  42 Rue de la Gastronomie
                  <br />
                  75001 Paris
                </p>
              </div>

              <div className="contact-item">
                <span>Téléphone</span>
                <p>+33 (0)1 23 45 67 89</p>
              </div>

              <div className="contact-item">
                <span>Email</span>
                <p>contact@moya.fr</p>
              </div>

              <div className="contact-buttons">
                <a href="tel:+33123456789" className="button-link" style={{ color: "var(--color-primary)" }}>
                  Appeler
                </a>

                <a href="/reservation" className="button-link" style={{ color: "var(--color-primary)" }}>
                  Réserver
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
