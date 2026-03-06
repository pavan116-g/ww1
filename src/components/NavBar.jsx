import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const linkStyle = ({ isActive }) => ({
        color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
        fontWeight: isActive ? 700 : 500,
        fontSize: '0.82rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        padding: '0.5rem 1.1rem',
        borderRadius: '8px',
        background: isActive ? 'rgba(192,57,43,0.18)' : 'transparent',
        border: isActive ? '1px solid rgba(192,57,43,0.35)' : '1px solid transparent',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
    });

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 1000,
            background: 'rgba(8,8,14,0.88)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '0 2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '56px',
        }}>
            {/* Site title */}
            <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '6px', height: '24px', background: 'linear-gradient(to bottom, #c0392b, #e74c3c)', borderRadius: '3px' }} />
                <span style={{ color: '#fff', fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.01em' }}>The Great War</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.08em' }}>1914–1918</span>
            </NavLink>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <NavLink to="/" end style={linkStyle}>🏠 Overview</NavLink>
                <NavLink to="/battles" style={linkStyle}>⚔️ Battles</NavLink>
                <NavLink to="/people" style={linkStyle}>👑 People & Tech</NavLink>
                <NavLink to="/legacy" style={linkStyle}>🎬 Legacy</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
