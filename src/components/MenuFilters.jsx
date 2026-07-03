import React from 'react';
import './MenuFilters.css';

function MenuFilters({
  categoryFilter,
  setCategoryFilter,
  maxPrice,
  setMaxPrice,
  absoluteMaxPrice,
  handleResetFilters
}) {
 return (
  <section className="filters-panel luxury-panel">

    {/* Catégories */}
    <div className="filter-block">
      <h4 className="filter-title">Carte</h4>

      <div className="segmented-menu">
        <button
          className={`seg-item ${categoryFilter === "all" ? "active" : ""}`}
          onClick={() => setCategoryFilter("all")}
        >
          Tout le menu
        </button>

        <button
          className={`seg-item ${categoryFilter === "entree" ? "active" : ""}`}
          onClick={() => setCategoryFilter("entree")}
        >
          Entrées
        </button>

        <button
          className={`seg-item ${categoryFilter === "plat" ? "active" : ""}`}
          onClick={() => setCategoryFilter("plat")}
        >
          Plats
        </button>

        <button
          className={`seg-item ${categoryFilter === "dessert" ? "active" : ""}`}
          onClick={() => setCategoryFilter("dessert")}
        >
          Desserts
        </button>
      </div>
    </div>

    {/* Budget */}
    <div className="filter-block">
      <div className="filter-header">
        <h4 className="filter-title">Budget</h4>
        <span className="price-display">{maxPrice} €</span>
      </div>

      <input
        type="range"
        min="5"
        max={absoluteMaxPrice}
        step="1"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="luxury-slider"
      />

      <div className="range-labels">
        <span>5 €</span>
        <span>{absoluteMaxPrice} €</span>
      </div>
    </div>

    {/* Reset */}
    {(categoryFilter !== "all" || maxPrice < absoluteMaxPrice) && (
      <button className="reset-luxury-btn" onClick={handleResetFilters}>
        Réinitialiser
      </button>
    )}

  </section>
);
}

export default MenuFilters;
