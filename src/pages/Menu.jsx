import React, { useState, useEffect } from 'react';
import Categorie from '../components/Categorie.jsx';

function Menu() {
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(50); // Default max price in Euros

  useEffect(() => {
    async function fetchMenu() {
      try {
        setIsLoading(true);
        setError(null);

        // Build query string based on active filters
        const params = new URLSearchParams();
        if (categoryFilter !== 'all') {
          params.append('category', categoryFilter);
        }
        if (maxPrice < 50) {
          // Convert price to cents for the backend
          params.append('max-price', (maxPrice * 100).toString());
        }

        const queryString = params.toString();
        const url = `/api/menu${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Impossible de récupérer la carte du restaurant.");
        }

        const data = await response.json();
        
        // Handle different possible backend response formats
        if (Array.isArray(data)) {
          // If the backend returns a flat array, we group it by category ourselves
          const grouped = data.reduce((acc, item) => {
            const cat = item.category || 'autres';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
          }, {});
          setMenuData(grouped);
        } else {
          // If the backend returns grouped categories (e.g. { entree: [], plat: [] })
          setMenuData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenu();
  }, [categoryFilter, maxPrice]);

  // Translate category keys to user-friendly titles
  const categoryTitles = {
    entree: 'Entrées',
    plat: 'Plats Principaux',
    dessert: 'Desserts',
    autres: 'Autres suggestions'
  };

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setMaxPrice(50);
  };

  return (
    <div className="menu-page-container">
      {/* Banner */}
      <section className="menu-banner">
        <span className="banner-tagline">Découvrez notre savoir-faire</span>
        <h2 className="banner-title">La Carte Gourmande</h2>
        <p className="banner-subtitle">
          Chaque plat est une invitation au voyage gustatif, préparé à la minute avec amour.
        </p>
      </section>

      <div className="menu-content-container">
        {/* Filters Sidebar/Panel */}
        <section className="filters-panel">
          <div className="filter-group">
            <h4 className="filter-title">Catégories</h4>
            <div className="category-buttons">
              <button
                className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                Tout le menu
              </button>
              <button
                className={`filter-btn ${categoryFilter === 'entree' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('entree')}
              >
                Entrées
              </button>
              <button
                className={`filter-btn ${categoryFilter === 'plat' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('plat')}
              >
                Plats
              </button>
              <button
                className={`filter-btn ${categoryFilter === 'dessert' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('dessert')}
              >
                Desserts
              </button>
            </div>
          </div>

          <div className="filter-group">
            <div className="price-filter-header">
              <h4 className="filter-title">Budget maximum</h4>
              <span className="price-value">{maxPrice} €</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
            <div className="slider-labels">
              <span>5 €</span>
              <span>50 €</span>
            </div>
          </div>

          {(categoryFilter !== 'all' || maxPrice < 50) && (
            <button className="btn btn-outline btn-sm reset-btn" onClick={handleResetFilters}>
              Réinitialiser les filtres
            </button>
          )}
        </section>

        {/* Menu Listings */}
        <div className="menu-list-wrapper">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement des délices de la carte...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <span className="error-icon">⚠️</span>
              <p className="error-message">{error}</p>
              <button className="btn btn-primary btn-sm" onClick={() => setCategoryFilter('all')}>
                Rafraîchir
              </button>
            </div>
          ) : Object.keys(menuData).length === 0 || Object.values(menuData).every(arr => arr.length === 0) ? (
            <div className="empty-state">
              <p>Aucun plat ne correspond à vos critères de recherche.</p>
              <button className="btn btn-primary btn-sm" onClick={handleResetFilters}>
                Voir tous les plats
              </button>
            </div>
          ) : (
            <div className="categories-list">
              {/* Order the categories: entree, plat, dessert, then others */}
              {['entree', 'plat', 'dessert'].map((catKey) => {
                const plats = menuData[catKey];
                return (
                  <Categorie
                    key={catKey}
                    title={categoryTitles[catKey]}
                    plats={plats}
                  />
                );
              })}

              {/* Render any other categories that might be returned by the backend */}
              {Object.keys(menuData)
                .filter((catKey) => !['entree', 'plat', 'dessert'].includes(catKey))
                .map((catKey) => (
                  <Categorie
                    key={catKey}
                    title={categoryTitles[catKey] || catKey}
                    plats={menuData[catKey]}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
