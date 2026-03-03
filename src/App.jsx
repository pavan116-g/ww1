import React from 'react';
import Hero from './components/Hero';
import PreWW1 from './components/PreWW1';
import './App.css';

function App() {
  return (
    <div>
      <div className="site-background"></div>
      <div className="atmospheric-overlay"></div>

      <main style={{ position: 'relative', zIndex: 11 }}>
        <Hero />
        <PreWW1 />
      </main>

      <div className="app-container">
        <footer style={{
          textAlign: 'center',
          padding: '2rem 0',
          color: 'var(--text-muted)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          marginTop: '4rem',
          position: 'relative',
          zIndex: 11
        }}>
          <p>Lest we forget.</p>
          <p style={{ fontSize: '0.875rem' }}>World War 1 Educational Portal</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
