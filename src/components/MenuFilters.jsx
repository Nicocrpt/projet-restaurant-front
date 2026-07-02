import React from 'react';

function MenuFilters({
  categoryFilter,
  setCategoryFilter,
  maxPrice,
  setMaxPrice,
  absoluteMaxPrice,
  handleResetFilters
}) {
  return (
    <section className="filters-panel">
      {/* Category filter */}
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

      {/* Price budget filter */}
      <div className="filter-group">
        <div className="price-filter-header">
          <h4 className="filter-title">Budget maximum</h4>
          <span className="price-value">{maxPrice} €</span>
        </div>
        <input
          type="range"
          min="5"
          max={absoluteMaxPrice}
          step="1"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="price-slider"
        />
        <div className="slider-labels">
          <span>5 €</span>
          <span>{absoluteMaxPrice} €</span>
        </div>
      </div>

      {/* Reset button */}
      {(categoryFilter !== 'all' || maxPrice < absoluteMaxPrice) && (
        <button className="btn btn-outline btn-sm reset-btn" onClick={handleResetFilters}>
          Réinitialiser les filtres
        </button>
      )}
    </section>
  );
}

export default MenuFilters;
