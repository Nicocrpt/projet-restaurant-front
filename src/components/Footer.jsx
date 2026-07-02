import React from 'react';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <p className="copyright">&copy; {new Date().getFullYear()} L'Étoile Dorée. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="#privacy">Mentions Légales</a>
          <a href="#terms">CGU</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
