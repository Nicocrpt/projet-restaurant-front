import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

import heroImage from "../assets/restaurant.jpg"; // adapte le chemin

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">Moya</h1>
      </div>
    </section>
  );
}
export default Hero;