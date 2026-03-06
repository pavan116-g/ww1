import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Battles from './pages/Battles';
import People from './pages/People';
import Legacy from './pages/Legacy';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="site-background" />
        <div className="atmospheric-overlay" />
        <main style={{ position: 'relative', zIndex: 11 }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/battles" element={<Battles />} />
            <Route path="/people" element={<People />} />
            <Route path="/legacy" element={<Legacy />} />
          </Routes>
        </main>
        <div className="app-container">
          <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem', position: 'relative', zIndex: 11 }}>
            <p>Lest we forget.</p>
            <p style={{ fontSize: '0.875rem' }}>World War 1 Educational Portal</p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
