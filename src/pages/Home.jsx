import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';

function Home() {
  // We define the features since they repeat 4 times in a grid
  const features = [
    {
      icon: "✨",
      title: "Cuisine Raffinée",
      description: "Des plats d'exception préparés avec rigueur et créativité par notre brigade."
    },
    {
      icon: "🌿",
      title: "Produits Locaux",
      description: "Une sélection rigoureuse d'ingrédients de saison en circuit court."
    },
    {
      icon: "🍷",
      title: "Cave d'Exception",
      description: "Des accords mets-vins méticuleusement sélectionnés pour parfaire votre repas."
    },
    {
      icon: "🕯️",
      title: "Ambiance Cosy",
      description: "Un cadre chaleureux et intime pour savourer chaque moment."
    }
  ];

  // Helper: Get dates of the current week (Monday to Sunday)
  const getWeekDays = () => {
    const current = new Date(); // Returns July 2, 2026
    const week = [];
    
    // Day of the week (0 = Sunday, 1 = Monday, etc.)
    const currentDay = current.getDay();
    // Adjust distance so Monday is 0
    const distance = currentDay === 0 ? -6 : 1 - currentDay;
    
    const monday = new Date(current);
    monday.setDate(current.getDate() + distance);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays();

  // Helper: Format range label (e.g. "du 29 juin au 5 juillet 2026")
  const formatWeekRange = (days) => {
    if (days.length === 0) return '';
    const first = days[0];
    const last = days[6];
    
    const options = { day: 'numeric', month: 'long' };
    const firstStr = first.toLocaleDateString('fr-FR', options);
    const lastStr = last.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    
    return `du ${firstStr} au ${lastStr}`;
  };

  // Helper: Match day to opening hours based on database slots
  const getHoursForDate = (date) => {
    const startRange = new Date('2026-07-01T00:00:00');
    const endRange = new Date('2026-08-30T23:59:59');
    
    // Check if within seeded slots range (July - August 2026)
    if (date < startRange || date > endRange) {
      return 'Fermé';
    }
    
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    if (dayOfWeek === 4) {
      // Thursday (Jeudi) has no slots in seed data -> Closed
      return 'Fermé';
    } else if (dayOfWeek === 3) {
      // Wednesday (Mercredi) has only lunch slots (12h - 14h)
      return '12h00 - 14h00';
    } else {
      // Monday, Tuesday, Friday, Saturday, Sunday have lunch (12h) and dinner (19h) slots
      return '12h00 - 14h00 | 19h00 - 21h30';
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="home-container">
      {/* Hero Section (Single-use, kept inline to avoid over-engineering) */}
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
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info & Dynamic Hours Section */}
      <section className="info-section">
        <div className="section-container">
          <div className="info-grid">
            {/* Dynamic Hours Card based on DB Slots */}
            <div className="info-card hours-card">
              <h3 className="card-title">⏰ Horaires d'Ouverture</h3>
              <p className="week-range">Semaine {formatWeekRange(weekDays)}</p>
              <div className="divider-small"></div>
              <ul className="hours-list">
                {weekDays.map((day, index) => {
                  const hours = getHoursForDate(day);
                  const isClosed = hours === 'Fermé';
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  return (
                    <li key={index} className={isToday ? 'today' : ''}>
                      <span className="day-name">
                        {capitalizeFirstLetter(day.toLocaleDateString('fr-FR', { weekday: 'long' }))}
                        <span className="day-date"> ({day.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })})</span>
                        {isToday && <span className="today-badge">Aujourd'hui</span>}
                      </span>
                      <span className={`time ${isClosed ? 'closed' : ''}`}>
                        {hours}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Details Card */}
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
