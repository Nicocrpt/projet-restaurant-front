import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MyReservations from './pages/MyReservations.jsx';
import NewReservation from './pages/NewReservation.jsx';
import ReservationsAdmin from './pages/ReservationsAdmin.jsx';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/reservations/new" element={<NewReservation />} />
          <Route path="/reservations" element={<ReservationsAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
