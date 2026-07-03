import React, { useState, useEffect } from 'react';
import Categorie from './Categorie.jsx';
import MenuFilters from './MenuFilters.jsx';

function Menu() {
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(50);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    async function loadInitialMenu() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error("Impossible de récupérer la carte du restaurant.");
        }

        const data = await response.json();
        
        let maxCents = 0;
        const processItems = (items) => {
          items.forEach(item => {
            if (item.price_cents > maxCents) {
              maxCents = item.price_cents;
            }
          });
        };

        let groupedData = {};
        if (Array.isArray(data)) {
          processItems(data);
          groupedData = data.reduce((acc, item) => {
            const cat = item.category || 'autres';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
          }, {});
        } else {
          groupedData = data;
          Object.values(data).forEach(categoryItems => {
            if (Array.isArray(categoryItems)) {
              processItems(categoryItems);
            }
          });
        }

        if (maxCents > 0) {
          const maxEuros = Math.ceil(maxCents / 100);
          setAbsoluteMaxPrice(maxEuros);
          setMaxPrice(maxEuros);
        }
        
        setMenuData(groupedData);
        setIsInitialLoad(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialMenu();
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;

    async function fetchFilteredMenu() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (categoryFilter !== 'all') {
          params.append('category', categoryFilter);
        }
        if (maxPrice < absoluteMaxPrice) {
          params.append('max-price', (maxPrice * 100).toString());
        }

        const queryString = params.toString();
        const url = `/api/menu${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Impossible de récupérer la carte du restaurant.");
        }

        const data = await response.json();
        
        if (Array.isArray(data)) {
          const grouped = data.reduce((acc, item) => {
            const cat = item.category || 'autres';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
          }, {});
          setMenuData(grouped);
        } else {
          setMenuData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilteredMenu();
  }, [categoryFilter, maxPrice, isInitialLoad, absoluteMaxPrice]);

  const categoryTitles = {
    entree: 'Entrées',
    plat: 'Plats Principaux',
    dessert: 'Desserts',
  };

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setMaxPrice(absoluteMaxPrice);
  };

  return (
    <>
      {/* Reusable Filters Component */}
      <MenuFilters
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        absoluteMaxPrice={absoluteMaxPrice}
        handleResetFilters={handleResetFilters}
      />

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
            <button className="btn btn-primary btn-sm" onClick={handleResetFilters}>
              Réinitialiser
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
    </>
  );
}

export default Menu;
